import React from 'react';
import { Utensils, Globe, Info } from 'lucide-react';
import { SubjectType } from '../types';

interface Step2MenuNameProps {
  subjectType: SubjectType;
  menuName: string;
  cuisineHint: string;
  onMenuNameChange: (val: string) => void;
  onCuisineHintChange: (val: string) => void;
}

export const Step2MenuName: React.FC<Step2MenuNameProps> = ({
  subjectType,
  menuName,
  cuisineHint,
  onMenuNameChange,
  onCuisineHintChange,
}) => {
  const isFood = subjectType === 'food';

  return (
    <section className="bg-white/95 border border-stone-200/90 shadow-sm rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative">
      {/* Step Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center font-mono">
          02
        </span>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <span>ขั้นตอนที่ 2: ระบุชื่อเมนูและสไตล์อาหาร</span>
            <span className="text-xs text-amber-800 font-medium">(Menu Name &amp; Origin)</span>
          </h2>
          <p className="text-xs text-stone-600">
            ระบุชื่อเมนูที่ต้องการให้ AI นำไปวิเคราะห์ส่วนผสมหลักที่แท้จริง และสลับชื่อเมนูได้แบบเรียลไทม์
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Input 1: Menu Name (Required) */}
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-amber-700" />
            <span>ชื่อเมนู / เครื่องดื่ม <strong className="text-amber-800 font-semibold">(จำเป็นต้องระบุ *)</strong></span>
          </label>
          <input
            type="text"
            value={menuName}
            onChange={(e) => onMenuNameChange(e.target.value)}
            placeholder={
              isFood
                ? 'เช่น สเต๊กเนื้อวากิวสันนอก A5 ย่างเตาถ่าน หรือ ต้มยำกุ้งแม่น้ำซุปเข้มข้น'
                : 'เช่น ซิกเนเจอร์ สโมกกี้ โอลด์ แฟชั่น หรือ มัทฉะลาเต้นมโอ๊ตออร์แกนิก'
            }
            className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 font-medium transition-all shadow-xs"
          />
        </div>

        {/* Input 2: Cuisine Hint (Optional) */}
        <div className="md:col-span-1 space-y-1.5">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            <span>สไตล์หรือแหล่งกำเนิด <span className="text-stone-600 font-normal">(ไม่บังคับ)</span></span>
          </label>
          <input
            type="text"
            value={cuisineHint}
            onChange={(e) => onCuisineHintChange(e.target.value)}
            placeholder="เช่น Thai, Japanese, Italian, Modern French"
            className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-xl text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/30 font-medium transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Prominent Hint & Concept Guidance */}
      <div className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 flex items-start gap-3 text-xs leading-relaxed shadow-xs">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-950">
            แนบภาพอ้างอิงและภาพภาชนะของคุณในแชทของ Gemini หรือ ChatGPT พร้อมกับพรอมต์นี้
          </p>
          <p className="text-[11px] text-stone-700 mt-1 font-medium">
            (Attach your reference photo and vessel photo in Gemini/ChatGPT together with the prompt. แอปนี้ทำงานในเครื่อง 100% จึงไม่ต้องอัปโหลดรูปภาพเข้าสู่ระบบ โดย AI ในแชทจะสกัดอารมณ์ โทนสี และภาชนะเพื่อสร้างผลงานที่หรูหราโดยไม่ลอกเลียนแบบภาพตรงๆ)
          </p>
        </div>
      </div>
    </section>
  );
};
