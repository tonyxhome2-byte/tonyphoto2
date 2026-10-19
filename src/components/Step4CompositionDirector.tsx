import React from 'react';
import { LayoutGrid, ZoomIn, Image, Ratio, FileText } from 'lucide-react';
import { AspectRatio, SubjectType } from '../types';
import {
  ASPECT_RATIOS,
  BACKGROUND_DETAILS,
  CROP_DISTANCES_BEVERAGE,
  CROP_DISTANCES_FOOD,
  MAIN_POSITIONS,
} from '../config/options';

interface Step4CompositionDirectorProps {
  subjectType: SubjectType;
  mainPosition: string;
  cropDistance: string;
  backgroundDetail: string;
  aspectRatio: AspectRatio;
  additionalNotes: string;
  onMainPositionChange: (val: string) => void;
  onCropDistanceChange: (val: string) => void;
  onBackgroundDetailChange: (val: string) => void;
  onAspectRatioChange: (val: AspectRatio) => void;
  onAdditionalNotesChange: (val: string) => void;
}

export const Step4CompositionDirector: React.FC<Step4CompositionDirectorProps> = ({
  subjectType,
  mainPosition,
  cropDistance,
  backgroundDetail,
  aspectRatio,
  additionalNotes,
  onMainPositionChange,
  onCropDistanceChange,
  onBackgroundDetailChange,
  onAspectRatioChange,
  onAdditionalNotesChange,
}) => {
  const isFood = subjectType === 'food';
  const cropOptions = isFood ? CROP_DISTANCES_FOOD : CROP_DISTANCES_BEVERAGE;

  return (
    <section className="bg-white/95 border border-stone-200/90 shadow-sm rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center font-mono">
          04
        </span>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>ขั้นตอนที่ 4: กำกับการจัดองค์ประกอบและสัดส่วนภาพ</span>
            <span className="text-xs text-amber-800 font-medium">(Composition Director)</span>
          </h2>
          <p className="text-xs text-stone-600">
            กำหนดตำแหน่งการจัดวางภาชนะ ระยะซูม รายละเอียดพื้นหลัง สัดส่วนภาพ และหมายเหตุเพิ่มเติม
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* 1. Main Position */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-amber-700" />
            <span>1. ตำแหน่ง{isFood ? 'จาน/ชาม' : 'แก้ว/ขวด'} (Position)</span>
          </label>
          <div className="relative">
            <select
              value={mainPosition}
              onChange={(e) => onMainPositionChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
            >
              {MAIN_POSITIONS.map((pos) => (
                <option key={pos.value} value={pos.value} className="bg-white text-stone-900">
                  {pos.labelThai}
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

        {/* 2. Crop Distance */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <ZoomIn className="w-3.5 h-3.5 text-amber-700" />
            <span>2. ระยะซูมภาพ (Crop Distance)</span>
          </label>
          <div className="relative">
            <select
              value={cropDistance}
              onChange={(e) => onCropDistanceChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
            >
              {cropOptions.map((crop) => (
                <option key={crop.value} value={crop.value} className="bg-white text-stone-900">
                  {crop.labelThai}
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

        {/* 3. Background Detail */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-amber-700" />
            <span>3. รายละเอียดฉากหลัง (Background)</span>
          </label>
          <div className="relative">
            <select
              value={backgroundDetail}
              onChange={(e) => onBackgroundDetailChange(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
            >
              {BACKGROUND_DETAILS.map((bg) => (
                <option key={bg.value} value={bg.value} className="bg-white text-stone-900">
                  {bg.labelThai}
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
      </div>

      {/* Extra: Aspect Ratio and Additional Notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-200">
        {/* Aspect Ratio */}
        <div className="md:col-span-1 space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Ratio className="w-3.5 h-3.5 text-amber-700" />
            <span>สัดส่วนภาพ (Aspect Ratio)</span>
          </label>
          <div className="relative">
            <select
              value={aspectRatio}
              onChange={(e) => onAspectRatioChange(e.target.value as AspectRatio)}
              className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 cursor-pointer appearance-none transition-all pr-8 shadow-xs font-medium"
            >
              {ASPECT_RATIOS.map((ratio) => (
                <option key={ratio.value} value={ratio.value} className="bg-white text-stone-900">
                  {ratio.labelEn} — {ratio.desc}
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

        {/* Additional Notes */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>คำขอหรือรายละเอียดเพิ่มเติม <span className="text-stone-600 font-normal">(ไม่บังคับ)</span></span>
          </label>
          <input
            type="text"
            value={additionalNotes}
            onChange={(e) => onAdditionalNotesChange(e.target.value)}
            placeholder="เช่น ตกแต่งด้วยทองคำเปลวบริสุทธิ์ 24k, ควันกรุ่นจากกระดิ่งแก้วรมควัน, สมุนไพรออร์แกนิกโรยข้างจาน"
            className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 transition-all font-medium shadow-xs"
          />
        </div>
      </div>
    </section>
  );
};
