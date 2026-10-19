import React from 'react';
import { Camera, SunMedium, Sparkles, Droplets } from 'lucide-react';
import { SubjectType } from '../types';
import {
  BEVERAGE_EFFECT_GROUPS,
  BEVERAGE_EFFECTS,
  CAMERA_ANGLES,
  LIGHTING_STYLES,
  MOOD_AND_ESSENCE,
} from '../config/options';

interface Step3VisualDirectorProps {
  subjectType: SubjectType;
  cameraAngle: string;
  lighting: string;
  mood: string;
  beverageEffect: string;
  secondaryEffect?: string;
  onCameraAngleChange: (val: string) => void;
  onLightingChange: (val: string) => void;
  onMoodChange: (val: string) => void;
  onBeverageEffectChange: (val: string) => void;
  onSecondaryEffectChange?: (val: string) => void;
}

export const Step3VisualDirector: React.FC<Step3VisualDirectorProps> = ({
  subjectType,
  cameraAngle,
  lighting,
  mood,
  beverageEffect,
  secondaryEffect = 'None',
  onCameraAngleChange,
  onLightingChange,
  onMoodChange,
  onBeverageEffectChange,
  onSecondaryEffectChange,
}) => {
  const isBeverage = subjectType === 'beverage';

  return (
    <section className="bg-white/95 border border-stone-200/90 shadow-sm rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center font-mono">
          03
        </span>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>ขั้นตอนที่ 3: กำกับการมองเห็นและสไตล์ภาพ</span>
            <span className="text-xs text-amber-800 font-medium">(Visual Director)</span>
          </h2>
          <p className="text-xs text-stone-600">
            กำหนดมุมมองกล้อง เทคนิคการจัดแสง อารมณ์ภาพ และลูกเล่นเฉพาะสำหรับภาพถ่ายโฆษณา
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${isBeverage ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'sm:grid-cols-3'} gap-4`}>
        {/* 1. Camera Angle */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>1. มุมกล้อง (Camera Angle)</span>
          </label>
          <div className="relative">
            <select
              value={cameraAngle}
              onChange={(e) => onCameraAngleChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
            >
              {CAMERA_ANGLES.map((angle) => (
                <option key={angle.value} value={angle.value} className="bg-white text-stone-900">
                  {angle.labelThai}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 2. Art Direction & Lighting */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <SunMedium className="w-3.5 h-3.5 text-amber-700" />
            <span>2. การจัดแสง (Lighting)</span>
          </label>
          <div className="relative">
            <select
              value={lighting}
              onChange={(e) => onLightingChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
            >
              {LIGHTING_STYLES.map((light) => (
                <option key={light.value} value={light.value} className="bg-white text-stone-900">
                  {light.labelThai}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 3. Mood & Essence */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>3. อารมณ์ภาพ (Mood &amp; Essence)</span>
          </label>
          <div className="relative">
            <select
              value={mood}
              onChange={(e) => onMoodChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
            >
              {MOOD_AND_ESSENCE.map((m) => (
                <option key={m.value} value={m.value} className="bg-white text-stone-900">
                  {m.labelThai}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-stone-500">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4. Beverage effect dropdown (Only for Beverage type) */}
        {isBeverage && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-700" />
              <span>4. ลูกเล่นเครื่องดื่ม (Beverage effect)</span>
            </label>
            <div className="relative">
              <select
                value={beverageEffect}
                onChange={(e) => onBeverageEffectChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-cyan-50/50 border border-cyan-300 rounded-xl text-xs sm:text-sm text-cyan-950 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
              >
                {BEVERAGE_EFFECT_GROUPS.map((group) => (
                  <optgroup
                    key={group.groupName}
                    label={group.groupName}
                    className="font-bold text-stone-700 bg-stone-100"
                  >
                    {group.options.map((eff) => (
                      <option
                        key={eff.value}
                        value={eff.value}
                        className="bg-white text-stone-900 font-normal"
                      >
                        {eff.labelThai}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-cyan-600">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* 5. Secondary effect dropdown (Only for Beverage type) */}
        {isBeverage && (
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-700" />
              <span>5. ลูกเล่นรอง (Secondary effect)</span>
            </label>
            <div className="relative">
              <select
                value={secondaryEffect}
                onChange={(e) => onSecondaryEffectChange?.(e.target.value)}
                className="w-full px-3 py-2.5 bg-cyan-50/50 border border-cyan-300 rounded-xl text-xs sm:text-sm text-cyan-950 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
              >
                {BEVERAGE_EFFECT_GROUPS.map((group) => (
                  <optgroup
                    key={group.groupName}
                    label={group.groupName}
                    className="font-bold text-stone-700 bg-stone-100"
                  >
                    {group.options.map((eff) => (
                      <option
                        key={eff.value}
                        value={eff.value}
                        className="bg-white text-stone-900 font-normal"
                      >
                        {eff.labelThai}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-cyan-600">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
