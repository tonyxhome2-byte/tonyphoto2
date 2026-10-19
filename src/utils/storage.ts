import { FormState, PresetItem, SubjectType } from '../types';

export const STORAGE_KEY_PRESETS = 'food_drink_ad_studio_presets_v2';

// In-memory fallback if localStorage is disabled, blocked, or full
let memoryPresetsCache: PresetItem[] = [];
let isLocalStorageAvailable = true;

/**
 * Checks if localStorage is functional
 */
function testLocalStorage(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

isLocalStorageAvailable = testLocalStorage();

export const DEFAULT_FORM_STATE: FormState = {
  subjectType: 'food',
  menuName: '',
  cuisineHint: '',
  cameraAngle: 'Hero 45°',
  lighting: 'Soft window light',
  mood: 'Luxurious & Premium',
  beverageEffect: 'None',
  secondaryEffect: 'None',
  mainPosition: 'Center',
  cropDistance: 'Medium',
  backgroundDetail: 'Dark textured stone',
  aspectRatio: '4:5',
  additionalNotes: '',
  outputMode: 'one-message',
};

/**
 * Sanitizes a loaded preset object, guaranteeing all required fields exist
 */
function sanitizePreset(raw: any): PresetItem | null {
  if (!raw || typeof raw !== 'object') return null;

  const subjectType: SubjectType = raw.subjectType === 'beverage' ? 'beverage' : 'food';

  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : `preset_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    name: typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : 'พรีเซ็ตไม่มีชื่อ',
    createdAt: typeof raw.createdAt === 'number' ? raw.createdAt : Date.now(),
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : Date.now(),
    subjectType,
    menuName: typeof raw.menuName === 'string' ? raw.menuName : '',
    cuisineHint: typeof raw.cuisineHint === 'string' ? raw.cuisineHint : '',
    cameraAngle: typeof raw.cameraAngle === 'string' ? raw.cameraAngle : DEFAULT_FORM_STATE.cameraAngle,
    lighting: typeof raw.lighting === 'string' ? raw.lighting : DEFAULT_FORM_STATE.lighting,
    mood: typeof raw.mood === 'string' ? raw.mood : DEFAULT_FORM_STATE.mood,
    beverageEffect: typeof raw.beverageEffect === 'string' ? raw.beverageEffect : 'None',
    secondaryEffect: typeof raw.secondaryEffect === 'string' ? raw.secondaryEffect : 'None',
    mainPosition: typeof raw.mainPosition === 'string' ? raw.mainPosition : DEFAULT_FORM_STATE.mainPosition,
    cropDistance: typeof raw.cropDistance === 'string' ? raw.cropDistance : DEFAULT_FORM_STATE.cropDistance,
    backgroundDetail: typeof raw.backgroundDetail === 'string' ? raw.backgroundDetail : DEFAULT_FORM_STATE.backgroundDetail,
    aspectRatio: ['1:1', '4:5', '3:4', '9:16', '16:9'].includes(raw.aspectRatio) ? raw.aspectRatio : '4:5',
    additionalNotes: typeof raw.additionalNotes === 'string' ? raw.additionalNotes : '',
    outputMode: raw.outputMode === 'two-messages' ? 'two-messages' : 'one-message',
    coverImageDataUrl: typeof raw.coverImageDataUrl === 'string' ? raw.coverImageDataUrl : undefined,
  };
}

/**
 * Safely loads presets from localStorage or in-memory fallback
 */
export function loadSavedPresets(): PresetItem[] {
  if (!isLocalStorageAvailable) {
    return [...memoryPresetsCache];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRESETS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const sanitized = parsed
      .map(sanitizePreset)
      .filter((p): p is PresetItem => p !== null);

    memoryPresetsCache = sanitized;
    return sanitized;
  } catch (err) {
    console.warn('Failed to read presets from localStorage, falling back to memory cache:', err);
    return [...memoryPresetsCache];
  }
}

/**
 * Safely saves a preset item to localStorage with in-memory fallback
 */
export function savePresetItem(preset: PresetItem): { success: boolean; error?: string } {
  try {
    const current = loadSavedPresets();
    const existingIndex = current.findIndex((p) => p.id === preset.id);

    if (existingIndex >= 0) {
      current[existingIndex] = { ...preset, updatedAt: Date.now() };
    } else {
      current.unshift({ ...preset, updatedAt: Date.now() });
    }

    memoryPresetsCache = current;

    if (isLocalStorageAvailable) {
      localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(current));
    }

    return { success: true };
  } catch (err: any) {
    const isQuota =
      err &&
      (err.name === 'QuotaExceededError' ||
        err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
        err.code === 22 ||
        err.code === 1014);

    return {
      success: false,
      error: isQuota
        ? 'หน่วยความจำของเบราว์เซอร์เต็ม กรุณาลบภาพหน้าปกหรือพรีเซ็ตเก่าที่ไม่ใช้ (ระบบจะจัดเก็บในหน่วยความจำชั่วคราวแทน)'
        : 'ไม่สามารถบันทึกลงในหน่วยความจำถาวรได้ แต่บันทึกในหน่วยความจำชั่วคราวแล้ว',
    };
  }
}

/**
 * Renames an existing preset
 */
export function renamePresetItem(id: string, newName: string): { success: boolean; error?: string } {
  try {
    const current = loadSavedPresets();
    const target = current.find((p) => p.id === id);
    if (!target) return { success: false, error: 'ไม่พบพรีเซ็ตที่ต้องการเปลี่ยนชื่อ' };

    target.name = newName.trim();
    target.updatedAt = Date.now();
    memoryPresetsCache = current;

    if (isLocalStorageAvailable) {
      localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(current));
    }
    return { success: true };
  } catch {
    return { success: false, error: 'ไม่สามารถเปลี่ยนชื่อพรีเซ็ตได้' };
  }
}

/**
 * Deletes a preset
 */
export function deletePresetItem(id: string): { success: boolean; error?: string } {
  try {
    const current = loadSavedPresets();
    const filtered = current.filter((p) => p.id !== id);
    memoryPresetsCache = filtered;

    if (isLocalStorageAvailable) {
      localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(filtered));
    }
    return { success: true };
  } catch {
    return { success: false, error: 'ไม่สามารถลบพรีเซ็ตได้' };
  }
}

/**
 * Updates or removes the cover image of a preset
 */
export function updatePresetCover(id: string, coverImageDataUrl?: string): { success: boolean; error?: string } {
  try {
    const current = loadSavedPresets();
    const target = current.find((p) => p.id === id);
    if (!target) return { success: false, error: 'ไม่พบพรีเซ็ต' };

    target.coverImageDataUrl = coverImageDataUrl;
    target.updatedAt = Date.now();
    memoryPresetsCache = current;

    if (isLocalStorageAvailable) {
      localStorage.setItem(STORAGE_KEY_PRESETS, JSON.stringify(current));
    }
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: 'หน่วยความจำเบราว์เซอร์เต็ม ไม่สามารถบันทึกภาพหน้าปกได้',
    };
  }
}
