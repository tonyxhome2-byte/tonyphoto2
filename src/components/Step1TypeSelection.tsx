import React from 'react';
import { Utensils, GlassWater, CheckCircle2 } from 'lucide-react';
import { SubjectType } from '../types';

interface Step1TypeSelectionProps {
  selectedType: SubjectType;
  onChange: (type: SubjectType) => void;
}

export const Step1TypeSelection: React.FC<Step1TypeSelectionProps> = ({
  selectedType,
  onChange,
}) => {
  return (
    <section className="bg-white/95 border border-stone-200/90 shadow-sm rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative overflow-hidden">
      {/* Step Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center font-mono">
          01
        </span>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>ขั้นตอนที่ 1: เลือกประเภทของภาพโฆษณา</span>
            <span className="text-xs text-amber-800 font-medium">(Type Selection)</span>
          </h2>
          <p className="text-xs text-stone-600">
            ระบบจะปรับเปลี่ยนตัวเลือกมุมมอง แสง และเทคนิคพิเศษในขั้นตอนถัดไปตามประเภทที่เลือก
          </p>
        </div>
      </div>

      {/* Grid of 2 options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Food option */}
        <button
          type="button"
          onClick={() => onChange('food')}
          className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
            selectedType === 'food'
              ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
              : 'bg-stone-50/70 border-stone-300 hover:border-stone-400 hover:bg-stone-100/80'
          }`}
        >
          <div className="flex items-start justify-between">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedType === 'food'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-200 text-stone-700 border border-stone-300 group-hover:text-stone-900'
              }`}
            >
              <Utensils className="w-6 h-6" />
            </div>
            {selectedType === 'food' && (
              <CheckCircle2 className="w-5 h-5 text-amber-700" />
            )}
          </div>
          <h3 className="text-sm sm:text-base font-bold text-stone-950 mb-1">
            Food (plated) — อาหารจัดจาน
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            อาหารคาว หวาน การจัดจานระดับเชฟไฟน์ไดนิ่ง ศิลปะการราดซอส ผักตกแต่ง และความร้อนควันกรุ่น
          </p>
        </button>

        {/* Beverage option */}
        <button
          type="button"
          onClick={() => onChange('beverage')}
          className={`group relative text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
            selectedType === 'beverage'
              ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
              : 'bg-stone-50/70 border-stone-300 hover:border-stone-400 hover:bg-stone-100/80'
          }`}
        >
          <div className="flex items-start justify-between">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                selectedType === 'beverage'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-stone-200 text-stone-700 border border-stone-300 group-hover:text-stone-900'
              }`}
            >
              <GlassWater className="w-6 h-6" />
            </div>
            {selectedType === 'beverage' && (
              <CheckCircle2 className="w-5 h-5 text-amber-700" />
            )}
          </div>
          <h3 className="text-sm sm:text-base font-bold text-stone-950 mb-1">
            Beverage — เครื่องดื่ม
          </h3>
          <p className="text-xs text-stone-700 leading-relaxed font-medium">
            ค็อกเทล กาแฟ ไวน์ น้ำผลไม้ สมูทตี้ ละอองไอน้ำเกาะแก้ว ก้อนน้ำแข็งคริสตัล แสงส่องทะลุของเหลว และสแปลช
          </p>
        </button>
      </div>
    </section>
  );
};
