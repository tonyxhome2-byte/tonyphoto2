import { AspectRatio, SubjectType } from '../types';

export interface DropdownOption {
  value: string;
  labelThai: string;
  labelEn: string;
  promptPhrase: string;
  lensSuggestion?: string;
  group?: string;
}

export interface OptionGroup {
  groupName: string;
  options: DropdownOption[];
}

export const CAMERA_ANGLES: DropdownOption[] = [
  {
    value: 'Hero 45°',
    labelThai: 'Hero 45° — มุมฮีโร่ 45 องศา (มุมมาตรฐานยอดนิยม เห็นมิติดีที่สุด)',
    labelEn: 'Hero 45° angle',
    promptPhrase: 'hero shot angled at a 45-degree perspective, showcasing three-dimensional depth, elevation, and appetizing layers',
  },
  {
    value: 'Top-down 90° Flat Lay',
    labelThai: 'Top-down 90° Flat Lay — มุมมองท็อปดาวน์ 90 องศา (เห็นการจัดวางทั้งจาน)',
    labelEn: 'Top-down 90° flat lay',
    promptPhrase: 'overhead 90-degree flat lay bird\'s-eye perspective capturing the complete symmetrical plating geometry and balanced arrangement',
  },
  {
    value: 'Eye-level 0°',
    labelThai: 'Eye-level 0° — มุมระดับสายตา 0 องศา (เน้นความสูง ชั้นเลเยอร์ และความโอ่อ่า)',
    labelEn: 'Eye-level 0° angle',
    promptPhrase: 'straight-on eye-level 0-degree angle emphasizing vertical stacking, tall layering, and monumental profile presence',
  },
  {
    value: 'Low angle',
    labelThai: 'Low angle — มุมเงยช้อนต่ำ (สร้างความสง่างาม อลังการ และดูยิ่งใหญ่)',
    labelEn: 'Low angle',
    promptPhrase: 'heroic low-angle perspective looking slightly upward to convey culinary grandeur, prestige, and majestic presence',
  },
  {
    value: '3/4 view',
    labelThai: '3/4 view — มุมเฉียง 3 ส่วน 4 (เห็นทั้งด้านหน้าและด้านข้างของภาชนะ)',
    labelEn: 'Three-quarter view',
    promptPhrase: 'three-quarter view capturing both the front focal garnish and the dimensional sculpted side contours',
  },
  {
    value: 'Macro close-up',
    labelThai: 'Macro close-up — มาโครระยะประชิด (เจาะลึกเนื้อสัมผัส ละอองน้ำ หรือเกล็ดเกลือ)',
    labelEn: 'Macro close-up',
    promptPhrase: 'intimate macro close-up framing focusing on micro textures, caramelized crusts, moisture sheen, and delicate garnishes',
  },
  {
    value: 'Slight Dutch angle',
    labelThai: 'Slight Dutch angle — เอียงมุมกล้องเล็กน้อย (ไดนามิกทันสมัยแบบแมกกาซีน)',
    labelEn: 'Slight Dutch angle',
    promptPhrase: 'subtle Dutch angle tilt introducing dynamic editorial movement and high-fashion gastronomic elegance',
  },
];

export const LIGHTING_STYLES: DropdownOption[] = [
  {
    value: 'Soft window light',
    labelThai: 'Soft window light — แสงนุ่มริมหน้าต่างธรรมชาติ (ละมุน อบอุ่น เป็นธรรมชาติ)',
    labelEn: 'Soft window light',
    promptPhrase: 'soft diffused directional natural window daylight with gentle graduated shadows and delicate highlights',
  },
  {
    value: 'Dramatic low-key Chiaroscuro',
    labelThai: 'Dramatic low-key Chiaroscuro — แสงดราม่าเคียรอสคูโร แสงเงามืดตัดชัดเจน (หรูหรา ลึกลับ)',
    labelEn: 'Dramatic low-key Chiaroscuro',
    promptPhrase: 'dramatic low-key chiaroscuro lighting featuring deep velvety shadows and high-contrast sculpted specular rim highlights',
  },
  {
    value: 'High-key bright & clean',
    labelThai: 'High-key bright & clean — แสงสว่างสดใส คลีน โมเดิร์น (สว่างสะอาดตา)',
    labelEn: 'High-key bright & clean',
    promptPhrase: 'high-key bright and luminous studio lighting, crisp white accents, and clean shadow-free ambience',
  },
  {
    value: 'Rim/back light with steam',
    labelThai: 'Rim/back light with steam — แสงริมไลท์ย้อนหลังขับเน้นควันกรุ่นหรือขอบแก้ว (มีมิติโดดเด่น)',
    labelEn: 'Rim/back light with steam',
    promptPhrase: 'strong luminous back rim-lighting sculpting the silhouette, back-illuminating delicate wafting steam and glistening edges',
  },
  {
    value: 'Golden hour warm',
    labelThai: 'Golden hour warm — แสงสีทองอบอุ่นยามบ่ายแก่ (ละมุน ให้ความรู้สึกพรีเมียมอบอุ่น)',
    labelEn: 'Golden hour warm',
    promptPhrase: 'warm golden-hour ambient sidelight casting elongated amber glows and rich honey-toned highlights',
  },
  {
    value: 'Studio softbox 3-point',
    labelThai: 'Studio softbox 3-point — แสงสตูดิโอ 3 จุดมาตรฐานโฆษณาระดับโลก (คมชัด ไม่มีเงารบกวน)',
    labelEn: 'Studio softbox 3-point',
    promptPhrase: 'commercial studio 3-point softbox setup with precise key light, subtle fill, and crisp contouring hair light',
  },
  {
    value: 'Moody dark luxury',
    labelThai: 'Moody dark luxury — แสงมืดหรูหราสไตล์ไฟน์ไดนิ่ง (โทนดาร์ก อัตลักษณ์แบรนด์ระดับสูง)',
    labelEn: 'Moody dark luxury',
    promptPhrase: 'moody dark luxury fine-dining atmosphere with focused spotlighting, dark stone textures, and ambient candlelight warmth',
  },
  {
    value: 'Neon accent',
    labelThai: 'Neon accent — แสงนีออนแซมโมเดิร์นค็อกเทลบาร์ (ทันสมัย สีสันจัดจ้าน)',
    labelEn: 'Neon accent',
    promptPhrase: 'sophisticated cocktail lounge lighting with deep moody base and selective vibrant neon colored edge-reflections',
  },
];

export const MOOD_AND_ESSENCE: DropdownOption[] = [
  {
    value: 'Luxurious & Premium',
    labelThai: 'Luxurious & Premium — หรูหรา ไฮเอนด์ มาตรฐานมิชลินสตาร์',
    labelEn: 'Luxurious & Premium',
    promptPhrase: 'ultra-luxurious Michelin-star fine dining aesthetic, prestigious and refined',
  },
  {
    value: 'Fresh & Vibrant',
    labelThai: 'Fresh & Vibrant — สดชื่น มีชีวิตชีวา วัตถุดิบฉ่ำสด',
    labelEn: 'Fresh & Vibrant',
    promptPhrase: 'vividly fresh, crisp, organic vitality with glistening natural moisture',
  },
  {
    value: 'Warm & Comforting',
    labelThai: 'Warm & Comforting — อบอุ่น สบายใจ ชวนให้อยากลิ้มลอง',
    labelEn: 'Warm & Comforting',
    promptPhrase: 'heartwarming, nostalgic, comforting artisanal warmth',
  },
  {
    value: 'Rustic Artisan',
    labelThai: 'Rustic Artisan — คราฟต์ทำมือ ออร์แกนิก วัตถุดิบท้องถิ่นแท้',
    labelEn: 'Rustic Artisan',
    promptPhrase: 'rustic farm-to-table handcrafted artisan heritage with earthy natural textures',
  },
  {
    value: 'Modern Minimal',
    labelThai: 'Modern Minimal — เรียบหรู มินิมอล โมเดิร์นอาร์ต',
    labelEn: 'Modern Minimal',
    promptPhrase: 'sleek modern avant-garde minimalism with deliberate negative space and architectural precision',
  },
  {
    value: 'Indulgent & Decadent',
    labelThai: 'Indulgent & Decadent — เข้มข้น เย้ายวน ชวนหลงใหล ละลายในปาก',
    labelEn: 'Indulgent & Decadent',
    promptPhrase: 'richly indulgent, decadent, mouthwatering sensory decadence',
  },
  {
    value: 'Playful & Energetic',
    labelThai: 'Playful & Energetic — สดใส ขี้เล่น พลังงานสูง มีลูกเล่น',
    labelEn: 'Playful & Energetic',
    promptPhrase: 'bold playful energy with punchy dynamic contrast and contemporary styling',
  },
  {
    value: 'Elegant Fine-dining',
    labelThai: 'Elegant Fine-dining — สง่างาม ภูมิฐาน ไฟน์ไดนิ่งระดับ 5 ดาว',
    labelEn: 'Elegant Fine-dining',
    promptPhrase: 'impeccably poised high-end gastronomy presentation with quiet luxury and bespoke perfection',
  },
];

export const BEVERAGE_EFFECTS: DropdownOption[] = [
  // General
  {
    value: 'None',
    labelThai: 'None (ไม่ใส่ลูกเล่นพิเศษ)',
    labelEn: 'None',
    promptPhrase: '',
    group: 'General (ทั่วไป)',
  },

  // Group: Liquid motion (ของเหลวเคลื่อนไหว)
  {
    value: 'Crown splash',
    labelThai: 'Crown splash (ละอองน้ำทรงมงกุฎ)',
    labelEn: 'Crown splash',
    promptPhrase: 'a perfect frozen crown-shaped splash erupting from the surface of the liquid, sharp droplets suspended mid-air at 1/8000s',
    group: 'Liquid motion (ของเหลวเคลื่อนไหว)',
  },
  {
    value: 'Liquid swirl vortex',
    labelThai: 'Liquid swirl vortex (น้ำวนเกลียว)',
    labelEn: 'Liquid swirl vortex',
    promptPhrase: 'a graceful spiraling vortex of liquid frozen in motion inside the glass',
    group: 'Liquid motion (ของเหลวเคลื่อนไหว)',
  },
  {
    value: 'Ribbon pour',
    labelThai: 'Ribbon pour (สายน้ำรินพลิ้วไหว)',
    labelEn: 'Ribbon pour',
    promptPhrase: 'a continuous silky ribbon stream of beverage pouring gracefully into the vessel with fluid dynamic elegance',
    group: 'Liquid motion (ของเหลวเคลื่อนไหว)',
  },
  {
    value: 'Frozen splash',
    labelThai: 'Frozen splash (สายน้ำหรือฟองกระเด็นแบบหยุดนิ่ง)',
    labelEn: 'Frozen splash',
    promptPhrase: 'high-speed frozen splash of crystal-clear liquid droplets and effervescent bubbles suspended gracefully in mid-air',
    group: 'Liquid motion (ของเหลวเคลื่อนไหว)',
  },
  {
    value: 'Pour in motion',
    labelThai: 'Pour in motion (จังหวะการเทเครื่องดื่มอย่างมีมิติ)',
    labelEn: 'Pour in motion',
    promptPhrase: 'dynamic pour in motion with a silky fluid stream creating gentle aeration and surface ripples',
    group: 'Liquid motion (ของเหลวเคลื่อนไหว)',
  },
  {
    value: 'Cascading overflow',
    labelThai: 'Cascading overflow (ของเหลวรินล้นขอบแก้ว)',
    labelEn: 'Cascading overflow',
    promptPhrase: 'luxurious slow cascade of liquid or thick foam gently overflowing down the glistening exterior of the glass',
    group: 'Liquid motion (ของเหลวเคลื่อนไหว)',
  },
  {
    value: 'Effervescent surface burst',
    labelThai: 'Effervescent surface burst (ฟองซ่าปะทุผิวน้ำ)',
    labelEn: 'Effervescent surface burst',
    promptPhrase: 'tiny sparkling carbonation droplets and effervescent bubbles bursting briskly across the liquid surface',
    group: 'Liquid motion (ของเหลวเคลื่อนไหว)',
  },

  // Group: Ice & Chill (น้ำแข็งและความเย็น)
  {
    value: 'Condensation droplets',
    labelThai: 'Condensation droplets (ละอองไอน้ำเกาะแก้ว)',
    labelEn: 'Condensation droplets',
    promptPhrase: 'microscopic crisp condensation beads and chill droplets clinging tightly to the cold glass exterior',
    group: 'Ice & Chill (น้ำแข็งและความเย็น)',
  },
  {
    value: 'Ice crystals',
    labelThai: 'Ice crystals (เกล็ดและก้อนน้ำแข็งคริสตัลใสแวววาว)',
    labelEn: 'Ice crystals',
    promptPhrase: 'artisanal hand-carved crystal-clear dense ice cubes with sharp refractive facets and delicate frost crystals',
    group: 'Ice & Chill (น้ำแข็งและความเย็น)',
  },
  {
    value: 'Frosted glass chill',
    labelThai: 'Frosted glass chill (แก้วแช่แข็งฝ้าไอเย็น)',
    labelEn: 'Frosted glass chill',
    promptPhrase: 'frosty chilled glassware surface with delicate ice mist coating and crystalline frost rim',
    group: 'Ice & Chill (น้ำแข็งและความเย็น)',
  },
  {
    value: 'Dry ice smoke mist',
    labelThai: 'Dry ice smoke mist (หมอกควันไอเย็นไดรไอซ์)',
    labelEn: 'Dry ice smoke mist',
    promptPhrase: 'dramatic velvety plumes of dense white dry-ice vapor cascading over the rim and pooling around the glass base',
    group: 'Ice & Chill (น้ำแข็งและความเย็น)',
  },
  {
    value: 'Crushed pebble ice',
    labelThai: 'Crushed pebble ice (น้ำแข็งเกล็ดละเอียดสะท้อนแสง)',
    labelEn: 'Crushed pebble ice',
    promptPhrase: 'sparkling bed of crushed pebble ice gleaming with gem-like specular refractions and crisp cold sheen',
    group: 'Ice & Chill (น้ำแข็งและความเย็น)',
  },

  // Group: Foam, Cream & Bubbles (ฟองนุ่ม ครีม และความซ่า)
  {
    value: 'Champagne rising fizz',
    labelThai: 'Champagne rising fizz (ฟองพรายคาร์บอเนตพุ่งเป็นสาย)',
    labelEn: 'Champagne rising fizz',
    promptPhrase: 'fine continuous spiral columns of effervescent champagne bubbles steadily rising from the base to the surface',
    group: 'Foam, Cream & Bubbles (ฟองนุ่ม ครีม และความซ่า)',
  },
  {
    value: 'Velvety crema foam',
    labelThai: 'Velvety crema foam (ฟองครีมานุ่มละมุน)',
    labelEn: 'Velvety crema foam',
    promptPhrase: 'thick velvety dense crema foam crown with micro-bubble texture and elegant golden-brown marbling',
    group: 'Foam, Cream & Bubbles (ฟองนุ่ม ครีม และความซ่า)',
  },
  {
    value: 'Whipped cream & drizzle',
    labelThai: 'Whipped cream & drizzle (วิปครีมและซอสราด)',
    labelEn: 'Whipped cream & drizzle',
    promptPhrase: 'tall artisanal swirl of dense velvety whipped cream drizzled with glistening glossy syrup ribbons',
    group: 'Foam, Cream & Bubbles (ฟองนุ่ม ครีม และความซ่า)',
  },
  {
    value: 'Salt/sugar crystalline rim',
    labelThai: 'Salt/sugar crystalline rim (เกล็ดเกลือ/น้ำตาลเคลือบขอบแก้ว)',
    labelEn: 'Salt/sugar crystalline rim',
    promptPhrase: 'crisp artisanal crust of coarse glistening sea salt or crystalline sugar coating the glass rim',
    group: 'Foam, Cream & Bubbles (ฟองนุ่ม ครีม และความซ่า)',
  },

  // Group: Light & Atmosphere (แสงและบรรยากาศ)
  {
    value: 'Backlit liquid glow',
    labelThai: 'Backlit liquid glow (แสงส่องทะลุของเหลวให้โปร่งแสงเปล่งประกาย)',
    labelEn: 'Backlit liquid glow',
    promptPhrase: 'striking backlighting penetrating the translucent liquid to produce an internal jewel-toned luminous amber glow',
    group: 'Light & Atmosphere (แสงและบรรยากาศ)',
  },
  {
    value: 'Prismatic refraction',
    labelThai: 'Prismatic refraction (แสงหักเหประกายปริซึม)',
    labelEn: 'Prismatic refraction',
    promptPhrase: 'rainbow prismatic light caustics and radiant jewel-like refractions dancing through crystalline liquid and cut glass',
    group: 'Light & Atmosphere (แสงและบรรยากาศ)',
  },
  {
    value: 'Smoky cocktail dome',
    labelThai: 'Smoky cocktail dome (ควันรมในโดมแก้ว)',
    labelEn: 'Smoky cocktail dome',
    promptPhrase: 'ethereal aromatic wood-smoke swirl suspended inside or gently unfurling from the glass vessel',
    group: 'Light & Atmosphere (แสงและบรรยากาศ)',
  },
  {
    value: 'Floating botanical garnish',
    labelThai: 'Floating botanical garnish (สมุนไพรและผลไม้ลอยตัว)',
    labelEn: 'Floating botanical garnish',
    promptPhrase: 'fresh vibrant botanicals, citrus wheels, and edible flower blossoms suspended weightlessly in crystal-clear liquid',
    group: 'Light & Atmosphere (แสงและบรรยากาศ)',
  },
  // Group: Canned soda (น้ำอัดลมกระป๋อง)
  {
    value: 'Can-pop fizz burst',
    labelThai: 'Can-pop fizz burst (ฟองพุ่งตอนเปิดกระป๋อง)',
    labelEn: 'Can-pop fizz burst',
    promptPhrase: 'a fine burst of carbonation mist and fizz erupting from the freshly opened can tab, frozen in time',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Can condensation heavy',
    labelThai: 'Can condensation heavy (หยดน้ำเกาะกระป๋องหนาแน่น)',
    labelEn: 'Can condensation heavy',
    promptPhrase: 'an aluminum soda can covered in dense, perfectly formed condensation droplets with crisp highlights, ice-cold feel',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Can frost and ice shell',
    labelThai: 'Can frost and ice shell (เกล็ดน้ำแข็งเกาะกระป๋อง)',
    labelEn: 'Can frost and ice shell',
    promptPhrase: 'an aluminum soda can encased in a delicate layer of crystalline frost and crushed ice, sub-zero chill',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Can splash in ice bed',
    labelThai: 'Can splash in ice bed (กระป๋องกระแทกลงบนน้ำแข็ง)',
    labelEn: 'Can splash in ice bed',
    promptPhrase: 'an aluminum soda can dynamically slamming into a bed of clear ice cubes, sending sharp ice chips and water droplets flying',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Crushed can energetic',
    labelThai: 'Crushed can energetic (กระป๋องบี้เท่ๆ สไตล์แอคชั่น)',
    labelEn: 'Crushed can energetic',
    promptPhrase: 'a dynamic, slightly crushed aluminum can with energetic liquid splash spraying outward',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Dual cans clink / colliding',
    labelThai: 'Dual cans clink / colliding (กระป๋องชนกันกลางอากาศ)',
    labelEn: 'Dual cans clink / colliding',
    promptPhrase: 'two cold aluminum cans clinking together mid-air, with an explosion of crisp water droplets and carbonation mist',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Pour from can into glass',
    labelThai: 'Pour from can into glass (เทจากกระป๋องลงแก้ว)',
    labelEn: 'Pour from can into glass',
    promptPhrase: 'liquid streaming smoothly from the open tab of an aluminum can into a frost-rimmed glass filled with ice',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Can water crown splash',
    labelThai: 'Can water crown splash (คลื่นน้ำกระเซ็นรอบกระป๋อง)',
    labelEn: 'Can water crown splash',
    promptPhrase: 'a dramatic crown wave of crystal-clear water and carbonated bubbles splashing around the sleek aluminum can',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
  {
    value: 'Floating condensation can',
    labelThai: 'Floating condensation can (ละอองน้ำลอยรอบกระป๋อง)',
    labelEn: 'Floating condensation can',
    promptPhrase: 'an ice-cold aluminum can surrounded by floating micro-droplets and sparkling carbonation spray frozen in high speed',
    group: 'Canned soda (น้ำอัดลมกระป๋อง)',
  },
];

export const BEVERAGE_EFFECT_GROUPS: OptionGroup[] = [
  {
    groupName: 'General (ทั่วไป)',
    options: BEVERAGE_EFFECTS.filter((e) => e.group === 'General (ทั่วไป)'),
  },
  {
    groupName: 'Canned soda (น้ำอัดลมกระป๋อง)',
    options: BEVERAGE_EFFECTS.filter((e) => e.group === 'Canned soda (น้ำอัดลมกระป๋อง)'),
  },
  {
    groupName: 'Liquid motion (ของเหลวเคลื่อนไหว)',
    options: BEVERAGE_EFFECTS.filter((e) => e.group === 'Liquid motion (ของเหลวเคลื่อนไหว)'),
  },
  {
    groupName: 'Ice & Chill (น้ำแข็งและความเย็น)',
    options: BEVERAGE_EFFECTS.filter((e) => e.group === 'Ice & Chill (น้ำแข็งและความเย็น)'),
  },
  {
    groupName: 'Foam, Cream & Bubbles (ฟองนุ่ม ครีม และความซ่า)',
    options: BEVERAGE_EFFECTS.filter((e) => e.group === 'Foam, Cream & Bubbles (ฟองนุ่ม ครีม และความซ่า)'),
  },
  {
    groupName: 'Light & Atmosphere (แสงและบรรยากาศ)',
    options: BEVERAGE_EFFECTS.filter((e) => e.group === 'Light & Atmosphere (แสงและบรรยากาศ)'),
  },
];

export const MAIN_POSITIONS: DropdownOption[] = [
  {
    value: 'Center',
    labelThai: 'Center — กึ่งกลางภาพ (สมดุล สมมาตร ทรงพลัง เป็นจุดโฟกัสเด่นชัด)',
    labelEn: 'Centered',
    promptPhrase: 'centered hero placement with balanced symmetrical weight and commanding focus',
  },
  {
    value: 'Rule of thirds left',
    labelThai: 'Rule of thirds left — กฎสามส่วนเยื้องซ้าย (สวยงามตามหลักสายตา มีพื้นที่หายใจ)',
    labelEn: 'Rule of thirds left',
    promptPhrase: 'composed along the left vertical rule-of-thirds axis with generous breathing room',
  },
  {
    value: 'Rule of thirds right',
    labelThai: 'Rule of thirds right — กฎสามส่วนเยื้องขวา (สมดุลสายตา เปิดพื้นที่ซ้าย)',
    labelEn: 'Rule of thirds right',
    promptPhrase: 'composed along the right vertical rule-of-thirds axis balancing visual weight',
  },
  {
    value: 'Low in frame with text space on top',
    labelThai: 'Low in frame with text space on top — วางต่ำในเฟรม เหลือพื้นที่ด้านบน (เหมาะสำหรับใส่พาดหัวโฆษณา)',
    labelEn: 'Low in frame with text space on top',
    promptPhrase: 'anchored low in the frame creating ample clean negative space in the upper two-thirds reserved for commercial billboard typography and headline copy',
  },
  {
    value: 'Left in frame with text space on the right',
    labelThai: 'Left in frame with text space on the right — วางซ้ายในเฟรม เหลือพื้นที่ขวา (เหมาะสำหรับวางก็อปปี้และโลโก้)',
    labelEn: 'Left in frame with text space on the right',
    promptPhrase: 'anchored on the left third of the frame leaving expansive uncluttered negative space across the right side for brand messaging and editorial typography',
  },
];

export const CROP_DISTANCES_FOOD: DropdownOption[] = [
  {
    value: 'Full plate wide',
    labelThai: 'Full plate wide — เห็นเต็มจานพร้อมขอบจานและบรรยากาศรอบๆ',
    labelEn: 'Full plate wide',
    promptPhrase: 'full wide environmental shot capturing the complete plate with generous surrounding table context',
    lensSuggestion: '50mm prime lens stopped down to f/8 for tack-sharp depth across the entire scene',
  },
  {
    value: 'Medium',
    labelThai: 'Medium — ระยะปานกลาง เห็นทั้งจานและเครื่องเคียงชัดเจน',
    labelEn: 'Medium shot',
    promptPhrase: 'medium commercial framing showcasing the plate, hero dish, and artfully placed nearby props',
    lensSuggestion: '85mm prime lens at f/4 balancing subject sharpness with subtle background separation',
  },
  {
    value: 'Tight close-up',
    labelThai: 'Tight close-up — โคลสอัพโฟกัสเฉพาะชิ้นเนื้อหลักและการจัดจาน',
    labelEn: 'Tight close-up',
    promptPhrase: 'tight close-up crop zeroing in on the focal textures, main protein, sauce ribbons, and glossy contours',
    lensSuggestion: '100mm f/2.8 macro lens with creamy shallow depth of field throwing the background into soft blur',
  },
  {
    value: 'Extreme macro',
    labelThai: 'Extreme macro — มาโครระยะประชิด เห็นผิวสัมผัส ละอองซอส เกล็ดเกลือ',
    labelEn: 'Extreme macro',
    promptPhrase: 'extreme macro composition inspecting microscopic surface textures, moisture droplets, caramelized sear, and seasoning grains',
    lensSuggestion: '100mm f/2.8 macro lens with razor-thin depth of field and velvety bokeh',
  },
  {
    value: 'Cropped bleed off-frame',
    labelThai: 'Cropped bleed off-frame — ตัดขอบจานล้นเฟรม ไดนามิกแบบนิตยสารอาหารระดับโลก',
    labelEn: 'Cropped bleed off-frame',
    promptPhrase: 'editorial crop where the plate artfully bleeds off-frame on one side, creating an immersive intimate dining perspective',
    lensSuggestion: '85mm prime lens at f/2.8',
  },
];

export const CROP_DISTANCES_BEVERAGE: DropdownOption[] = [
  {
    value: 'Full glass wide',
    labelThai: 'Full glass wide — เห็นทั้งแก้ว/ขวด ตั้งแต่ก้นแก้วถึงด้านบนพร้อมบรรยากาศ',
    labelEn: 'Full glass wide',
    promptPhrase: 'full wide environmental shot capturing the complete glassware or bottle from base to rim with surrounding bar context',
    lensSuggestion: '50mm prime lens stopped down to f/8 for tack-sharp depth across the entire scene',
  },
  {
    value: 'Medium',
    labelThai: 'Medium — ระยะปานกลาง เห็นแก้วและวัตถุดิบประดับรอบข้างชัดเจน',
    labelEn: 'Medium shot',
    promptPhrase: 'medium commercial framing showcasing the glass, beverage layers, and artfully placed nearby garnish props',
    lensSuggestion: '85mm prime lens at f/4 balancing subject sharpness with subtle background separation',
  },
  {
    value: 'Tight close-up',
    labelThai: 'Tight close-up — โคลสอัพโฟกัสของเหลว ละอองน้ำเกาะแก้ว และการ์นิช',
    labelEn: 'Tight close-up',
    promptPhrase: 'tight close-up crop zeroing in on the liquid translucency, condensation droplets on the glass, and fresh rim garnish',
    lensSuggestion: '100mm f/2.8 macro lens with creamy shallow depth of field throwing the background into soft blur',
  },
  {
    value: 'Extreme macro',
    labelThai: 'Extreme macro — มาโครระยะประชิด เห็นเกล็ดน้ำแข็ง ฟองโซดา หรือผิวมะนาว',
    labelEn: 'Extreme macro',
    promptPhrase: 'extreme macro composition inspecting microscopic fizz bubbles, ice facet refractions, and citrus zest oil glands',
    lensSuggestion: '100mm f/2.8 macro lens with razor-thin depth of field and velvety bokeh',
  },
  {
    value: 'Cropped bleed off-frame',
    labelThai: 'Cropped bleed off-frame — ขอบแก้วล้นเฟรม ให้ความรู้สึกใกล้ชิดสดชื่น',
    labelEn: 'Cropped bleed off-frame',
    promptPhrase: 'editorial crop where the glass edge artfully bleeds off-frame on one side, creating an immersive sensory perspective',
    lensSuggestion: '85mm prime lens at f/2.8',
  },
];

export const BACKGROUND_DETAILS: DropdownOption[] = [
  {
    value: 'Blurred bokeh',
    labelThai: 'Blurred bokeh — ฉากหลังละลายแสงโบเก้หรูหรา (เน้นวัตถุหลักให้ลอยเด่น)',
    labelEn: 'Blurred bokeh',
    promptPhrase: 'dreamy creamy bokeh background with softly blurred ambient warm light circles',
  },
  {
    value: 'Dark textured stone',
    labelThai: 'Dark textured stone — แผ่นหินชนวนสีเข้มผิวดิบ (ขับสีสันอาหารให้สดชัด หรูหรา)',
    labelEn: 'Dark textured stone',
    promptPhrase: 'tactile dark textured slate stone tabletop adding mineral depth and high-contrast elegance',
  },
  {
    value: 'Rustic wood table',
    labelThai: 'Rustic wood table — โต๊ะไม้โอ๊คธรรมชาติสไตล์คราฟต์ (อบอุ่น คลาสสิก)',
    labelEn: 'Rustic wood table',
    promptPhrase: 'reclaimed weathered dark oak wood surface with authentic organic timber grain',
  },
  {
    value: 'Clean seamless studio backdrop',
    labelThai: 'Clean seamless studio backdrop — ฉากสตูดิโอไร้รอยต่อ คลีนสไตล์มินิมอล',
    labelEn: 'Clean seamless studio backdrop',
    promptPhrase:
      "high-quality commercial food product photograph with the food's details preserved exactly as in the reference, placed on a seamless, pure white studio background, isolated with no other objects or surfaces in the scene, with no props, no ingredients and no scattered items around the main plate, lit with soft, even, diffuse lighting that minimizes harsh shadows and keeps the background perfectly clean",
  },
  {
    value: 'Marble surface',
    labelThai: 'Marble surface — แผ่นหินอ่อนอิตาลีลวดลายประณีต (ลักชัวรี ระดับไฮเอนด์)',
    labelEn: 'Marble surface',
    promptPhrase: 'luxurious Italian Carrara marble countertop with delicate subtle charcoal veining',
  },
  {
    value: 'Restaurant ambience blur',
    labelThai: 'Restaurant ambience blur — บรรยากาศร้านอาหารไฟน์ไดนิ่งเบลอนุ่มนวล',
    labelEn: 'Restaurant ambience blur',
    promptPhrase: 'softly defocused Michelin-starred restaurant background with subtle warm pendant lamps and clinking glassware ambience',
  },
  {
    value: 'Gradient color backdrop',
    labelThai: 'Gradient color backdrop — ฉากไล่ระดับสีตามโทนสีคู่ตรงข้ามของเมนู',
    labelEn: 'Gradient color backdrop',
    promptPhrase: 'subtle monochromatic gradient backdrop tailored in tonal harmony with the subject\'s hero color palette',
  },
  {
    value: 'Scattered ingredient props',
    labelThai: 'Scattered ingredient props — วัตถุดิบสดและสมุนไพรวางกระจัดกระจายอย่างมีศิลปะ',
    labelEn: 'Scattered ingredient props',
    promptPhrase: 'meticulously styled scatter of raw pristine hero ingredients, whole spices, and micro herbs subtly framing the main vessel',
  },
  {
    value: 'Polished concrete surface',
    labelThai: 'Polished concrete surface — พื้นปูนเปลือยขัดมันโมเดิร์นลอฟท์ (มินิมอล ร่วมสมัย เท่สะอาดตา)',
    labelEn: 'Polished concrete surface',
    promptPhrase: 'sleek polished concrete tabletop with subtle mottled industrial texture, neutral grey mineral tones, and modern minimalist sophistication',
  },
];

export const ASPECT_RATIOS: Array<{ value: AspectRatio; labelThai: string; labelEn: string; desc: string }> = [
  { value: '1:1', labelThai: '1:1', labelEn: '1:1 Square', desc: 'จัตุรัส (Instagram Post / Web)' },
  { value: '4:5', labelThai: '4:5', labelEn: '4:5 Portrait', desc: 'แนวตั้งยอดนิยม (Instagram Feed)' },
  { value: '3:4', labelThai: '3:4', labelEn: '3:4 Poster', desc: 'แนวตั้งมาตรฐานโปสเตอร์' },
  { value: '9:16', labelThai: '9:16', labelEn: '9:16 Story/Reels', desc: 'แนวตั้งเต็มจอ (Story / Reels / TikTok)' },
  { value: '16:9', labelThai: '16:9', labelEn: '16:9 Banner', desc: 'แนวนอน (Hero Banner / Billboard)' },
];

export function getOptionPhrase(
  options: DropdownOption[],
  value: string,
  subjectType?: SubjectType
): string {
  const match = options.find((opt) => opt.value === value);
  if (!match) return value;
  if (value === 'Clean seamless studio backdrop' && subjectType === 'beverage') {
    return "commercial beverage product photograph with the beverage's details preserved exactly as in the reference, placed on a seamless, pure white studio background, isolated with no other objects or surfaces in the scene, with no props, no ingredients and no scattered items around the main glass or can, lit with soft, even, diffuse lighting that minimizes harsh shadows and keeps the background perfectly clean";
  }
  return match.promptPhrase;
}

export function getCropLens(options: DropdownOption[], value: string): { phrase: string; lens: string } {
  const match = options.find((opt) => opt.value === value);
  return {
    phrase: match ? match.promptPhrase : value,
    lens: match?.lensSuggestion || '85mm f/2.8 prime lens with shallow depth of field',
  };
}
