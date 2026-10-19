const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
const MAX_RAW_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB max before resize

export interface ProcessCoverResult {
  dataUrl?: string;
  error?: string;
}

/**
 * Resizes an uploaded preset cover image client-side to max 512px JPEG quality 0.8
 * Prevents localStorage quota overflow while maintaining crisp thumbnail detail.
 */
export async function processPresetCoverImage(
  file: File,
  maxDimension: number = 512,
  quality: number = 0.8
): Promise<ProcessCoverResult> {
  // Validate type
  if (!ALLOWED_MIME_TYPES.includes(file.type) && !file.type.startsWith('image/')) {
    return {
      error: `ชนิดไฟล์ "${file.type || 'ไม่ทราบชนิด'}" ไม่ถูกต้อง กรุณาอัปโหลดรูปภาพ เช่น JPG, PNG หรือ WebP`,
    };
  }

  // Validate raw size
  if (file.size > MAX_RAW_FILE_SIZE_BYTES) {
    return {
      error: 'ขนาดไฟล์ภาพใหญ่เกินไป (จำกัดไม่เกิน 20MB ก่อนการย่อขนาด)',
    };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onerror = () => {
      resolve({ error: 'ไม่สามารถเปิดอ่านไฟล์รูปภาพได้ กรุณาลองใหม่อีกครั้ง' });
    };

    reader.onload = () => {
      const img = new Image();

      img.onerror = () => {
        resolve({ error: 'รูปภาพเสียหายหรือไม่สามารถประมวลผลได้' });
      };

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width <= 0 || height <= 0) {
          resolve({ error: 'ขนาดรูปภาพไม่ถูกต้อง' });
          return;
        }

        // Downscale maintaining aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve({ error: 'ไม่สามารถประมวลผล Canvas บนเบราว์เซอร์ได้' });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve({ dataUrl });
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}
