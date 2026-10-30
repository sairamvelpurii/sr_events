export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  categoryKey: keyof typeof import('./images').EVENT_IMAGES['categories'];
  description: string;
  highlights: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'weddings',
    number: '01',
    title: 'Weddings',
    categoryKey: 'wedding',
    description:
      'Complete wedding management from ceremonial stage fabrication and floral artistry to guest reception and punctual coordination.',
    highlights: ['Bespoke Mandap & Stage Styling', 'Punctual Timeline Management', 'Guest Seating & Ambience Flow'],
  },
  {
    id: 'engagements',
    number: '02',
    title: 'Engagements',
    categoryKey: 'engagement',
    description:
      'Refined ceremonies creating an elegant backdrop for rings and family introductions, balanced with warmth and beauty.',
    highlights: ['Artisanal Backdrop Concepts', 'Subtle Ambient Lighting', 'Family Coordination'],
  },
  {
    id: 'receptions',
    number: '03',
    title: 'Receptions',
    categoryKey: 'reception',
    description:
      'Grand evening celebrations featuring dramatic stage lighting, seamless entry management, and comfortable guest hospitality.',
    highlights: ['Grand Stage & LED Installations', 'Sound & Audio Engineering', 'VIP Guest Hospitality'],
  },
  {
    id: 'birthdays',
    number: '04',
    title: 'Birthday Celebrations',
    categoryKey: 'birthday',
    description:
      'Milestone birthdays and energetic family celebrations crafted with custom themes, lively backdrops, and entertainment setups.',
    highlights: ['Custom Thematic Decor', 'Entertainment & Sound Setup', 'Cake Cutting Stage Styling'],
  },
  {
    id: 'corporate',
    number: '05',
    title: 'Corporate Events',
    categoryKey: 'corporate',
    description:
      'Professional business gatherings, conferences, inaugurations, and awards galas executed with punctual precision.',
    highlights: ['Crisp AV & Stage Production', 'Corporate Branding Integration', 'Professional Hospitality'],
  },
  {
    id: 'private',
    number: '06',
    title: 'Private & Special Events',
    categoryKey: 'private',
    description:
      'Anniversaries, housewarmings, and special family gatherings tailored with care and personal attention.',
    highlights: ['Intimate Atmosphere Curation', 'Dedicated On-site Support', 'Custom Layout Planning'],
  },
];

export interface EventScaleTier {
  id: string;
  tier: 'Intimate' | 'Signature' | 'Grand';
  subtitle: string;
  description: string;
  idealFor: string;
  scope: string[];
}

export const EVENT_SCALES: EventScaleTier[] = [
  {
    id: 'intimate',
    tier: 'Intimate',
    subtitle: 'Small Gatherings & Private Celebrations',
    description:
      'Thoughtful planning for intimate ceremonies, home functions, and exclusive gatherings where refined details matter most.',
    idealFor: 'Up to 100 Guests',
    scope: [
      'Focused floral and lighting decor',
      'Personal coordination by Ram',
      'Compact stage or backdrop setup',
      'Ideal for home or private venue functions',
    ],
  },
  {
    id: 'signature',
    tier: 'Signature',
    subtitle: 'Medium Celebrations Requiring Detailed Coordination',
    description:
      'Harmonious balance of impressive stage presentation, sound arrangement, and structured execution for milestone occasions.',
    idealFor: '100 – 400 Guests',
    scope: [
      'Custom stage fabrication & floral design',
      'Professional sound & ambient lighting',
      'Vendor management & catering coordination',
      'On-site floor coordination team',
    ],
  },
  {
    id: 'grand',
    tier: 'Grand',
    subtitle: 'Large-Scale Events Requiring Extensive Planning & Execution',
    description:
      'Full-scale event production for grand weddings, massive receptions, and public functions requiring multi-layer execution — from 500 guests to 10,000+.',
    idealFor: '500 – 10,000+ Guests',
    scope: [
      'Expansive structural fabrication & mandap architecture',
      'High-power audio-visual and stage lighting production',
      'Comprehensive crowd flow & entry hospitality setup',
      'Dedicated multi-member execution coordination',
    ],
  },
];

export const WHY_SR_EVENTS = [
  {
    number: '01',
    title: 'Attention to Detail',
    description:
      'From flower choice and linen textures to crisp timing and lighting balance, every element is curated to honor your celebration.',
    iconName: 'Sparkles',
  },
  {
    number: '02',
    title: 'Personalised Approach',
    description:
      'Every family and organization has distinct traditions and visions. We listen carefully and design each event around your priorities.',
    iconName: 'HeartHandshake',
  },
  {
    number: '03',
    title: 'Reliable Coordination',
    description:
      'Our team manages vendors, setup schedules, and timelines so you and your guests can experience your event completely stress-free.',
    iconName: 'ShieldCheck',
  },
  {
    number: '04',
    title: 'Flexible Scale',
    description:
      'Whether a cozy gathering at home or a grand 10,000-guest reception in Addanki, we scale our resources to fit your requirements.',
    iconName: 'Sliders',
  },
];

export const INTRO_PILLARS = [
  {
    number: '01',
    title: 'Personalised Planning',
    tag: 'Mana Inti Veduka',
    quote: 'Pelli ante rendu manasula kalayika mathrame kadhu... rendu kutumbala sammelanam!',
    quoteMovie: 'Shatamanam Bhavati',
    quoteMeaning: 'A wedding unites two families into one grand celebration.',
    description:
      'We work alongside your family to shape your vision into a practical, beautifully paced event concept.',
  },
  {
    number: '02',
    title: 'Reliable Coordination',
    tag: 'Nammakamaina Baadhyatha',
    quote: 'Manushulu kalisi unte pandaga... mana intlo subhakaryam ante oorantha sandadi!',
    quoteMovie: 'Seethamma Vakitlo Sirimalle Chettu',
    quoteMeaning: 'When families gather with joy, every moment becomes an unforgettable festival.',
    description:
      'Ram and our execution crew maintain punctual timing, organized logistics, and prompt communication.',
  },
  {
    number: '03',
    title: 'Events of Every Scale',
    tag: 'Pelli Sandadi',
    quote: 'Pelli chesi chudu antaru... SR Events thodunte aa kalyanam oka grand cinema la nilichipothundi!',
    quoteMovie: 'Tollywood Celebration Spirit',
    quoteMeaning: 'With SR Events by your side, your celebration turns into an effortless, cinematic memory.',
    description:
      'Supporting intimate family gatherings, festive ceremonies, and expansive multi-day grand celebrations across Addanki and nearby regions.',
  },
];
