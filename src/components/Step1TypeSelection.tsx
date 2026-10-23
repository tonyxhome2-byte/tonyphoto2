import React from 'react';
import { Utensils, GlassWater, Salad, CheckCircle2 } from 'lucide-react';
import { ServingStyle, SubjectType } from '../types';

interface Step1TypeSelectionProps {
  selectedType: SubjectType;
  onChange: (type: SubjectType) => void;
  servingStyle?: ServingStyle;
  onServingStyleChange?: (style: ServingStyle) => void;
  addFriedEgg?: boolean;
  onAddFriedEggChange?: (val: boolean) => void;
}

export const Step1TypeSelection: React.FC<Step1TypeSelectionProps> = ({
  selectedType,
  onChange,
  servingStyle = 'none',
  onServingStyleChange,
  addFriedEgg = false,
  onAddFriedEggChange,
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

      {/* Grid of 3 options — Compact ~50% smaller cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Food option */}
        <button
          type="button"
          onClick={() => onChange('food')}
          className={`group relative text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedType === 'food'
              ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
              : 'bg-stone-50/70 border-stone-300 hover:border-stone-400 hover:bg-stone-100/80'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
                selectedType === 'food'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-200 text-stone-700 border border-stone-300 group-hover:text-stone-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            {selectedType === 'food' && (
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
            )}
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-stone-950 mb-0.5">
            Food (plated) — อาหารจัดจาน
          </h3>
          <p className="text-[11px] text-stone-600 leading-tight font-medium line-clamp-2">
            อาหารคาว หวาน การจัดจานระดับเชฟไฟน์ไดนิ่ง ศิลปะการราดซอส ผักตกแต่ง และความร้อนควันกรุ่น
          </p>
        </button>

        {/* Appetizer option */}
        <button
          type="button"
          onClick={() => onChange('appetizer')}
          className={`group relative text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedType === 'appetizer'
              ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
              : 'bg-stone-50/70 border-stone-300 hover:border-stone-400 hover:bg-stone-100/80'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
                selectedType === 'appetizer'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-200 text-stone-700 border border-stone-300 group-hover:text-stone-900'
              }`}
            >
              <Salad className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            {selectedType === 'appetizer' && (
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
            )}
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-stone-950 mb-0.5">
            เรียกน้ำย่อย (Appetizer)
          </h3>
          <p className="text-[11px] text-stone-600 leading-tight font-medium line-clamp-2">
            ของทานเล่น อาหารเรียกน้ำย่อย วางกลางจาน ใช้ภาพต้นแบบเป็นหลัก ไม่เพิ่มปริมาณอาหาร
          </p>
        </button>

        {/* Beverage option */}
        <button
          type="button"
          onClick={() => onChange('beverage')}
          className={`group relative text-left p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedType === 'beverage'
              ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
              : 'bg-stone-50/70 border-stone-300 hover:border-stone-400 hover:bg-stone-100/80'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
                selectedType === 'beverage'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-stone-200 text-stone-700 border border-stone-300 group-hover:text-stone-900'
              }`}
            >
              <GlassWater className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            {selectedType === 'beverage' && (
              <CheckCircle2 className="w-4 h-4 text-amber-700" />
            )}
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-stone-950 mb-0.5">
            Beverage — เครื่องดื่ม
          </h3>
          <p className="text-[11px] text-stone-600 leading-tight font-medium line-clamp-2">
            ค็อกเทล กาแฟ ไวน์ น้ำผลไม้ สมูทตี้ ละอองไอน้ำเกาะแก้ว ก้อนน้ำแข็งคริสตัล แสงส่องทะลุของเหลว และสแปลช
          </p>
        </button>
      </div>

      {/* Serving Style Sub-Group — Food Type Only */}
      {selectedType === 'food' && (
        <div className="mt-5 pt-4 border-t border-stone-200/90">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <span>รูปแบบการเสิร์ฟ (Serving style)</span>
                <span className="text-[11px] font-normal text-stone-600">(เลือกหรือไม่เลือกก็ได้)</span>
              </h3>
            </div>
            {servingStyle && servingStyle !== 'none' && (
              <button
                type="button"
                onClick={() => onServingStyleChange?.('none')}
                className="text-[11px] text-amber-700 hover:text-amber-800 font-medium underline cursor-pointer"
              >
                ล้างการเลือก
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 1. ราดข้าว (Food over rice) */}
            <button
              type="button"
              onClick={() => onServingStyleChange?.(servingStyle === 'over_rice' ? 'none' : 'over_rice')}
              className={`group relative text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                servingStyle === 'over_rice'
                  ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
                  : 'bg-stone-50/70 border-stone-300 hover:border-stone-400 hover:bg-stone-100/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-950 mb-1">
                    ราดข้าว (Food over rice)
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    อาหารหลักราดบนข้าว จัดจานแบบข้าวและกับแยกฝั่ง
                  </p>
                </div>
                {servingStyle === 'over_rice' && (
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 ml-2" />
                )}
              </div>
            </button>

            {/* 2. กับข้าว (Main dish only, no rice) */}
            <button
              type="button"
              onClick={() => onServingStyleChange?.(servingStyle === 'main_only' ? 'none' : 'main_only')}
              className={`group relative text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                servingStyle === 'main_only'
                  ? 'bg-amber-50/90 border-amber-600 ring-2 ring-amber-500/25 shadow-sm'
                  : 'bg-stone-50/70 border-stone-300 hover:border-stone-400 hover:bg-stone-100/80'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-950 mb-1">
                    กับข้าว (Main dish only, no rice)
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    จานมีแต่อาหารหลัก ไม่มีข้าว
                  </p>
                </div>
                {servingStyle === 'main_only' && (
                  <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 ml-2" />
                )}
              </div>
            </button>
          </div>

          {/* 3. เพิ่มไข่ดาว (Add fried egg) — Quick toggle in Step 1 */}
          <div className="mt-3.5">
            <label
              className={`flex items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                addFriedEgg
                  ? 'bg-amber-50/90 border-amber-300 ring-1 ring-amber-300/60 shadow-xs'
                  : 'bg-stone-50/70 hover:bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-xs ${
                    addFriedEgg ? 'bg-amber-500 text-white' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  <span className="text-base select-none leading-none">🍳</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-stone-900">
                      เพิ่มไข่ดาว (Add fried egg)
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        addFriedEgg
                          ? 'bg-amber-200/90 text-amber-900 border border-amber-300'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {addFriedEgg ? 'เปิดใช้งาน (Active)' : 'ไม่ใส่ (Off)'}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5">
                    เพิ่มไข่ดาวสุกพอดี ไข่แดงเงาอวบ วางบนอาหารจานหลัก
                  </p>
                </div>
              </div>

              {/* Accessible Switch Toggle */}
              <div className="relative inline-flex items-center shrink-0 mt-0.5 sm:mt-0">
                <input
                  type="checkbox"
                  checked={addFriedEgg}
                  onChange={(e) => onAddFriedEggChange && onAddFriedEggChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </div>
            </label>
          </div>
        </div>
      )}
    </section>
  );
};
