/**
 * Centralized Image Configuration for SR Events.
 * 
 * - Hero: Ram (Founder & Lead Event Organizer of SR Events, Addanki)
 * - Categories: Dedicated visuals for each of the 6 service types
 * - Featured: Unique signature celebration highlights (no overlap with Services)
 * - Transformation: Real Addanki convention hall before/after transformation
 * - Gallery: Curated collection of the 12 most important, distinct setups (duplicates removed)
 */

export interface EventImageConfig {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  category: 'Weddings' | 'Engagements' | 'Birthdays' | 'Receptions' | 'Corporate' | 'Private';
  alt: string;
  width?: number;
  height?: number;
}

export const EVENT_IMAGES = {
  // Hero high-impact photo: Ram, the lead organizer
  hero: {
    url: '/images/ram_organiser.jpg',
    alt: 'Ram - Lead Event Organizer & Founder of SR Events Addanki',
    label: 'MEET RAM · LEAD ORGANIZER',
  },
  
  // Service category cover images (6 unique setups)
  categories: {
    wedding: {
      url: '/images/events/sr_event_07.jpg',
      alt: 'Grand 4-Pillar Mandap with Wisteria Flower Ceiling and Peach Drapes by SR Events',
      title: 'Grand Weddings & Mandaps',
    },
    engagement: {
      url: '/images/events/sr_event_02.jpg',
      alt: 'Lush Foliage Backdrop with Circular Floral Arch and Royal Golden Couch for Engagement by SR Events',
      title: 'Engagements & Ring Ceremonies',
    },
    birthday: {
      url: '/images/events/sr_event_16.jpg',
      alt: 'Festive Yellow and Green Draped Celebration Stage with Floral Chandelier by SR Events',
      title: 'Birthday Celebrations & Haldi',
    },
    reception: {
      url: '/images/events/sr_event_26.jpg',
      alt: 'Modern Royal Purple and Violet Reception Stage with Crystal Chandeliers by SR Events',
      title: 'Receptions & Evening Galas',
    },
    corporate: {
      url: '/images/events/sr_event_03.jpg',
      alt: 'Grand AC Convention Hall Stage with Drapes, Chandelier, and Floral Backdrop by SR Events',
      title: 'Corporate Events & Conclaves',
    },
    private: {
      url: '/images/events/sr_event_01.jpg',
      alt: 'Traditional Golden Lotus Stage Backdrop with Brass Pooja Lamps and Bridal Seer Trays by SR Events',
      title: 'Private & Special Events',
    },
  },

  // Featured showcase setups (distinct setups to avoid duplicating Services images)
  featured: {
    wedding: {
      url: '/images/events/sr_event_19.jpg',
      alt: 'Colossal Multi-Tiered Royal Temple Gopuram Outdoor Wedding Mandap in Addanki by SR Events',
      title: 'A Grand Royal Mandap Celebration',
    },
    engagement: {
      url: '/images/events/sr_event_13.jpg',
      alt: 'Peach Draped Banquet Hall Stage with Red Rose Wall by SR Events',
      title: 'Romantic Evening Ring Ceremony',
    },
    reception: {
      url: '/images/events/sr_event_18.jpg',
      alt: 'Contemporary Peacock Teal Velvet Reception Stage with Illuminated Fan Petals by SR Events',
      title: 'Illuminated Chandelier Banquet Gala',
    },
    corporate: {
      url: '/images/events/sr_event_14.jpg',
      alt: 'Red Rose Rainbow Arch Stage with Crystal Chandeliers by SR Events',
      title: 'Annual Corporate Leadership Conclave',
    },
  },

  // Before/After Transformation using real SR Events convention hall shots
  transformation: {
    before: '/images/events/sr_event_23.jpg',
    after: '/images/events/sr_event_25.jpg',
    title: 'From Venue Space To Sacred Celebration',
    description: 'Transforming bare convention halls in Addanki into breathtaking royal mandaps with custom lighting, floral artistry, and stage fabrication.',
  },

  // Curated Interactive Gallery (12 most important, distinct setups — zero duplicate angles)
  gallery: [
    {
      id: 'gal-01',
      url: '/images/events/sr_event_19.jpg',
      thumbnail: '/images/events/sr_event_19.jpg',
      title: 'Colossal Royal Temple Gopuram Mandap',
      category: 'Weddings',
      alt: 'Massive multi-tiered temple gopuram outdoor royal wedding mandap with red carpet walkway',
    },
    {
      id: 'gal-02',
      url: '/images/events/sr_event_25.jpg',
      thumbnail: '/images/events/sr_event_25.jpg',
      title: 'Royal Kalyana Mandapam with Deities',
      category: 'Weddings',
      alt: 'Masterwork golden temple gopuram with Lord Venkateswara & Padmavathi idols against red roses',
    },
    {
      id: 'gal-03',
      url: '/images/events/sr_event_07.jpg',
      thumbnail: '/images/events/sr_event_07.jpg',
      title: '4-Pillar Mandap with Wisteria Canopy',
      category: 'Weddings',
      alt: 'Carved temple pillars with cascading white wisteria flower ceiling and peach drapes',
    },
    {
      id: 'gal-04',
      url: '/images/events/sr_event_11.jpg',
      thumbnail: '/images/events/sr_event_11.jpg',
      title: 'Night Lawn Mandap with Floral Swags',
      category: 'Weddings',
      alt: 'Outdoor nighttime wedding mandap with yellow and white floral swags and wisteria drops',
    },
    {
      id: 'gal-05',
      url: '/images/events/sr_event_02.jpg',
      thumbnail: '/images/events/sr_event_02.jpg',
      title: 'Circular Floral Arch & Royal Couch',
      category: 'Engagements',
      alt: 'Lush green foliage wall with circular floral arch and carved royal golden sofa',
    },
    {
      id: 'gal-06',
      url: '/images/events/sr_event_18.jpg',
      thumbnail: '/images/events/sr_event_18.jpg',
      title: 'Peacock Teal Velvet Luxury Stage',
      category: 'Receptions',
      alt: 'Modern teal velvet stage with illuminated acrylic fan petals and royal golden couch',
    },
    {
      id: 'gal-07',
      url: '/images/events/sr_event_26.jpg',
      thumbnail: '/images/events/sr_event_26.jpg',
      title: 'Royal Purple & Violet Reception Stage',
      category: 'Receptions',
      alt: 'Modern purple velvet and floral infinity stage with crystal chandeliers in AC banquet hall',
    },
    {
      id: 'gal-08',
      url: '/images/events/sr_event_14.jpg',
      thumbnail: '/images/events/sr_event_14.jpg',
      title: 'Red Rose Rainbow Arch Stage',
      category: 'Receptions',
      alt: 'Dramatic red floral arch stage with hanging crystal chandeliers and wisteria canopy',
    },
    {
      id: 'gal-09',
      url: '/images/events/sr_event_16.jpg',
      thumbnail: '/images/events/sr_event_16.jpg',
      title: 'Yellow Draped Haldi & Festive Stage',
      category: 'Birthdays',
      alt: 'Vibrant yellow and green backdrop with chandelier and floral border for festive events',
    },
    {
      id: 'gal-10',
      url: '/images/events/sr_event_12.jpg',
      thumbnail: '/images/events/sr_event_12.jpg',
      title: 'Circular Floral Wreath Ivy Backdrop',
      category: 'Birthdays',
      alt: 'Green ivy wall with round floral wreath and illuminated floral urns for celebrations',
    },
    {
      id: 'gal-11',
      url: '/images/events/sr_event_03.jpg',
      thumbnail: '/images/events/sr_event_03.jpg',
      title: 'Convention Hall Grand Reception Stage',
      category: 'Corporate',
      alt: 'Grand convention hall stage with floral Ganesha, drapes, and crystal chandeliers',
    },
    {
      id: 'gal-12',
      url: '/images/events/sr_event_01.jpg',
      thumbnail: '/images/events/sr_event_01.jpg',
      title: 'Golden Lotus Seemantham & Puja Setup',
      category: 'Private',
      alt: 'Traditional golden lotus stage with brass lamps and bridal seer trays in Addanki',
    },
  ] as EventImageConfig[],
};
