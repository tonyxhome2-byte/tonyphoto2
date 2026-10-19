import React from 'react';
import { Bookmark, RotateCcw, Sparkles } from 'lucide-react';

interface TopBarProps {
  presetCount: number;
  onOpenPresets: () => void;
  onStartOverClick: () => void;
  isPresetsPageActive: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  presetCount,
  onOpenPresets,
  onStartOverClick,
  isPresetsPageActive,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/90 bg-[#faf8f5]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 p-0.5 shadow-md shadow-amber-600/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#fbf9f5] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-stone-900 font-sans">
                Food &amp; Drink Ad Prompt Studio
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 rounded-full">
                100% CLIENT-SIDE &bull; ZERO COST
              </span>
            </div>
            <p className="text-[11px] text-stone-600 hidden md:block">
              สตูดิโอสร้างพรอมต์โฆษณาอาหารและเครื่องดื่มระดับพรีเมียม สำหรับ Gemini และ ChatGPT
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Presets Button */}
          <button
            type="button"
            onClick={onOpenPresets}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
              isPresetsPageActive
                ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20 font-bold'
                : 'bg-white border-stone-300 text-stone-800 hover:border-amber-600 hover:bg-stone-50 hover:text-stone-950'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isPresetsPageActive ? 'text-white' : 'text-amber-700'}`} />
            <span>พรีเซ็ตที่บันทึกไว้</span>
            {presetCount > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isPresetsPageActive
                    ? 'bg-white text-amber-900'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {presetCount}
              </span>
            )}
          </button>

          {/* Delete prompt / Start over Button */}
          <button
            type="button"
            onClick={onStartOverClick}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-300 text-stone-700 hover:text-red-700 hover:border-red-300 hover:bg-red-50/80 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="ล้างพรอมต์ / เริ่มใหม่"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ล้างพรอมต์ / เริ่มใหม่</span>
          </button>
        </div>
      </div>
    </header>
  );
};
