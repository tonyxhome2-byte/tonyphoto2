import { FormState, GeneratedPromptResult } from '../types';
import {
  BACKGROUND_DETAILS,
  BEVERAGE_EFFECTS,
  CAMERA_ANGLES,
  CROP_DISTANCES_BEVERAGE,
  CROP_DISTANCES_FOOD,
  getCropLens,
  getOptionPhrase,
  LIGHTING_STYLES,
  MAIN_POSITIONS,
  MOOD_AND_ESSENCE,
} from '../config/options';

const ATTACH_INSTRUCTION = '[Attach your reference image and your vessel image to this chat first.]';

/**
 * Builds deterministic Gemini prompt texts
 */
function isCannedSodaEffect(val?: string): boolean {
  if (!val || val === 'None') return false;
  return (
    val.startsWith('Can') ||
    val.startsWith('Crushed can') ||
    val.startsWith('Dual cans') ||
    val.startsWith('Pour from can') ||
    val.startsWith('Floating condensation can') ||
    val.toLowerCase().includes('can')
  );
}

/**
 * Builds deterministic Gemini prompt texts
 */
export function buildGeminiPrompt(state: FormState): {
  singleMessage: string;
  message1: string;
  message2: string;
} {
  const isFood = state.subjectType === 'food';
  const menuName = state.menuName.trim() || (isFood ? 'Gourmet Dish' : 'Artisanal Beverage');
  const cuisineHintText = state.cuisineHint.trim() ? ` (cuisine/origin: ${state.cuisineHint.trim()})` : '';

  const cameraAnglePhrase = getOptionPhrase(CAMERA_ANGLES, state.cameraAngle);
  const lightingPhrase = getOptionPhrase(LIGHTING_STYLES, state.lighting);
  const moodPhrase = getOptionPhrase(MOOD_AND_ESSENCE, state.mood);
  const positionPhrase = getOptionPhrase(MAIN_POSITIONS, state.mainPosition);

  const cropOptions = isFood ? CROP_DISTANCES_FOOD : CROP_DISTANCES_BEVERAGE;
  const { phrase: cropPhrase, lens: lensPhrase } = getCropLens(cropOptions, state.cropDistance);
  const backgroundPhrase = getOptionPhrase(BACKGROUND_DETAILS, state.backgroundDetail);

  const beverageEffectPhrase = !isFood && state.beverageEffect && state.beverageEffect !== 'None'
    ? getOptionPhrase(BEVERAGE_EFFECTS, state.beverageEffect)
    : '';

  const secondaryEffectPhrase = !isFood && state.secondaryEffect && state.secondaryEffect !== 'None'
    ? getOptionPhrase(BEVERAGE_EFFECTS, state.secondaryEffect)
    : '';

  const isCan = !isFood && (isCannedSodaEffect(state.beverageEffect) || isCannedSodaEffect(state.secondaryEffect));

  const vesselWord = isFood ? 'plate/bowl vessel' : (isCan ? 'aluminum soda can vessel' : 'glass/bottle vessel');
  const itemTypeWord = isFood ? 'plated food dish' : (isCan ? 'canned soda beverage' : 'beverage');
  const cuisineSilentPart = state.cuisineHint.trim() ? ` (cuisine hint: "${state.cuisineHint.trim()}")` : '';

  // Silent pre-check and output rule instructions for immediate image generation
  const silentPreCheck = `SILENT PRE-CHECK (do this internally, do NOT write it out): Study the attached reference image and the attached vessel image. Work out the vessel's exact material, shape and color, the reference image's colors, textures, plating style and mood, and the authentic main ingredients and signature look of "${menuName}"${cuisineSilentPart}. If the reference image conflicts with the authentic version of "${menuName}", follow the authentic main ingredients while keeping the reference's mood, colors and style. If the name is ambiguous, choose the most likely interpretation silently. Never invent ingredients that are not part of the real dish or visible in the reference.`;

  const outputRule = `OUTPUT RULE: Respond with the generated image only. Do not write any analysis, explanation, description, caption, introduction, summary, or follow-up question. Do not describe your plan or repeat these instructions. Generate the image immediately.`;

  // Vessel analysis prompt text (for Two-message mode Message 1)
  const vesselAnalysisText = isCan
    ? '(b) Analyze the vessel image in detail: examine the aluminum soda can proportions, brushed metallic texture, top rim and pull-tab details, and the can artwork and graphic color identity (faithfully replicate the graphics and colors from the attached image without inventing real trademark brand logos).'
    : '(b) Analyze the vessel image in detail: its material, shape, color, proportions, and unique craftsmanship.';

  // Phase 1 Analysis paragraph for Gemini (Two-message mode)
  const phase1Text = `Look at the attached reference image and the attached vessel image. Before generating any image, please provide a brief analysis: (a) Identify the exact ${itemTypeWord} shown in the reference image, including its visible ingredients, prominent color palette (with approximate hex codes), tactile textures, plating style, and mood. ${vesselAnalysisText} (c) Analyze "${menuName}"${cuisineHintText}: define what this authentic ${itemTypeWord} truly is, along with its verified genuine main ingredients and signature visual cues. (d) Consistency check: if the reference image differs from the authentic version of "${menuName}", your final image must adhere strictly to the authentic ingredients of "${menuName}" while adopting only the reference image's mood, color palette, and lighting style as inspiration. Never copy the reference image's exact composition. If the menu name is ambiguous, state your reasoned assumption clearly instead of inventing arbitrary ingredients. (e) Highlight key opportunities to elevate this presentation to world-class luxury commercial advertising caliber. Do not invent ingredients that are not authentic to this dish or visible in the reference.`;

  // Combined beverage dynamic cues
  const combinedBevEffect = beverageEffectPhrase && secondaryEffectPhrase
    ? `${beverageEffectPhrase}, paired with ${secondaryEffectPhrase}`
    : (beverageEffectPhrase || secondaryEffectPhrase);

  // Phase 2 Generation paragraph for Gemini
  const notesText = state.additionalNotes?.trim() ? ` Specific styling notes: ${state.additionalNotes.trim()}.` : '';
  const bevText = combinedBevEffect ? ` Special beverage dynamic cue: ${combinedBevEffect}.` : '';

  const realismCues = isFood
    ? 'natural wafting steam, delicate glossy sauce sheen, glistening moisture on fresh herbs, crisp caramelized surface textures, subtle organic imperfections, and realistic dining scale'
    : isCan
    ? 'crisp micro-droplets and chilled condensation beading on cold aluminum surface, brushed metallic specular highlights, razor-sharp pull-tab contour, sub-zero frost sheen, and dynamic effervescent carbonation fizz'
    : 'crisp micro-droplets on cold glass, jewel-toned liquid translucency, facet refractions through dense ice, delicate surface fizz, and tactile glassware texture';

  const vesselRuleText = isCan
    ? 'The beverage must be presented in the exact aluminum soda can shown in the attached vessel image—faithfully replicating its precise aluminum finish, pull-tab detail, printed graphics, colors, and can geometry without alteration (faithfully adopt the artwork from the attached image; do not invent trademark brand logos).'
    : 'The food or drink must be served in the exact vessel shown in the attached vessel image—faithfully replicating its precise material, shape, color, and finish without alteration.';

  const phase2Text = `Create an image: A photorealistic, high-end commercial advertising poster photograph of "${menuName}"${cuisineHintText}. The subject must feature verified, authentic fresh ingredients prepared with Michelin-star precision and appetizing vibrancy. ${vesselRuleText} Frame the shot with a ${cameraAnglePhrase}, captured on a ${lensPhrase}. The scene is illuminated by ${lightingPhrase}, sculpting rich depth, specular highlights, and soft graduated shadows. For composition, place the hero ${vesselWord} in a ${positionPhrase}, framed in a ${cropPhrase}, set against a ${backgroundPhrase}. The overall aesthetic and color harmony must be inspired by the attached reference image and elevated into ${moodPhrase}. Maintain absolute photorealism with ${realismCues}, avoiding any CGI artificiality, plastic sheen, or AI look.${bevText}${notesText} The final result must be an ultra-high-resolution commercial print-grade poster in ${state.aspectRatio} aspect ratio. Avoid: text overlays, logos, typography, watermarks, human hands, people, deformed utensils, duplicate plates, or distorted geometry.`;

  // Single message format: Immediate generation with silent pre-check & output rule
  const singleMessage = `${ATTACH_INSTRUCTION}

${silentPreCheck}

${outputRule}

${phase2Text}`;

  // Two messages format
  const message1 = `${ATTACH_INSTRUCTION}

${phase1Text}

Reply with your analysis only and wait for my next message. Do not generate an image yet.`;

  const message2 = `Using your analysis above, ${phase2Text}`;

  return { singleMessage, message1, message2 };
}

/**
 * Builds deterministic ChatGPT prompt texts
 */
export function buildChatGPTPrompt(state: FormState): {
  singleMessage: string;
  message1: string;
  message2: string;
} {
  const isFood = state.subjectType === 'food';
  const menuName = state.menuName.trim() || (isFood ? 'Gourmet Dish' : 'Artisanal Beverage');
  const cuisineHintText = state.cuisineHint.trim() ? ` (Cuisine/Origin: ${state.cuisineHint.trim()})` : '';
  const cuisineSilentPart = state.cuisineHint.trim() ? ` (cuisine hint: "${state.cuisineHint.trim()}")` : '';

  const cameraAnglePhrase = getOptionPhrase(CAMERA_ANGLES, state.cameraAngle);
  const lightingPhrase = getOptionPhrase(LIGHTING_STYLES, state.lighting);
  const moodPhrase = getOptionPhrase(MOOD_AND_ESSENCE, state.mood);
  const positionPhrase = getOptionPhrase(MAIN_POSITIONS, state.mainPosition);

  const cropOptions = isFood ? CROP_DISTANCES_FOOD : CROP_DISTANCES_BEVERAGE;
  const { phrase: cropPhrase, lens: lensPhrase } = getCropLens(cropOptions, state.cropDistance);
  const backgroundPhrase = getOptionPhrase(BACKGROUND_DETAILS, state.backgroundDetail);

  const beverageEffectPhrase = !isFood && state.beverageEffect && state.beverageEffect !== 'None'
    ? getOptionPhrase(BEVERAGE_EFFECTS, state.beverageEffect)
    : '';

  const secondaryEffectPhrase = !isFood && state.secondaryEffect && state.secondaryEffect !== 'None'
    ? getOptionPhrase(BEVERAGE_EFFECTS, state.secondaryEffect)
    : '';

  const isCan = !isFood && (isCannedSodaEffect(state.beverageEffect) || isCannedSodaEffect(state.secondaryEffect));

  const vesselWord = isFood ? 'plate/bowl' : (isCan ? 'aluminum soda can' : 'glass/bottle');
  const itemTypeWord = isFood ? 'plated food dish' : (isCan ? 'canned soda beverage' : 'beverage');

  // Silent pre-check and output rule instructions for immediate image generation
  const silentPreCheck = `SILENT PRE-CHECK (do this internally, do NOT write it out): Study the attached reference image and the attached vessel image. Work out the vessel's exact material, shape and color, the reference image's colors, textures, plating style and mood, and the authentic main ingredients and signature look of "${menuName}"${cuisineSilentPart}. If the reference image conflicts with the authentic version of "${menuName}", follow the authentic main ingredients while keeping the reference's mood, colors and style. If the name is ambiguous, choose the most likely interpretation silently. Never invent ingredients that are not part of the real dish or visible in the reference.`;

  const outputRule = `OUTPUT RULE: Respond with the generated image only. Do not write any analysis, explanation, description, caption, introduction, summary, or follow-up question. Do not describe your plan or repeat these instructions. Generate the image immediately.`;

  // Vessel analysis text (for Two-message mode Step 1)
  const vesselAnalysisText = isCan
    ? 'b) The vessel: exact aluminum soda can proportions, metallic finish, pull-tab detail, and the printed graphics and color identity from the attached image (replicate faithfully as shown, without generating unauthorized trademark logos).'
    : 'b) The vessel: exact material, shape, color, proportions, and distinctive design details.';

  // Step 1 Analysis text (Two-message mode)
  const step1Text = `Step 1 – Analyze first:
Please examine the attached reference image and the attached vessel image, and briefly state:
a) What ${itemTypeWord} is shown in the reference image, its visible ingredients, color palette with approximate hex codes, surface textures, plating style, and overall mood.
${vesselAnalysisText}
c) The menu name "${menuName}"${cuisineHintText}: authentic culinary definition, verified genuine main ingredients, and signature appetizing cues.
d) Consistency check: if the reference image does not match the authentic recipe of "${menuName}", the final poster must feature the authentic main ingredients of "${menuName}" while adopting only the reference image's mood, color palette, and lighting style as inspiration. Do not copy the reference image's exact composition. If the menu name is unfamiliar, state your assumption instead of inventing ingredients.
e) Opportunities to elevate this presentation to a luxury commercial advertising standard.
Note: Do not invent ingredients that are not authentic to this dish or visible in the reference.`;

  // Combined beverage dynamic cues
  const combinedBevEffect = beverageEffectPhrase && secondaryEffectPhrase
    ? `${beverageEffectPhrase}, paired with ${secondaryEffectPhrase}`
    : (beverageEffectPhrase || secondaryEffectPhrase);

  // Step 2 Generation lines for ChatGPT
  const realismCues = isFood
    ? 'Natural wafting steam where appropriate, glossy sauce highlights, fresh glistening moisture on herbs, crisp textured sear, subtle natural culinary imperfections, true-to-life scale, zero plastic/CGI look'
    : isCan
    ? 'Crisp condensation chill droplets and beading on cold aluminum surface, brushed metallic specular highlights, razor-sharp pull-tab detail, sub-zero frost sheen, dynamic carbonation fizz, zero plastic/CGI look'
    : 'Crisp condensation chill droplets on glass, jewel-toned liquid translucency, light refractions through dense ice, delicate effervescence, zero plastic/CGI look';

  const vesselRuleText = isCan
    ? 'Exact aluminum soda can from the attached vessel image (faithfully replicating its material, metallic finish, colors, and can artwork without alteration; do not invent real trademark logos).'
    : 'Exact vessel from the attached vessel image (identical material, shape, and color finish). Do not alter the vessel.';

  const notesLine = state.additionalNotes?.trim() ? `\n• Notes: ${state.additionalNotes.trim()}` : '';
  const bevLine = combinedBevEffect ? `\n• Special Effect: ${combinedBevEffect}` : '';

  const generationLines = `Create one photorealistic commercial advertising poster photograph of "${menuName}" in aspect ratio ${state.aspectRatio}:
• Subject: "${menuName}"${cuisineHintText} featuring verified authentic fresh ingredients, exquisite culinary craft, and appetizing textures.
• Vessel: ${vesselRuleText}
• Camera: ${cameraAnglePhrase}; captured with a ${lensPhrase}.
• Lighting: ${lightingPhrase}.
• Composition: Hero ${vesselWord} positioned at ${positionPhrase}; crop distance: ${cropPhrase}; background: ${backgroundPhrase}.
• Mood & Palette: ${moodPhrase}; color palette, textures, and ambient elegance inspired by the attached reference image (elevated to luxury, do not duplicate the reference layout).
• Realism: ${realismCues}.${bevLine}${notesLine}
• Technical: Ultra-high resolution, commercial print advertising quality, razor-sharp focus plane, aspect ratio ${state.aspectRatio}.
• Avoid: Text overlays, typography, logos, brand watermarks, human hands, people, deformed utensils, duplicate plates, or distorted geometry.`;

  // Single message format: Immediate generation with silent pre-check & output rule
  const singleMessage = `${ATTACH_INSTRUCTION}

${silentPreCheck}

${outputRule}

${generationLines}`;

  // Two messages format
  const message1 = `${ATTACH_INSTRUCTION}

${step1Text}

Reply with your analysis only and wait for my next message. Do not generate an image yet.`;

  const message2 = `Using your analysis above, create the advertising poster image:

${generationLines}`;

  return { singleMessage, message1, message2 };
}

/**
 * Builds both Gemini and ChatGPT prompts synchronously
 */
export function buildAllPrompts(state: FormState): GeneratedPromptResult {
  return {
    gemini: buildGeminiPrompt(state),
    chatgpt: buildChatGPTPrompt(state),
  };
}

/**
 * Robust clipboard copy helper with textarea fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  // Try navigator.clipboard first
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
    }
  }

  // Fallback using textarea + execCommand
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    textArea.style.left = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback clipboard copy failed:', err);
    return false;
  }
}
