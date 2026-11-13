// Initial frontend-only mock data for Admin Dashboard.
// Later, replace with API fetches:
// GET /api/orders, GET /api/inquiries, GET /api/settings

export const INITIAL_ORDERS = [
  {
    id: 'HUJ-4821-UAE',
    createdAt: '2026-11-10T14:20:00Z',
    customerName: 'Sheikh Rashid Al Maktoum',
    customerPhone: '+971 50 491 8820',
    customerEmail: 'rashid.m@private.ae',
    address: 'Palm Jumeirah, Villa Frond M, Dubai, UAE',
    city: 'Dubai',
    paymentMethod: 'Apple Pay',
    status: 'Confirmed',
    notes: 'Please call security gate 30 mins prior to white glove arrival.',
    totalAED: 21700,
    items: [
      {
        id: 'huj-01',
        sku: 'HUJ-SOF-001',
        name: 'Dune Low Modular Sofa',
        selectedColor: 'Oatmeal Bouclé',
        quantity: 1,
        priceAED: 14500,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=70'
      },
      {
        id: 'huj-03',
        sku: 'HUJ-TBL-003',
        name: 'Roma Honed Travertine Coffee Table',
        selectedColor: 'Natural Roman Beige',
        quantity: 1,
        priceAED: 7200,
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=70'
      }
    ]
  },
  {
    id: 'HUJ-4819-UAE',
    createdAt: '2026-11-09T11:05:00Z',
    customerName: 'Noura Al Suwaidi',
    customerPhone: '+971 52 814 3309',
    customerEmail: 'noura@studio-ad.ae',
    address: 'Saadiyat Cultural District, Villa 14, Abu Dhabi, UAE',
    city: 'Abu Dhabi',
    paymentMethod: 'WhatsApp',
    status: 'In Production',
    notes: 'Custom width 340cm requested for majlis.',
    totalAED: 18200,
    items: [
      {
        id: 'huj-08',
        sku: 'HUJ-SOF-008',
        name: 'Curve Wave 3-Seater Chaise',
        selectedColor: 'Chalk Chenille',
        quantity: 1,
        priceAED: 18200,
        image: 'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=400&q=70'
      }
    ]
  },
  {
    id: 'HUJ-4812-UAE',
    createdAt: '2026-11-08T17:45:00Z',
    customerName: 'Tariq Al Qasimi',
    customerPhone: '+971 55 229 1044',
    customerEmail: 'tariq.q@emirates.ae',
    address: 'Al Heerah Suburb, Coastal Villa 8, Sharjah, UAE',
    city: 'Sharjah',
    paymentMethod: 'Apple Pay',
    status: 'Out for Delivery',
    notes: 'Fragile alabaster lamp - handle with care.',
    totalAED: 4900,
    items: [
      {
        id: 'huj-06',
        sku: 'HUJ-LGT-006',
        name: 'Alabaster Dome Table Lamp',
        selectedColor: 'Milky White Alabaster',
        quantity: 2,
        priceAED: 2450,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=70'
      }
    ]
  },
  {
    id: 'HUJ-4798-UAE',
    createdAt: '2026-11-05T09:30:00Z',
    customerName: 'Elena Vance',
    customerPhone: '+971 58 773 9102',
    customerEmail: 'elena@vancedesign.co',
    address: 'Downtown Dubai, Boulevard Crescent, Tower 2, Dubai, UAE',
    city: 'Dubai',
    paymentMethod: 'Card',
    status: 'Delivered',
    notes: 'Trade order - 4 dining chairs.',
    totalAED: 7800,
    items: [
      {
        id: 'huj-05',
        sku: 'HUJ-CHR-005',
        name: 'Nara Minimalist Dining Chair',
        selectedColor: 'Bleached White Oak',
        quantity: 4,
        priceAED: 1950,
        image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=70'
      }
    ]
  },
  {
    id: 'HUJ-4790-UAE',
    createdAt: '2026-11-03T16:15:00Z',
    customerName: 'Khalifa Al Dhaheri',
    customerPhone: '+971 50 990 4412',
    customerEmail: 'khalifa@alainholdings.ae',
    address: 'Al Jimi District, Villa 22, Al Ain, UAE',
    city: 'Al Ain',
    paymentMethod: 'WhatsApp',
    status: 'Pending',
    notes: 'Awaiting fabric swatch confirmation.',
    totalAED: 4900,
    items: [
      {
        id: 'huj-02',
        sku: 'HUJ-CHR-002',
        name: 'Palla Sculptural Lounge Chair',
        selectedColor: 'Cloud Bouclé',
        quantity: 1,
        priceAED: 4900,
        image: 'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=400&q=70'
      }
    ]
  }
];

export const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'In Production',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

export const INITIAL_INQUIRIES = [
  {
    id: 'INQ-101',
    createdAt: '2026-11-10T10:15:00Z',
    name: 'Amira Al Falasi',
    email: 'amira@falasi-interiors.ae',
    phone: '+971 50 311 7742',
    inquiryType: 'Commercial Trade & Hospitality',
    message: 'We are designing a boutique specialty cafe in Jumeirah 1 and would love trade pricing for 12 Nara Dining Chairs and 4 bespoke travertine tables.',
    status: 'New'
  },
  {
    id: 'INQ-102',
    createdAt: '2026-11-09T15:40:00Z',
    name: 'Omar Al Mansoori',
    email: 'omar.m@gmail.com',
    phone: '+971 56 442 1980',
    inquiryType: 'Custom Furniture / Bespoke Sizing',
    message: 'Can the Dune Low Modular Sofa be customized to 360cm in Warm Sand bouclé? Looking for delivery to Abu Dhabi.',
    status: 'In Progress'
  },
  {
    id: 'INQ-103',
    createdAt: '2026-11-07T12:10:00Z',
    name: 'Layla Haddad',
    email: 'layla@d3studio.ae',
    phone: '+971 52 908 5511',
    inquiryType: 'Material Swatch Request',
    message: 'Requesting physical bouclé and walnut burl veneer samples for a client presentation next Tuesday in Dubai Design District.',
    status: 'Replied'
  }
];

export const INITIAL_STUDIO_INFO = {
  brandName: 'HUJRAH',
  arabicName: 'حجره',
  phone: '+971 50 123 4567',
  whatsappNumber: '971501234567',
  email: 'info@hujrah.ae',
  workingHours: 'Saturday – Thursday: 10:00 AM – 8:00 PM (GST)',
  alAinAddress: 'Industrial Area, Al Ain, United Arab Emirates',
  dubaiAddress: 'Building 6, Dubai Design District (d3), Dubai, UAE',
  freeDeliveryThresholdAED: 1500,
  instagramUrl: 'https://instagram.com',
  tiktokUrl: 'https://tiktok.com'
};

