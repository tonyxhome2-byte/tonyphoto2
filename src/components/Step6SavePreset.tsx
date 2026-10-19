import React, { useState } from 'react';
import { BookmarkPlus, Check, X } from 'lucide-react';
import { FormState } from '../types';

interface Step6SavePresetProps {
  formState: FormState;
  onSavePreset: (presetName: string) => void;
  isValid: boolean;
}

export const Step6SavePreset: React.FC<Step6SavePresetProps> = ({
  formState,
  onSavePreset,
  isValid,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    const defaultName = formState.menuName.trim()
      ? `พรีเซ็ต ${formState.menuName.trim()}`
      : `พรีเซ็ต ${formState.subjectType === 'food' ? 'อาหารจัดจาน' : 'เครื่องดื่ม'}`;
    setPresetName(defaultName);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!presetName.trim()) {
      setError('กรุณาตั้งชื่อพรีเซ็ต');
      return;
    }
    onSavePreset(presetName.trim());
    setIsModalOpen(false);
  };

  return (
    <section className="bg-white/95 border border-stone-200/90 shadow-sm rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center font-mono">
            06
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>ขั้นตอนที่ 6: บันทึกการตั้งค่าเป็นพรีเซ็ต</span>
              <span className="text-xs text-amber-800 font-medium">(Save as Preset)</span>
            </h2>
            <p className="text-xs text-stone-600">
              บันทึกสไตล์ มุมกล้อง และการจัดองค์ประกอบทั้งหมดไว้ในอุปกรณ์นี้ เพื่อนำกลับมาสร้างเมนูอื่นได้อย่างรวดเร็ว
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          disabled={!isValid}
          className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0 ${
            !isValid
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
              : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 hover:scale-[1.01]'
          }`}
        >
          <BookmarkPlus className="w-4 h-4 text-white" />
          <span>บันทึกเป็นพรีเซ็ต (Save as Preset)</span>
        </button>
      </div>

      {/* Save Preset Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-2xl p-6 relative"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="ปิด"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
                <BookmarkPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">บันทึกเป็นพรีเซ็ต</h3>
                <p className="text-xs text-stone-600">
                  จัดเก็บไว้ในหน่วยความจำของเบราว์เซอร์นี้ (localStorage)
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-900 mb-1.5">
                  ตั้งชื่อพรีเซ็ตของคุณ
                </label>
                <input
                  type="text"
                  autoFocus
                  value={presetName}
                  onChange={(e) => {
                    setPresetName(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="เช่น สไตล์สตูดิโอค็อกเทลดาร์กลักชัวรี..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 font-medium"
                />
                {error && <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>}
              </div>

              {/* Summary of Saved Selections */}
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">ประเภท:</span>
                  <span className="text-stone-900 font-bold">
                    {formState.subjectType === 'food' ? 'Food (plated)' : 'Beverage'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">มุมกล้อง / แสง:</span>
                  <span className="text-stone-800 font-medium truncate max-w-[200px]">
                    {formState.cameraAngle} / {formState.lighting}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">สัดส่วนภาพ:</span>
                  <span className="text-stone-900 font-mono font-bold">{formState.aspectRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">โหมดแสดงผล:</span>
                  <span className="text-stone-800 font-medium">
                    {formState.outputMode === 'one-message' ? 'พรอมต์รวมฉบับสมบูรณ์ (All-in-One)' : 'แยกดู 2 ขั้นตอน (Step 1 & 2)'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                  <span>บันทึกพรีเซ็ต</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
