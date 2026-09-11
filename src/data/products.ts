export interface Product {
  id: string;
  brand: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collection: string;
  gender: 'men' | 'women' | 'unisex';
  movement: string;
  caseMaterial: string;
  caseSize: string;
  dialColor: string;
  strapMaterial: string;
  waterResistance: string;
  powerReserve: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  badges: string[];
  features: string[];
  specifications: Record<string, string>;
}

const generateImage = (seed: string, w = 800, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const products: Product[] = [
  {
    id: '1', brand: 'AURELIS', name: 'Sovereign Chronograph', slug: 'sovereign-chronograph',
    description: 'A masterpiece of precision engineering, the Sovereign Chronograph embodies the pinnacle of horological excellence. Its 42mm case houses a self-winding mechanical movement with 72-hour power reserve, while the sapphire crystal reveals the intricate dance of 312 components.',
    price: 12500, compareAtPrice: 14500, category: 'Chronograph', collection: 'Signature',
    gender: 'men', movement: 'Automatic', caseMaterial: '18K Rose Gold', caseSize: '42mm',
    dialColor: 'Midnight Blue', strapMaterial: 'Alligator Leather', waterResistance: '100m',
    powerReserve: '72 hours',
    images: [generateImage('watch1a'), generateImage('watch1b'), generateImage('watch1c'), generateImage('watch1d')],
    rating: 4.9, reviewCount: 127, stock: 8, sku: 'AUR-SC-001',
    badges: ['bestseller', 'limited'],
    features: ['Self-winding movement', 'Sapphire crystal', 'Exhibition caseback', 'Super-LumiNova indices'],
    specifications: { 'Case Diameter': '42mm', 'Case Thickness': '14.2mm', 'Lug Width': '22mm', 'Movement': 'Calibre AU.01', 'Jewels': '31', 'Frequency': '28,800 vph', 'Crystal': 'Sapphire with AR coating', 'Clasp': 'Deployant buckle' }
  },
  {
    id: '2', brand: 'AURELIS', name: 'Celestial Tourbillon', slug: 'celestial-tourbillon',
    description: 'The Celestial Tourbillon represents the zenith of watchmaking artistry. A flying tourbillon at 6 o\'clock rotates once per minute, while the skeletonized dial reveals the mesmerizing mechanics within.',
    price: 45000, category: 'Skeleton', collection: 'Heritage',
    gender: 'men', movement: 'Manual', caseMaterial: 'Platinum 950', caseSize: '40mm',
    dialColor: 'Skeleton', strapMaterial: 'Hand-stitched Crocodile', waterResistance: '30m',
    powerReserve: '96 hours',
    images: [generateImage('watch2a'), generateImage('watch2b'), generateImage('watch2c')],
    rating: 5.0, reviewCount: 23, stock: 3, sku: 'AUR-CT-002',
    badges: ['limited', 'exclusive'],
    features: ['Flying tourbillon', 'Hand-engraved movement', 'Platinum case', 'Limited to 50 pieces'],
    specifications: { 'Case Diameter': '40mm', 'Case Thickness': '11.8mm', 'Movement': 'Calibre AU.TB01', 'Jewels': '25', 'Crystal': 'Box sapphire', 'Dial': 'Open-worked', 'Strap': 'Hand-stitched alligator' }
  },
  {
    id: '3', brand: 'AURELIS', name: 'Meridian GMT', slug: 'meridian-gmt',
    description: 'Designed for the modern traveler, the Meridian GMT tracks two time zones simultaneously with its distinctive rotating bezel and independently adjustable hour hand.',
    price: 8900, category: 'GMT', collection: 'Essentials',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Stainless Steel', caseSize: '40mm',
    dialColor: 'Black', strapMaterial: 'Stainless Steel Bracelet', waterResistance: '200m',
    powerReserve: '65 hours',
    images: [generateImage('watch3a'), generateImage('watch3b'), generateImage('watch3c')],
    rating: 4.8, reviewCount: 89, stock: 15, sku: 'AUR-MG-003',
    badges: ['new'],
    features: ['Dual time zone', 'Ceramic bezel insert', 'Quick-set date', 'Glucidur balance'],
    specifications: { 'Case Diameter': '40mm', 'Case Thickness': '12.5mm', 'Movement': 'Calibre AU.GMT', 'Jewels': '28', 'Crystal': 'Domed sapphire', 'Bezel': 'Bidirectional ceramic', 'Bracelet': 'H-link, micro-adjust' }
  },
  {
    id: '4', brand: 'AURELIS', name: 'Étoile Diamond', slug: 'etoile-diamond',
    description: 'An exquisite expression of feminine elegance, the Étoile features 62 brilliant-cut diamonds adorning its mother-of-pearl dial, set within a refined 36mm white gold case.',
    price: 18500, category: 'Dress', collection: 'Signature',
    gender: 'women', movement: 'Automatic', caseMaterial: '18K White Gold', caseSize: '36mm',
    dialColor: 'Mother of Pearl', strapMaterial: 'Satin', waterResistance: '50m',
    powerReserve: '48 hours',
    images: [generateImage('watch4a'), generateImage('watch4b'), generateImage('watch4c')],
    rating: 4.9, reviewCount: 56, stock: 6, sku: 'AUR-ED-004',
    badges: ['bestseller'],
    features: ['62 brilliant-cut diamonds', 'Mother-of-pearl dial', 'White gold case', 'Swiss automatic movement'],
    specifications: { 'Case Diameter': '36mm', 'Case Thickness': '9.2mm', 'Movement': 'Calibre AU.F01', 'Diamonds': '62 (0.85ct)', 'Crystal': 'Sapphire', 'Dial': 'Tahitian mother-of-pearl' }
  },
  {
    id: '5', brand: 'AURELIS', name: 'Abyssal Diver 600', slug: 'abyssal-diver-600',
    description: 'Engineered for the depths, the Abyssal Diver 600 withstands pressures at 600 meters below sea level. Its helium escape valve and triple-sealed crown ensure absolute water resistance.',
    price: 7200, category: 'Diver', collection: 'Sport',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Titanium Grade 5', caseSize: '44mm',
    dialColor: 'Deep Blue', strapMaterial: 'Rubber', waterResistance: '600m',
    powerReserve: '70 hours',
    images: [generateImage('watch5a'), generateImage('watch5b'), generateImage('watch5c')],
    rating: 4.7, reviewCount: 143, stock: 22, sku: 'AUR-AD-005',
    badges: ['new'],
    features: ['Helium escape valve', 'Triple sealed crown', 'Unidirectional bezel', 'Titanium case'],
    specifications: { 'Case Diameter': '44mm', 'Case Thickness': '15.1mm', 'Movement': 'Calibre AU.DV01', 'Bezel': 'Unidirectional ceramic', 'Crystal': 'Sapphire 4.5mm', 'Crown': 'Triple-sealed screw-down' }
  },
  {
    id: '6', brand: 'AURELIS', name: 'Patrimoine Ultra-Thin', slug: 'patrimoine-ultra-thin',
    description: 'At merely 6.8mm thick, the Patrimoine Ultra-Thin is a study in refined restraint. Its eggshell dial and dauphine hands speak to a tradition of understated luxury.',
    price: 15800, category: 'Dress', collection: 'Heritage',
    gender: 'unisex', movement: 'Automatic', caseMaterial: '18K Yellow Gold', caseSize: '38mm',
    dialColor: 'Ivory', strapMaterial: 'Alligator Leather', waterResistance: '30m',
    powerReserve: '55 hours',
    images: [generateImage('watch6a'), generateImage('watch6b'), generateImage('watch6c')],
    rating: 4.9, reviewCount: 78, stock: 10, sku: 'AUR-PU-006',
    badges: ['bestseller'],
    features: ['Ultra-thin 6.8mm', 'Dauphine hands', 'Guilloché dial', 'Gold case'],
    specifications: { 'Case Diameter': '38mm', 'Case Thickness': '6.8mm', 'Movement': 'Calibre AU.UT01', 'Jewels': '27', 'Dial': 'Hand-guilloché', 'Hands': 'Dauphine, gold' }
  },
  {
    id: '7', brand: 'AURELIS', name: 'Vanguard Racer', slug: 'vanguard-racer',
    description: 'Inspired by motorsport heritage, the Vanguard Racer features a tachymeter bezel and three registers that capture the spirit of competition on the wrist.',
    price: 9400, compareAtPrice: 11000, category: 'Chronograph', collection: 'Sport',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Carbon Composite', caseSize: '43mm',
    dialColor: 'Racing Green', strapMaterial: 'Perforated Calfskin', waterResistance: '100m',
    powerReserve: '60 hours',
    images: [generateImage('watch7a'), generateImage('watch7b'), generateImage('watch7c')],
    rating: 4.6, reviewCount: 92, stock: 14, sku: 'AUR-VR-007',
    badges: ['sale'],
    features: ['Tachymeter scale', 'Column-wheel chronograph', 'Carbon case', 'Racing-inspired design'],
    specifications: { 'Case Diameter': '43mm', 'Case Thickness': '14.8mm', 'Movement': 'Calibre AU.CR02', 'Functions': 'Hours, minutes, chronograph', 'Case': 'Forged carbon composite', 'Strap': 'Perforated calfskin' }
  },
  {
    id: '8', brand: 'AURELIS', name: 'Lumière Moonphase', slug: 'lumiere-moonphase',
    description: 'The Lumière Moonphase captures the poetry of celestial mechanics. Its astronomical moonphase indicator requires correction only once every 122 years.',
    price: 22000, category: 'Complication', collection: 'Heritage',
    gender: 'women', movement: 'Automatic', caseMaterial: '18K Rose Gold', caseSize: '37mm',
    dialColor: 'Aventurine', strapMaterial: 'Rose Gold Bracelet', waterResistance: '50m',
    powerReserve: '65 hours',
    images: [generateImage('watch8a'), generateImage('watch8b'), generateImage('watch8c')],
    rating: 4.8, reviewCount: 41, stock: 5, sku: 'AUR-LM-008',
    badges: ['limited'],
    features: ['Astronomical moonphase', 'Aventurine dial', 'Rose gold bracelet', '122-year accuracy'],
    specifications: { 'Case Diameter': '37mm', 'Case Thickness': '10.4mm', 'Movement': 'Calibre AU.MP01', 'Moonphase': 'Astronomical', 'Dial': 'Blue aventurine', 'Bracelet': '18K rose gold' }
  },
  {
    id: '9', brand: 'AURELIS', name: 'Apex Field Watch', slug: 'apex-field-watch',
    description: 'Built for adventure, the Apex Field Watch combines military-inspired design with modern materials. Its antimagnetic movement and shock-resistant construction ensure reliability in any environment.',
    price: 4200, category: 'Field', collection: 'Essentials',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Stainless Steel', caseSize: '39mm',
    dialColor: 'Olive Green', strapMaterial: 'NATO Canvas', waterResistance: '200m',
    powerReserve: '48 hours',
    images: [generateImage('watch9a'), generateImage('watch9b'), generateImage('watch9c')],
    rating: 4.7, reviewCount: 201, stock: 35, sku: 'AUR-AF-009',
    badges: ['bestseller'],
    features: ['Antimagnetic', 'Shock resistant', 'Super-LumiNova', 'Screw-down crown'],
    specifications: { 'Case Diameter': '39mm', 'Case Thickness': '12.0mm', 'Movement': 'Calibre AU.FW01', 'Crystal': 'Sapphire with AR', 'Lume': 'Super-LumiNova BGW9', 'Strap': 'NATO canvas' }
  },
  {
    id: '10', brand: 'AURELIS', name: 'Opus Perpetual Calendar', slug: 'opus-perpetual-calendar',
    description: 'The Opus Perpetual Calendar is a grand complication that accounts for months of varying lengths and leap years, requiring no correction until the year 2100.',
    price: 68000, category: 'Complication', collection: 'Heritage',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Platinum 950', caseSize: '41mm',
    dialColor: 'Silver', strapMaterial: 'Alligator Leather', waterResistance: '30m',
    powerReserve: '72 hours',
    images: [generateImage('watch10a'), generateImage('watch10b'), generateImage('watch10c')],
    rating: 5.0, reviewCount: 12, stock: 2, sku: 'AUR-OP-010',
    badges: ['exclusive', 'limited'],
    features: ['Perpetual calendar', 'Leap year indicator', 'Platinum case', 'Hand-finished movement'],
    specifications: { 'Case Diameter': '41mm', 'Case Thickness': '12.2mm', 'Movement': 'Calibre AU.PC01', 'Components': '456', 'Jewels': '39', 'Calendar': 'Perpetual to 2100' }
  },
  {
    id: '11', brand: 'AURELIS', name: 'Noir Skeleton', slug: 'noir-skeleton',
    description: 'A dramatic expression of mechanical artistry, the Noir Skeleton reveals its hand-decorated movement through both dial and caseback, finished entirely in black DLC.',
    price: 16500, category: 'Skeleton', collection: 'Signature',
    gender: 'unisex', movement: 'Manual', caseMaterial: 'Stainless Steel DLC', caseSize: '41mm',
    dialColor: 'Skeleton', strapMaterial: 'Black Rubber', waterResistance: '50m',
    powerReserve: '80 hours',
    images: [generateImage('watch11a'), generateImage('watch11b'), generateImage('watch11c')],
    rating: 4.8, reviewCount: 67, stock: 9, sku: 'AUR-NS-011',
    badges: ['new'],
    features: ['Full skeletonization', 'Black DLC coating', 'Hand-beveled bridges', '80-hour reserve'],
    specifications: { 'Case Diameter': '41mm', 'Case Thickness': '10.8mm', 'Movement': 'Calibre AU.SK01', 'Finishing': 'Black PVD/DLC', 'Crystal': 'Sapphire front and back', 'Strap': 'Vulcanized rubber' }
  },
  {
    id: '12', brand: 'AURELIS', name: 'Riviera Yacht Timer', slug: 'riviera-yacht-timer',
    description: 'Born from the spirit of competitive sailing, the Riviera Yacht Timer features a regatta countdown and nautical-inspired design elements.',
    price: 8200, category: 'Sport', collection: 'Sport',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Stainless Steel', caseSize: '42mm',
    dialColor: 'White', strapMaterial: 'Rubber', waterResistance: '300m',
    powerReserve: '55 hours',
    images: [generateImage('watch12a'), generateImage('watch12b'), generateImage('watch12c')],
    rating: 4.6, reviewCount: 54, stock: 18, sku: 'AUR-RY-012',
    badges: [],
    features: ['Regatta countdown', 'Nautical bezel', 'Screw-down crown', 'Luminous markers'],
    specifications: { 'Case Diameter': '42mm', 'Case Thickness': '13.5mm', 'Movement': 'Calibre AU.YT01', 'Functions': 'Regatta timer, chronograph', 'Bezel': 'Unidirectional', 'Water Resistance': '300m' }
  },
  {
    id: '13', brand: 'AURELIS', name: 'Classique Petite', slug: 'classique-petite',
    description: 'The Classique Petite embodies timeless femininity with its delicate proportions, Roman numeral indices, and blued steel Breguet hands.',
    price: 6800, category: 'Dress', collection: 'Essentials',
    gender: 'women', movement: 'Quartz', caseMaterial: 'Stainless Steel', caseSize: '32mm',
    dialColor: 'White', strapMaterial: 'Stainless Steel Bracelet', waterResistance: '50m',
    powerReserve: 'N/A',
    images: [generateImage('watch13a'), generateImage('watch13b'), generateImage('watch13c')],
    rating: 4.7, reviewCount: 118, stock: 25, sku: 'AUR-CP-013',
    badges: ['bestseller'],
    features: ['Roman numerals', 'Breguet hands', 'Swiss quartz', 'Jubilee bracelet'],
    specifications: { 'Case Diameter': '32mm', 'Case Thickness': '7.2mm', 'Movement': 'Swiss quartz', 'Dial': 'Grand feu enamel', 'Hands': 'Blued steel Breguet', 'Bracelet': 'Jubilee-style' }
  },
  {
    id: '14', brand: 'AURELIS', name: 'Terra Explorer', slug: 'terra-explorer',
    description: 'Designed for extreme environments, the Terra Explorer features a compass bezel, barometric pressure sensor, and -40°C operation capability.',
    price: 5600, category: 'Field', collection: 'Sport',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Titanium', caseSize: '43mm',
    dialColor: 'Anthracite', strapMaterial: 'Canvas/Leather', waterResistance: '300m',
    powerReserve: '70 hours',
    images: [generateImage('watch14a'), generateImage('watch14b'), generateImage('watch14c')],
    rating: 4.8, reviewCount: 87, stock: 20, sku: 'AUR-TE-014',
    badges: ['new'],
    features: ['Compass bezel', 'Titanium construction', 'Extreme temperature rated', 'Anti-reflective crystal'],
    specifications: { 'Case Diameter': '43mm', 'Case Thickness': '14.0mm', 'Movement': 'Calibre AU.EX01', 'Case': 'Grade 2 Titanium', 'Crystal': 'Double AR sapphire', 'Temperature Range': '-40°C to +60°C' }
  },
  {
    id: '15', brand: 'AURELIS', name: 'Aurora Annual Calendar', slug: 'aurora-annual-calendar',
    description: 'The Aurora Annual Calendar elegantly displays day, date, and month through three apertures, requiring adjustment only once per year.',
    price: 11200, category: 'Complication', collection: 'Signature',
    gender: 'men', movement: 'Automatic', caseMaterial: '18K Rose Gold', caseSize: '40mm',
    dialColor: 'Salmon', strapMaterial: 'Alligator Leather', waterResistance: '50m',
    powerReserve: '60 hours',
    images: [generateImage('watch15a'), generateImage('watch15b'), generateImage('watch15c')],
    rating: 4.9, reviewCount: 45, stock: 7, sku: 'AUR-AC-015',
    badges: [],
    features: ['Annual calendar', 'Salmon dial', 'Rose gold case', 'Triple aperture display'],
    specifications: { 'Case Diameter': '40mm', 'Case Thickness': '11.5mm', 'Movement': 'Calibre AU.AC01', 'Calendar': 'Annual (day, date, month)', 'Dial': 'Salmon, sunburst', 'Case': '18K 5N rose gold' }
  },
  {
    id: '16', brand: 'AURELIS', name: 'Zenith Minute Repeater', slug: 'zenith-minute-repeater',
    description: 'The pinnacle of acoustic horology, the Zenith Minute Repeater chimes the hours, quarters, and minutes on demand through cathedral gongs.',
    price: 125000, category: 'Complication', collection: 'Heritage',
    gender: 'men', movement: 'Manual', caseMaterial: 'Platinum 950', caseSize: '42mm',
    dialColor: 'Grand Feu Enamel', strapMaterial: 'Alligator Leather', waterResistance: '30m',
    powerReserve: '48 hours',
    images: [generateImage('watch16a'), generateImage('watch16b'), generateImage('watch16c')],
    rating: 5.0, reviewCount: 5, stock: 1, sku: 'AUR-ZM-016',
    badges: ['exclusive', 'limited'],
    features: ['Minute repeater', 'Cathedral gongs', 'Grand feu enamel dial', 'Platinum case'],
    specifications: { 'Case Diameter': '42mm', 'Case Thickness': '12.8mm', 'Movement': 'Calibre AU.MR01', 'Components': '572', 'Gongs': 'Cathedral', 'Dial': 'Grand feu enamel' }
  },
  {
    id: '17', brand: 'AURELIS', name: 'Veloce Carbon', slug: 'veloce-carbon',
    description: 'Forged from aerospace-grade carbon, the Veloce Carbon is a feat of material science and design. Each case has a unique pattern due to the forging process.',
    price: 9800, category: 'Sport', collection: 'Essentials',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Forged Carbon', caseSize: '44mm',
    dialColor: 'Black', strapMaterial: 'Alcantara', waterResistance: '100m',
    powerReserve: '55 hours',
    images: [generateImage('watch17a'), generateImage('watch17b'), generateImage('watch17c')],
    rating: 4.7, reviewCount: 73, stock: 12, sku: 'AUR-VC-017',
    badges: ['new'],
    features: ['Forged carbon case', 'Unique pattern per piece', 'Alcantara strap', 'Lightweight 58g'],
    specifications: { 'Case Diameter': '44mm', 'Case Thickness': '13.2mm', 'Weight': '58g', 'Movement': 'Calibre AU.FC01', 'Case': 'Forged carbon composite', 'Strap': 'Alcantara with deployant' }
  },
  {
    id: '18', brand: 'AURELIS', name: 'Sérénité', slug: 'serenite',
    description: 'A vision of serene beauty, the Sérénité features a hand-painted enamel dial depicting a celestial scene, encased in rose gold with diamond-set bezel.',
    price: 32000, category: 'Dress', collection: 'Heritage',
    gender: 'women', movement: 'Automatic', caseMaterial: '18K Rose Gold', caseSize: '35mm',
    dialColor: 'Hand-painted Enamel', strapMaterial: 'Satin', waterResistance: '30m',
    powerReserve: '50 hours',
    images: [generateImage('watch18a'), generateImage('watch18b'), generateImage('watch18c')],
    rating: 4.9, reviewCount: 28, stock: 4, sku: 'AUR-SR-018',
    badges: ['limited'],
    features: ['Hand-painted enamel', 'Diamond bezel (48 stones)', 'Rose gold case', 'Exhibition caseback'],
    specifications: { 'Case Diameter': '35mm', 'Case Thickness': '9.8mm', 'Diamonds': '48 (1.2ct)', 'Dial': 'Hand-painted miniature enamel', 'Movement': 'Calibre AU.F02', 'Limited': '100 pieces' }
  },
  {
    id: '19', brand: 'AURELIS', name: 'Pioneer World Time', slug: 'pioneer-world-time',
    description: 'The Pioneer World Time displays all 24 time zones simultaneously through its rotating city disc, perfect for the global citizen.',
    price: 13500, category: 'GMT', collection: 'Signature',
    gender: 'unisex', movement: 'Automatic', caseMaterial: 'Stainless Steel', caseSize: '41mm',
    dialColor: 'Gradient Blue', strapMaterial: 'Stainless Steel Bracelet', waterResistance: '100m',
    powerReserve: '65 hours',
    images: [generateImage('watch19a'), generateImage('watch19b'), generateImage('watch19c')],
    rating: 4.8, reviewCount: 62, stock: 11, sku: 'AUR-PW-019',
    badges: [],
    features: ['24 time zones', 'City disc', 'Day/night indicator', 'Gradient dial'],
    specifications: { 'Case Diameter': '41mm', 'Case Thickness': '12.0mm', 'Movement': 'Calibre AU.WT01', 'Zones': '24 cities', 'Dial': 'Blue gradient, lacquered', 'Bracelet': 'Integrated steel' }
  },
  {
    id: '20', brand: 'AURELIS', name: 'Heritage 1987', slug: 'heritage-1987',
    description: 'A faithful recreation of our founding timepiece, the Heritage 1987 captures the essence of our origins with modern reliability. Limited to 1987 pieces.',
    price: 19500, category: 'Dress', collection: 'Heritage',
    gender: 'unisex', movement: 'Manual', caseMaterial: '18K Yellow Gold', caseSize: '37mm',
    dialColor: 'Cream', strapMaterial: 'Cordovan Leather', waterResistance: '30m',
    powerReserve: '65 hours',
    images: [generateImage('watch20a'), generateImage('watch20b'), generateImage('watch20c')],
    rating: 4.9, reviewCount: 34, stock: 6, sku: 'AUR-H87-020',
    badges: ['limited', 'exclusive'],
    features: ['Faithful 1987 design', 'Manual winding', 'Yellow gold case', 'Limited to 1987 pieces'],
    specifications: { 'Case Diameter': '37mm', 'Case Thickness': '9.0mm', 'Movement': 'Calibre AU.H87', 'Case': '18K yellow gold', 'Dial': 'Cream, sector design', 'Limited': '1987 pieces worldwide' }
  },
  {
    id: '21', brand: 'AURELIS', name: 'Nautique Sport', slug: 'nautique-sport',
    description: 'The Nautique Sport combines robust construction with refined aesthetics. Its integrated bracelet and cushion case create a distinctive silhouette.',
    price: 7800, category: 'Sport', collection: 'Essentials',
    gender: 'men', movement: 'Automatic', caseMaterial: 'Stainless Steel', caseSize: '41mm',
    dialColor: 'Teal Blue', strapMaterial: 'Integrated Steel Bracelet', waterResistance: '120m',
    powerReserve: '60 hours',
    images: [generateImage('watch21a'), generateImage('watch21b'), generateImage('watch21c')],
    rating: 4.7, reviewCount: 156, stock: 28, sku: 'AUR-NT-021',
    badges: ['bestseller'],
    features: ['Integrated bracelet', 'Cushion case', 'Teal dial', 'Quick-release system'],
    specifications: { 'Case Diameter': '41mm', 'Case Thickness': '10.5mm', 'Movement': 'Calibre AU.NT01', 'Case Shape': 'Cushion', 'Dial': 'Teal blue, horizontal texture', 'Bracelet': 'Integrated, polished/brushed' }
  },
  {
    id: '22', brand: 'AURELIS', name: 'Solstice Retrograde', slug: 'solstice-retrograde',
    description: 'Featuring a stunning retrograde date display that sweeps across the upper dial, the Solstice combines artistic complication with everyday wearability.',
    price: 14200, category: 'Complication', collection: 'Signature',
    gender: 'men', movement: 'Automatic', caseMaterial: '18K White Gold', caseSize: '40mm',
    dialColor: 'Meteorite', strapMaterial: 'Alligator Leather', waterResistance: '50m',
    powerReserve: '55 hours',
    images: [generateImage('watch22a'), generateImage('watch22b'), generateImage('watch22c')],
    rating: 4.8, reviewCount: 39, stock: 8, sku: 'AUR-SR-022',
    badges: ['new'],
    features: ['Retrograde date', 'Meteorite dial', 'White gold case', 'Power reserve indicator'],
    specifications: { 'Case Diameter': '40mm', 'Case Thickness': '11.2mm', 'Movement': 'Calibre AU.RG01', 'Dial': 'Gibeon meteorite', 'Complications': 'Retrograde date, power reserve', 'Case': '18K white gold' }
  }
];

export const collections = [
  { id: 'signature', name: 'Signature Collection', slug: 'signature', description: 'The definitive expression of AURELIS craftsmanship', image: generateImage('collection1', 1200, 800) },
  { id: 'heritage', name: 'Heritage Collection', slug: 'heritage', description: 'A tribute to our storied past and timeless traditions', image: generateImage('collection2', 1200, 800) },
  { id: 'essentials', name: 'The Essentials', slug: 'essentials', description: 'Everyday luxury for the discerning collector', image: generateImage('collection3', 1200, 800) },
  { id: 'sport', name: 'Sport Collection', slug: 'sport', description: 'Performance meets precision in every detail', image: generateImage('collection4', 1200, 800) },
];

export const reviews = [
  { id: '1', productId: '1', author: 'James W.', rating: 5, date: '2024-11-15', title: 'Absolutely stunning timepiece', content: 'The Sovereign Chronograph exceeded all my expectations. The finishing is impeccable and the movement is remarkably smooth. Worth every penny.', verified: true, helpful: 24 },
  { id: '2', productId: '1', author: 'Michael R.', rating: 5, date: '2024-10-28', title: 'A work of art', content: 'I have been collecting watches for 20 years and this is among the finest I have owned. The attention to detail is extraordinary.', verified: true, helpful: 18 },
  { id: '3', productId: '1', author: 'Sarah K.', rating: 4, date: '2024-10-12', title: 'Beautiful but runs slightly fast', content: 'Gorgeous watch with exceptional craftsmanship. Only giving 4 stars because it runs about 3 seconds fast per day. Otherwise perfect.', verified: true, helpful: 7 },
  { id: '4', productId: '3', author: 'David L.', rating: 5, date: '2024-11-20', title: 'Perfect travel companion', content: 'The GMT function is incredibly intuitive. I travel frequently between London and Tokyo and this watch makes tracking both times effortless.', verified: true, helpful: 31 },
  { id: '5', productId: '5', author: 'Thomas B.', rating: 5, date: '2024-09-05', title: 'Built like a tank', content: 'Took this diving in the Maldives. Flawless performance at depth. The titanium case is remarkably light yet feels indestructible.', verified: true, helpful: 15 },
];

export const blogPosts = [
  { id: '1', title: 'The Art of the Tourbillon', category: 'Watchmaking', excerpt: 'Exploring the mesmerizing world of the flying tourbillon and its place in modern haute horlogerie.', date: '2024-11-20', readTime: '8 min', image: generateImage('blog1', 800, 600) },
  { id: '2', title: 'Dressing for the Boardroom', category: 'Style', excerpt: 'How to select the perfect timepiece to complement your professional wardrobe.', date: '2024-11-15', readTime: '5 min', image: generateImage('blog2', 800, 600) },
  { id: '3', title: 'Our Swiss Atelier', category: 'Heritage', excerpt: 'A behind-the-scenes look at where AURELIS timepieces are born and crafted.', date: '2024-11-10', readTime: '12 min', image: generateImage('blog3', 800, 600) },
  { id: '4', title: 'Caring for Your Timepiece', category: 'Guides', excerpt: 'Essential maintenance tips to ensure your watch performs flawlessly for generations.', date: '2024-11-05', readTime: '6 min', image: generateImage('blog4', 800, 600) },
  { id: '5', title: 'The Renaissance of Mechanical Watches', category: 'Stories', excerpt: 'Why mechanical watches are experiencing an unprecedented revival among younger collectors.', date: '2024-10-28', readTime: '10 min', image: generateImage('blog5', 800, 600) },
  { id: '6', title: 'Interview: Master Engraver Jean-Pierre Moreau', category: 'Interviews', excerpt: 'We sit down with one of the last great hand-engravers to discuss his craft and legacy.', date: '2024-10-20', readTime: '15 min', image: generateImage('blog6', 800, 600) },
];
