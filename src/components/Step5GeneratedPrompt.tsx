import React, { useState } from 'react';
import {
  Copy,
  Check,
  Bot,
  MessageSquare,
  AlertCircle,
  FileCheck2,
  Sparkles,
  Layers,
  FileText,
} from 'lucide-react';
import { GeneratedPromptResult, OutputMode } from '../types';
import { copyToClipboard } from '../utils/promptBuilder';

interface Step5GeneratedPromptProps {
  isValid: boolean;
  missingError: string | null;
  prompts: GeneratedPromptResult;
  outputMode: OutputMode;
  onOutputModeChange: (mode: OutputMode) => void;
  menuName: string;
}

export const Step5GeneratedPrompt: React.FC<Step5GeneratedPromptProps> = ({
  isValid,
  missingError,
  prompts,
  outputMode,
  onOutputModeChange,
  menuName,
}) => {
  const [activeTab, setActiveTab] = useState<'gemini' | 'chatgpt'>('gemini');
  // Copy success feedback per button
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (key: string, text: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const activeModelPrompts = activeTab === 'gemini' ? prompts.gemini : prompts.chatgpt;

  return (
    <section className="bg-white/95 border border-stone-200/90 shadow-sm rounded-2xl p-5 sm:p-6 backdrop-blur-sm relative">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center font-mono">
            05
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <span>ขั้นตอนที่ 5: พรอมต์โฆษณาที่สร้างอัตโนมัติ</span>
              <span className="text-xs text-amber-800 font-medium">(Generated Ad Prompt)</span>
            </h2>
            <p className="text-xs text-stone-600">
              สร้างสดตามการตั้งค่าแบบเรียลไทม์ พร้อมคำสั่งตรวจสอบข้อมูลเงียบๆ ในใจ (Silent Pre-check) และสร้างภาพทันทีโดยไม่มีข้อความอธิบายคั่น
            </p>
          </div>
        </div>

        {/* View mode toggle within the unified card */}
        <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-300 self-start sm:self-auto shadow-xs">
          <button
            type="button"
            onClick={() => onOutputModeChange('one-message')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              outputMode === 'one-message'
                ? 'bg-amber-600 text-white shadow-xs font-bold'
                : 'text-stone-700 hover:text-stone-950 font-medium'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>พรอมต์รวมฉบับสมบูรณ์ (All-in-One)</span>
          </button>
          <button
            type="button"
            onClick={() => onOutputModeChange('two-messages')}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              outputMode === 'two-messages'
                ? 'bg-amber-600 text-white shadow-xs font-bold'
                : 'text-stone-700 hover:text-stone-950 font-medium'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>แยกดู 2 ขั้นตอน (Step 1 & 2)</span>
          </button>
        </div>
      </div>

      {/* Validation Missing Warning */}
      {!isValid ? (
        <div className="p-8 text-center rounded-xl bg-amber-50/70 border border-dashed border-amber-300">
          <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-stone-950 mb-1">
            {missingError || 'กรุณาระบุชื่อเมนูก่อนเพื่อแสดงผลพรอมต์'}
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed font-medium">
            ระบบจะสร้างพรอมต์ภาษาอังกฤษฉบับสมบูรณ์ทันทีที่คุณพิมพ์ชื่อเมนูในขั้นตอนที่ 2
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Live Sync Badge */}
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>
                <strong>ระบบสลับชื่อเมนูสด (Live Menu Name Swap):</strong> เมนูปัจจุบันคือ{' '}
                <span className="text-amber-950 font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {menuName.trim()}
                </span>
              </span>
            </div>
            <span className="text-[11px] text-stone-600 font-medium hidden sm:inline">
              อัปเดตแบบเรียลไทม์ 100% ไม่เสียค่าใช้จ่ายใดๆ
            </span>
          </div>

          {/* Tab Selector: Gemini vs ChatGPT */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-px">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('gemini')}
                className={`py-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'gemini'
                    ? 'border-amber-600 text-amber-950 bg-amber-50/70'
                    : 'border-transparent text-stone-600 hover:text-stone-900 font-medium'
                }`}
              >
                <Bot className="w-4 h-4 text-amber-700" />
                <span>เวอร์ชัน Gemini (Natural Language)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('chatgpt')}
                className={`py-2.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'chatgpt'
                    ? 'border-amber-600 text-amber-950 bg-amber-50/70'
                    : 'border-transparent text-stone-600 hover:text-stone-900 font-medium'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>เวอร์ชัน ChatGPT (Structured Headings)</span>
              </button>
            </div>
          </div>

          {/* Combined Copy Toolbar: Master Copy + Step-by-Step Copies */}
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-amber-950">
                ตัวเลือกการคัดลอกด่วน (Quick Copy):
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Primary Master Copy Button */}
              <button
                type="button"
                onClick={() => handleCopy(`${activeTab}-single`, activeModelPrompts.singleMessage)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all flex items-center gap-1.5 shadow-sm shadow-amber-600/25 cursor-pointer"
                title="คัดลอกพรอมต์ฉบับสมบูรณ์ที่ผสานทั้งขั้นตอนวิเคราะห์และขั้นตอนสร้างภาพเข้าด้วยกัน"
              >
                {copiedKey === `${activeTab}-single` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                    <span>คัดลอกพรอมต์ฉบับสมบูรณ์แล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-white" />
                    <span>คัดลอกพรอมต์ฉบับสมบูรณ์ (รวมทั้งหมดใน 1 คลิก)</span>
                  </>
                )}
              </button>

              {/* Copy Step 1 Only */}
              <button
                type="button"
                onClick={() => handleCopy(`${activeTab}-msg1`, activeModelPrompts.message1)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="คัดลอกเฉพาะข้อความที่ 1 สำหรับขั้นตอนวิเคราะห์ภาพ"
              >
                {copiedKey === `${activeTab}-msg1` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700">คัดลอกข้อความที่ 1 แล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-amber-700" />
                    <span>คัดลอกเฉพาะข้อความที่ 1 (วิเคราะห์)</span>
                  </>
                )}
              </button>

              {/* Copy Step 2 Only */}
              <button
                type="button"
                onClick={() => handleCopy(`${activeTab}-msg2`, activeModelPrompts.message2)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="คัดลอกเฉพาะข้อความที่ 2 สำหรับขั้นตอนสร้างภาพโฆษณา"
              >
                {copiedKey === `${activeTab}-msg2` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                    <span className="text-emerald-700">คัดลอกข้อความที่ 2 แล้ว!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-amber-700" />
                    <span>คัดลอกเฉพาะข้อความที่ 2 (สร้างภาพ)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Prompt Output Content */}
          {outputMode === 'one-message' ? (
            /* Harmonized Single Master Prompt Output Box */
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>พรอมต์รวมฉบับสมบูรณ์ (Harmonized Master Prompt)</span>
                  </span>
                  <span className="text-[11px] text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md font-semibold">
                    สั่ง AI ทำ Pre-check เงียบๆ และสร้างภาพทันที (Output Image Only)
                  </span>
                </div>
              </div>

              {/* Two-phase visual breakdown pills */}
              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200 font-medium">
                  <Check className="w-3 h-3 text-amber-700" />
                  <strong>กฎที่ 1:</strong> Silent Pre-check ตรวจสอบภาชนะและวัตถุดิบแท้ในใจ (ไม่พิมพ์ข้อความออกมา)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium">
                  <Check className="w-3 h-3 text-emerald-700" />
                  <strong>กฎที่ 2:</strong> Output Rule ส่งภาพที่สร้างทันที ห้ามพิมพ์คำอธิบาย แผนงาน หรือข้อความนำใดๆ
                </span>
              </div>

              <div className="relative">
                <div className="w-full min-h-[240px] p-4 bg-[#fcfaf7] border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-950 font-mono whitespace-pre-wrap leading-relaxed selection:bg-amber-200 selection:text-stone-950 shadow-inner">
                  {activeModelPrompts.singleMessage}
                </div>
              </div>
            </div>
          ) : (
            /* Integrated Two-Message Breakdown View within the same card */
            <div className="space-y-4">
              {/* Message 1: Analysis */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[10px] flex items-center justify-center font-mono font-bold">
                      1
                    </span>
                    <span>ข้อความที่ 1: ขั้นตอนการวิเคราะห์ (Message 1 — Analysis Only)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${activeTab}-msg1`, activeModelPrompts.message1)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    {copiedKey === `${activeTab}-msg1` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                        <span className="text-emerald-700 text-[11px]">คัดลอกแล้ว!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-amber-700" />
                        <span className="text-[11px]">คัดลอกข้อความที่ 1</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="w-full p-3.5 bg-[#fcfaf7] border border-stone-300 rounded-xl text-xs text-stone-950 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                  {activeModelPrompts.message1}
                </div>
              </div>

              {/* Message 2: Generation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] flex items-center justify-center font-mono font-bold">
                      2
                    </span>
                    <span>ข้อความที่ 2: ขั้นตอนการสร้างภาพ (Message 2 — Generate Poster)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(`${activeTab}-msg2`, activeModelPrompts.message2)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all flex items-center gap-1 shadow-xs shadow-amber-600/20 cursor-pointer"
                  >
                    {copiedKey === `${activeTab}-msg2` ? (
                      <>
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                        <span className="text-[11px]">คัดลอกแล้ว!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-white" />
                        <span className="text-[11px]">คัดลอกข้อความที่ 2</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="w-full p-3.5 bg-[#fcfaf7] border border-stone-300 rounded-xl text-xs text-stone-950 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                  {activeModelPrompts.message2}
                </div>
              </div>
            </div>
          )}

          {/* Instructions and Thai note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 bg-stone-50 border border-stone-200/90 rounded-xl text-xs text-stone-700 flex items-start gap-2.5 shadow-xs">
              <FileCheck2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-stone-950 font-bold">วิธีใช้งาน:</strong> กดปุ่มคัดลอก แล้วนำไปวางในช่องแชทของ Gemini หรือ ChatGPT พร้อมแนบรูปภาพอ้างอิงและภาพภาชนะของคุณลงในแชทด้วย
              </div>
            </div>

            <div className="p-3.5 bg-stone-50 border border-stone-200/90 rounded-xl text-xs text-stone-700 flex items-start gap-2.5 shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-stone-950 font-bold">หมายเหตุสำคัญ:</strong> คุณภาพและความละเอียดของภาพที่สร้างขึ้นขึ้นอยู่กับแพ็กเกจ (Free / Plus / Advanced) และโควต้าประจำวันของบัญชี Gemini หรือ ChatGPT ของคุณ
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
