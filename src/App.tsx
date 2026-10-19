import React, { useState, useEffect, useMemo } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TopBar } from './components/TopBar';
import { ConfirmModal } from './components/ConfirmModal';
import { Step1TypeSelection } from './components/Step1TypeSelection';
import { Step2MenuName } from './components/Step2MenuName';
import { Step3VisualDirector } from './components/Step3VisualDirector';
import { Step4CompositionDirector } from './components/Step4CompositionDirector';
import { Step5GeneratedPrompt } from './components/Step5GeneratedPrompt';
import { Step6SavePreset } from './components/Step6SavePreset';
import { PresetsView } from './components/PresetsView';

import {
  AspectRatio,
  FormState,
  GeneratedPromptResult,
  OutputMode,
  PresetItem,
  SubjectType,
} from './types';
import {
  DEFAULT_FORM_STATE,
  loadSavedPresets,
  savePresetItem,
} from './utils/storage';
import { buildAllPrompts } from './utils/promptBuilder';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'main' | 'presets'>('main');
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [presets, setPresets] = useState<PresetItem[]>([]);

  // Modals state
  const [isStartOverConfirmOpen, setIsStartOverConfirmOpen] = useState(false);

  // Notifications
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Load presets on mount
  useEffect(() => {
    refreshPresets();
  }, []);

  const refreshPresets = () => {
    const loaded = loadSavedPresets();
    setPresets(loaded);
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Validation: a type must be selected and a menu name must be entered
  const isMenuNameValid = Boolean(formState.menuName.trim());
  const isFormValid = Boolean(formState.subjectType && isMenuNameValid);
  const missingError = !formState.subjectType
    ? 'กรุณาเลือกประเภทอาหารหรือเครื่องดื่มในขั้นตอนที่ 1'
    : !isMenuNameValid
    ? 'กรุณาระบุชื่อเมนูหรือชื่อเครื่องดื่มในขั้นตอนที่ 2 เพื่อสร้างพรอมต์'
    : null;

  // Pure deterministic live prompt computation
  // Real-time live update: when user edits menu name or any dropdown, prompts update instantly
  const generatedPrompts: GeneratedPromptResult = useMemo(() => {
    return buildAllPrompts(formState);
  }, [formState]);

  // STEP 1: Type selection handler
  const handleSubjectTypeChange = (type: SubjectType) => {
    setFormState((prev) => ({
      ...prev,
      subjectType: type,
      cropDistance: 'Medium',
      beverageEffect: type === 'beverage' ? (prev.beverageEffect === 'None' ? 'Condensation droplets' : prev.beverageEffect) : 'None',
      secondaryEffect: type === 'beverage' ? (prev.secondaryEffect || 'None') : 'None',
    }));
  };

  // Delete prompt / Start over action
  const handleStartOverConfirm = () => {
    setFormState(DEFAULT_FORM_STATE);
    setIsStartOverConfirmOpen(false);
    showNotification('info', 'รีเซ็ตแบบฟอร์มกลับเป็นค่าเริ่มต้นเรียบร้อย (พรีเซ็ตที่บันทึกไว้ยังคงอยู่)');
  };

  // Save Preset action
  const handleSavePreset = (presetName: string) => {
    if (!isFormValid) {
      showNotification('error', 'กรุณาระบุชื่อเมนูก่อนบันทึกพรีเซ็ต');
      return;
    }

    const newPreset: PresetItem = {
      id: `preset_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: presetName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      subjectType: formState.subjectType,
      menuName: formState.menuName,
      cuisineHint: formState.cuisineHint,
      cameraAngle: formState.cameraAngle,
      lighting: formState.lighting,
      mood: formState.mood,
      beverageEffect: formState.beverageEffect,
      secondaryEffect: formState.secondaryEffect || 'None',
      mainPosition: formState.mainPosition,
      cropDistance: formState.cropDistance,
      backgroundDetail: formState.backgroundDetail,
      aspectRatio: formState.aspectRatio,
      additionalNotes: formState.additionalNotes,
      outputMode: formState.outputMode,
      addFriedEgg: Boolean(formState.addFriedEgg),
    };

    const res = savePresetItem(newPreset);
    if (res.success) {
      refreshPresets();
      showNotification('success', `บันทึกพรีเซ็ต "${presetName}" เรียบร้อยแล้ว`);
    } else {
      showNotification('error', res.error || 'ไม่สามารถบันทึกพรีเซ็ตได้');
    }
  };

  // Load preset from Presets page
  const handleSelectPreset = (preset: PresetItem) => {
    setFormState({
      subjectType: preset.subjectType,
      menuName: preset.menuName,
      cuisineHint: preset.cuisineHint,
      cameraAngle: preset.cameraAngle,
      lighting: preset.lighting,
      mood: preset.mood,
      beverageEffect: preset.beverageEffect,
      secondaryEffect: preset.secondaryEffect || 'None',
      mainPosition: preset.mainPosition,
      cropDistance: preset.cropDistance,
      backgroundDetail: preset.backgroundDetail,
      aspectRatio: preset.aspectRatio,
      additionalNotes: preset.additionalNotes,
      outputMode: preset.outputMode,
      addFriedEgg: typeof preset.addFriedEgg === 'boolean' ? preset.addFriedEgg : false,
    });
    setCurrentPage('main');
    showNotification('success', `โหลดพรีเซ็ต "${preset.name}" เรียบร้อยแล้ว (สามารถเปลี่ยนชื่อเมนูได้ทันที)`);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col antialiased">
        {/* Top Bar */}
        <TopBar
          presetCount={presets.length}
          onOpenPresets={() => setCurrentPage('presets')}
          onStartOverClick={() => setIsStartOverConfirmOpen(true)}
          isPresetsPageActive={currentPage === 'presets'}
        />

        {/* Floating Notification */}
        {notification && (
          <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-in slide-in-from-bottom-5 duration-200">
            <div
              className={`p-3.5 rounded-xl border shadow-xl backdrop-blur-md text-xs font-semibold flex items-center justify-between gap-3 ${
                notification.type === 'success'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : notification.type === 'error'
                  ? 'bg-red-50 border-red-300 text-red-950'
                  : 'bg-white border-stone-300 text-stone-900'
              }`}
            >
              <span>{notification.message}</span>
              <button
                type="button"
                onClick={() => setNotification(null)}
                className="text-stone-500 hover:text-stone-800 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        {currentPage === 'presets' ? (
          <PresetsView
            presets={presets}
            onSelectPreset={handleSelectPreset}
            onClose={() => setCurrentPage('main')}
            onPresetsUpdated={refreshPresets}
          />
        ) : (
          <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
            {/* App Hero / Title Banner */}
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full shadow-xs">
                Zero Cost &bull; 100% Client-Side Prompt Builder
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-stone-950 mt-3 mb-2 font-sans">
                Food &amp; Drink Ad Prompt Studio
              </h1>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                สร้างพรอมต์ภาพถ่ายโฆษณาอาหารและเครื่องดื่มระดับพรีเมียม สั่งให้ AI วิเคราะห์ภาพอ้างอิงและภาชนะจริงในแชทของคุณ เพื่อสร้างสรรค์ภาพถ่ายเชิงพาณิชย์ระดับสากล
              </p>
            </div>

            {/* Vertical Form - Exact Steps Order 1 to 6 */}
            <div className="space-y-6">
              {/* STEP 1: TYPE SELECTION */}
              <Step1TypeSelection
                selectedType={formState.subjectType}
                onChange={handleSubjectTypeChange}
              />

              {/* STEP 2: MENU NAME */}
              <Step2MenuName
                subjectType={formState.subjectType}
                menuName={formState.menuName}
                cuisineHint={formState.cuisineHint}
                onMenuNameChange={(name) => setFormState((prev) => ({ ...prev, menuName: name }))}
                onCuisineHintChange={(hint) => setFormState((prev) => ({ ...prev, cuisineHint: hint }))}
              />

              {/* STEP 3: VISUAL DIRECTOR */}
              <Step3VisualDirector
                subjectType={formState.subjectType}
                cameraAngle={formState.cameraAngle}
                lighting={formState.lighting}
                mood={formState.mood}
                beverageEffect={formState.beverageEffect}
                secondaryEffect={formState.secondaryEffect || 'None'}
                onCameraAngleChange={(angle) => setFormState((prev) => ({ ...prev, cameraAngle: angle }))}
                onLightingChange={(light) => setFormState((prev) => ({ ...prev, lighting: light }))}
                onMoodChange={(mood) => setFormState((prev) => ({ ...prev, mood }))}
                onBeverageEffectChange={(eff) => setFormState((prev) => ({ ...prev, beverageEffect: eff }))}
                onSecondaryEffectChange={(sec) => setFormState((prev) => ({ ...prev, secondaryEffect: sec }))}
              />

              {/* STEP 4: COMPOSITION DIRECTOR */}
              <Step4CompositionDirector
                subjectType={formState.subjectType}
                mainPosition={formState.mainPosition}
                cropDistance={formState.cropDistance}
                backgroundDetail={formState.backgroundDetail}
                aspectRatio={formState.aspectRatio}
                additionalNotes={formState.additionalNotes}
                addFriedEgg={Boolean(formState.addFriedEgg)}
                onMainPositionChange={(pos) => setFormState((prev) => ({ ...prev, mainPosition: pos }))}
                onCropDistanceChange={(crop) => setFormState((prev) => ({ ...prev, cropDistance: crop }))}
                onBackgroundDetailChange={(bg) => setFormState((prev) => ({ ...prev, backgroundDetail: bg }))}
                onAspectRatioChange={(ratio: AspectRatio) => setFormState((prev) => ({ ...prev, aspectRatio: ratio }))}
                onAdditionalNotesChange={(notes) => setFormState((prev) => ({ ...prev, additionalNotes: notes }))}
                onAddFriedEggChange={(checked) => setFormState((prev) => ({ ...prev, addFriedEgg: checked }))}
              />

              {/* STEP 5: GENERATED PROMPT */}
              <Step5GeneratedPrompt
                isValid={isFormValid}
                missingError={missingError}
                prompts={generatedPrompts}
                outputMode={formState.outputMode}
                onOutputModeChange={(mode: OutputMode) => setFormState((prev) => ({ ...prev, outputMode: mode }))}
                menuName={formState.menuName}
              />

              {/* STEP 6: SAVE PRESET (LAST, AT THE VERY BOTTOM) */}
              <Step6SavePreset
                formState={formState}
                onSavePreset={handleSavePreset}
                isValid={isFormValid}
              />
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="mt-auto border-t border-stone-200 bg-white/70 py-6 text-center text-xs text-stone-600 font-medium">
          <p>
            Food &amp; Drink Ad Prompt Studio &mdash; แอปพลิเคชันฟรี 100% Client-Side ไม่ต้องใช้ API Key ใดๆ
          </p>
        </footer>

        {/* Start Over Confirmation Modal */}
        <ConfirmModal
          isOpen={isStartOverConfirmOpen}
          title="ยืนยันการเริ่มใหม่"
          message="คุณต้องการล้างพรอมต์และรีเซ็ตค่าในแบบฟอร์มทั้งหมดกลับเป็นค่าเริ่มต้นหรือไม่? (พรีเซ็ตที่คุณบันทึกไว้ในเครื่องจะไม่ถูกลบ)"
          confirmLabel="ล้างและเริ่มใหม่"
          cancelLabel="ยกเลิก"
          isDestructive={true}
          onConfirm={handleStartOverConfirm}
          onCancel={() => setIsStartOverConfirmOpen(false)}
        />
      </div>
    </ErrorBoundary>
  );
}
