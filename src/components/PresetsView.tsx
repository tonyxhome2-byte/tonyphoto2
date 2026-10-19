import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  Upload,
  Trash2,
  Edit2,
  Calendar,
  Utensils,
  GlassWater,
  AlertCircle,
  Check,
  X,
  Search,
  Image as ImageIcon,
} from 'lucide-react';
import { PresetItem, SubjectType } from '../types';
import {
  deletePresetItem,
  renamePresetItem,
  updatePresetCover,
} from '../utils/storage';
import { processPresetCoverImage } from '../utils/imageUtils';
import { ConfirmModal } from './ConfirmModal';

interface PresetsViewProps {
  presets: PresetItem[];
  onSelectPreset: (preset: PresetItem) => void;
  onClose: () => void;
  onPresetsUpdated: () => void;
}

export const PresetsView: React.FC<PresetsViewProps> = ({
  presets,
  onSelectPreset,
  onClose,
  onPresetsUpdated,
}) => {
  const [filterType, setFilterType] = useState<'all' | SubjectType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload state & errors per card
  const [coverErrors, setCoverErrors] = useState<Record<string, string>>({});
  const [isProcessingCoverId, setIsProcessingCoverId] = useState<string | null>(null);

  // Deletion modal state
  const [presetToDelete, setPresetToDelete] = useState<PresetItem | null>(null);

  // Renaming state
  const [editingPreset, setEditingPreset] = useState<PresetItem | null>(null);
  const [editingName, setEditingName] = useState('');

  // File upload input per card
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>, presetId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverErrors((prev) => ({ ...prev, [presetId]: '' }));
    setIsProcessingCoverId(presetId);

    const res = await processPresetCoverImage(file, 512, 0.8);
    setIsProcessingCoverId(null);

    if (res.error) {
      setCoverErrors((prev) => ({ ...prev, [presetId]: res.error || 'อัปโหลดภาพหน้าปกไม่สำเร็จ' }));
      return;
    }

    if (res.dataUrl) {
      const updateRes = updatePresetCover(presetId, res.dataUrl);
      if (updateRes.success) {
        onPresetsUpdated();
      } else {
        setCoverErrors((prev) => ({
          ...prev,
          [presetId]: updateRes.error || 'หน่วยความจำเบราว์เซอร์เต็ม ไม่สามารถบันทึกภาพหน้าปกได้',
        }));
      }
    }
  };

  const handleStartRename = (e: React.MouseEvent, preset: PresetItem) => {
    e.stopPropagation();
    setEditingPreset(preset);
    setEditingName(preset.name);
  };

  const handleSaveRename = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingPreset || !editingName.trim()) return;

    renamePresetItem(editingPreset.id, editingName.trim());
    setEditingPreset(null);
    onPresetsUpdated();
  };

  const handleConfirmDelete = () => {
    if (presetToDelete) {
      deletePresetItem(presetToDelete.id);
      setPresetToDelete(null);
      onPresetsUpdated();
    }
  };

  // Filter and search
  const filteredPresets = presets.filter((p) => {
    if (filterType !== 'all' && p.subjectType !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchMenu = p.menuName.toLowerCase().includes(q);
      const matchCuisine = p.cuisineHint.toLowerCase().includes(q);
      return matchName || matchMenu || matchCuisine;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
          <div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าสตูดิโอสร้างพรอมต์</span>
            </button>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-950 flex items-center gap-3 font-sans">
              <span>คลังพรีเซ็ตที่บันทึกไว้</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold">
                {presets.length} พรีเซ็ต
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium">
              คลิกที่การ์ดพรีเซ็ตเพื่อโหลดค่าทั้งหมดกลับมาใช้งาน พร้อมสลับชื่อเมนูได้ทันที
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อพรีเซ็ตหรือเมนู..."
                className="pl-8 pr-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 shadow-xs font-medium"
              />
            </div>

            {/* Type Filter Buttons */}
            <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-300 shadow-xs">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 font-medium'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                type="button"
                onClick={() => setFilterType('food')}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  filterType === 'food'
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 font-medium'
                }`}
              >
                อาหาร
              </button>
              <button
                type="button"
                onClick={() => setFilterType('beverage')}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  filterType === 'beverage'
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'text-stone-700 hover:text-stone-950 font-medium'
                }`}
              >
                เครื่องดื่ม
              </button>
            </div>
          </div>
        </div>

        {/* Presets Grid */}
        {filteredPresets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPresets.map((preset) => {
              const cardError = coverErrors[preset.id];
              const isProcessingThis = isProcessingCoverId === preset.id;

              return (
                <div
                  key={preset.id}
                  onClick={() => onSelectPreset(preset)}
                  className="group bg-white border border-stone-200/90 hover:border-amber-500 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Cover Section */}
                  <div>
                    <div className="relative h-48 bg-stone-100 overflow-hidden border-b border-stone-200">
                      {preset.coverImageDataUrl ? (
                        <img
                          src={preset.coverImageDataUrl}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* Tasteful warm cream/amber placeholder with preset name */
                        <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100/60">
                          <div className="flex items-center justify-between">
                            <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-amber-700 shadow-xs">
                              {preset.subjectType === 'food' ? (
                                <Utensils className="w-4 h-4" />
                              ) : (
                                <GlassWater className="w-4 h-4" />
                              )}
                            </div>
                            <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/80 border border-stone-300 text-stone-600 shadow-xs">
                              No Cover
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-extrabold text-stone-950 group-hover:text-amber-700 transition-colors line-clamp-2">
                              {preset.name}
                            </h4>
                            <p className="text-xs text-stone-700 mt-1 line-clamp-1 font-medium">
                              {preset.menuName || 'เมนูที่บันทึกไว้'}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Subject Type Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md shadow-xs border ${
                            preset.subjectType === 'food'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-cyan-100 text-cyan-900 border-cyan-300'
                          }`}
                        >
                          {preset.subjectType === 'food' ? (
                            <>
                              <Utensils className="w-3 h-3" />
                              <span>Food</span>
                            </>
                          ) : (
                            <>
                              <GlassWater className="w-3 h-3" />
                              <span>Beverage</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Aspect Ratio Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/90 text-stone-800 border border-stone-300 backdrop-blur-md shadow-xs">
                          {preset.aspectRatio}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      {/* Name & Inline Rename */}
                      {editingPreset?.id === preset.id ? (
                        <form
                          onSubmit={handleSaveRename}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1 px-2.5 py-1 bg-white border border-amber-600 rounded-lg text-xs text-stone-950 font-medium"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="p-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700 cursor-pointer"
                            title="บันทึกชื่อ"
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingPreset(null)}
                            className="p-1 rounded-lg bg-stone-200 text-stone-700 hover:bg-stone-300 cursor-pointer"
                            title="ยกเลิก"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      ) : (
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <h3 className="text-sm sm:text-base font-bold text-stone-950 line-clamp-1 group-hover:text-amber-700 transition-colors">
                            {preset.name}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={(e) => handleStartRename(e, preset)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                              title="เปลี่ยนชื่อพรีเซ็ต"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setPresetToDelete(preset)}
                              className="p-1.5 rounded-lg text-stone-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                              title="ลบพรีเซ็ตนี้"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Menu Name Tag */}
                      <p className="text-xs text-stone-800 mb-2 flex items-center gap-1.5 font-medium">
                        <span className="text-stone-500">เมนู:</span>
                        <strong className="text-amber-900 font-bold truncate">
                          {preset.menuName || '[ไม่ระบุชื่อ]'}
                        </strong>
                        {preset.cuisineHint && (
                          <span className="text-[10px] text-stone-700 bg-stone-100 border border-stone-200 px-1.5 py-0.2 rounded font-normal">
                            {preset.cuisineHint}
                          </span>
                        )}
                      </p>

                      {/* Specs summary pills */}
                      <div className="flex flex-wrap gap-1.5 mb-3 text-[11px] text-stone-700 font-medium">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">
                          {preset.cameraAngle}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200">
                          {preset.lighting}
                        </span>
                      </div>

                      {/* Error message if cover upload failed */}
                      {cardError && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="mb-3 p-2 rounded-lg bg-red-50 border border-red-200 text-[11px] text-red-700 flex items-start gap-1.5 font-medium"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{cardError}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Cover Image Actions */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 pt-0 border-t border-stone-200 bg-stone-50/70 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500 font-medium">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(preset.createdAt).toLocaleDateString('th-TH')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={isProcessingThis}
                        onClick={() => fileInputRefs.current[preset.id]?.click()}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                        title="อัปโหลดภาพผลลัพธ์ที่คุณสร้างได้เอง (ย่อเป็น max 512px อัตโนมัติ)"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-700" />
                        <span className="text-[11px]">
                          {isProcessingThis ? 'กำลังย่อภาพ...' : preset.coverImageDataUrl ? 'เปลี่ยนภาพปก' : 'เพิ่มภาพปก'}
                        </span>
                      </button>

                      <input
                        ref={(el) => {
                          fileInputRefs.current[preset.id] = el;
                        }}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                        className="hidden"
                        onChange={(e) => handleUploadCover(e, preset.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-2xl bg-white border border-dashed border-stone-300 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              {presets.length === 0 ? 'ยังไม่มีพรีเซ็ตที่บันทึกไว้' : 'ไม่พบพรีเซ็ตที่ค้นหา'}
            </h3>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed font-medium">
              {presets.length === 0
                ? 'คุณสามารถเลือกมุมมองและการจัดองค์ประกอบในหน้าหลัก แล้วกดปุ่ม "บันทึกเป็นพรีเซ็ต" เพื่อจัดเก็บไว้เรียกใช้งานซ้ำ'
                : 'ลองเปลี่ยนคำค้นหา หรือสลับแท็บตัวกรองประเภทอาหารและเครื่องดื่ม'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs sm:text-sm hover:bg-amber-700 transition-colors shadow-md shadow-amber-600/20 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับสู่หน้าสร้างพรอมต์</span>
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(presetToDelete)}
        title="ยืนยันการลบพรีเซ็ต"
        message={`คุณแน่ใจหรือไม่ว่าต้องการลบพรีเซ็ต "${presetToDelete?.name}" ออกจากเบราว์เซอร์นี้? การกระทำนี้ไม่สามารถย้อนกลับได้`}
        confirmLabel="ลบพรีเซ็ตนี้"
        cancelLabel="ยกเลิก"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPresetToDelete(null)}
      />
    </div>
  );
};
