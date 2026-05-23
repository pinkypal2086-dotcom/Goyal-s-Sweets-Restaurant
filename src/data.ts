import { MenuItem, SweetItem, GalleryItem } from './types';

export const RESTAURANT_DETAILS = {
  name: "Goyal’s Sweets & Restaurant",
  tagline: "Taste the Tradition.",
  headline: "Authentic Sweets & North Indian Meals in Naraingarh",
  subHeadline: "Opposite Naraingarh Bus Stand — Since 1998, serving fresh festive Mithais and flavourful Indian, Chinese & South Indian wholesome meals.",
  seoTitle: "Goyal’s Sweets & Restaurant – Mithai & North Indian Cuisine, Naraingarh",
  metaDescription: "Goyal’s Sweets & Restaurant in Naraingarh offers authentic North Indian thalis, Kababs and fresh Indian sweets. Open 11:30am–9:45pm. Order online or visit us!",
  address: "Opp. Bus Stand, State Highway 22 (Chandigarh Road), Naraingarh, Haryana 134203",
  addressLandmark: "Opposite Naraingarh Bus Stand (near Axis Bank, adjacent to EasyDay store)",
  phone: "+91 82220 00999",
  whatsapp: "+918222000999",
  hours: "Daily 11:30 AM – 9:45 PM",
  priceRange: "₹800 for two",
  familyInfo: "Bright lively ambience with a magnificent physical sweets glass display counter. Includes warm decor, comfortable kid-friendly seating, and casual dining space.",
  deliveryOptions: [
    { name: "Order on Zomato", icon: "zomato", url: "https://www.zomato.com/ambala/goyal-sweets-and-restaurants-naraingarh-locality/order" },
    { name: "Order on Swiggy", icon: "swiggy", url: "https://www.swiggy.com/city/naraingarh/goyal-sweets-restaurant-bypass-lotton-chungi-rest400294?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder" }
  ],
  socials: {
    facebook: "https://www.facebook.com/GoyalsNaraingarh/",
    instagram: "https://www.instagram.com/p/DHdDN2zvHAZ/"
  },
  menuLinks: {
    restaurantGuru: "https://restaurant-guru.in/Goyal-sweets-and-restaurants-Naraingarh/menu",
    magicPin: "https://magicpin.in/Naraingarh/Naraingarh/Restaurant/Goyal-Sweets-And-Restaurant/store/5b1b28/menu/?id=5&menu=Food+Menu%3Fimg%3DFood-Menu"
  },
  virtualTour: "https://www.google.com/local/place/fid/0x390fa780ab298a1f:0x4f0c5eb69ccfffe0/photosphere?iu=https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid%3Dl1Mal25eDKQ6_ABha11MMg%26cb_client%3Dlu.gallery.gps%26w%3D160%26h%3D106%26yaw%3D66.39606%26pitch%3D0%26thumbfov%3D100&ik=CAISFmwxTWFsMjVlREtRNl9BQmhhMTFNTWc%3D"
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Goyal Special Maharaja Thali",
    description: "An elaborate, royal Punjabi platter featuring Paneer butter masala, rich slow-cooked Dal Makhani, spiced Chole, aromatic Basmati Rice, Butter Naan, Raita, Salad, and two pieces of hot Gulab Jamun.",
    price: 320,
    category: "North Indian",
    isSignature: true,
    isVegetarian: true,
    image: "/src/assets/images/maharaja_thali_1779465750977.png",
    spicyLevel: 1
  },
  {
    id: "m2",
    name: "Cheese Malai Seekh Kabab",
    description: "Succulent vegetarian kababs crafted with premium cottage cheese (Paneer), fresh cream, hand-ground mild spices, and char-grilled cleanly. Served with mint chutney.",
    price: 260,
    category: "North Indian",
    isSignature: true,
    isVegetarian: true,
    image: "/src/assets/images/malai_kabab_1779465765712.png",
    spicyLevel: 1
  },
  {
    id: "m3",
    name: "Paneer Butter Masala",
    description: "Cubes of soft fresh cottage cheese simmered in a rich, buttery tomato sauce spiced with dry fenugreek leaves (Kasuri Methi).",
    price: 220,
    category: "North Indian",
    isVegetarian: true,
    spicyLevel: 1
  },
  {
    id: "m4",
    name: "Chana Masala with Bhature (2 Pcs)",
    description: "Tangy spices and slow-cooked chickpeas (Chole) served with two golden, fluffy fried leavened breads.",
    price: 180,
    category: "North Indian",
    isVegetarian: true,
    spicyLevel: 2
  },
  {
    id: "m5",
    name: "Veg Hakka Noodles",
    description: "Wok-tossed thin julienned bell peppers, cabbage, and onions mixed with perfectly boiled noodles, seasoned with light soy sauce and sesame oil.",
    price: 150,
    category: "Chinese",
    isVegetarian: true,
    spicyLevel: 1
  },
  {
    id: "m6",
    name: "Chilli Paneer Dry / Gravy",
    description: "Crispy fried paneer cubes prepared with diced bell peppers, crisp onions, garlic, green chillies, and savory dark soy sauce.",
    price: 210,
    category: "Chinese",
    isVegetarian: true,
    spicyLevel: 2
  },
  {
    id: "m7",
    name: "Special Veg Manchurian",
    description: "Fried mixed vegetable dumplings tossed in an aromatic, thick, sweet, sour and spicy Manchurian sauce.",
    price: 170,
    category: "Chinese",
    isVegetarian: true,
    spicyLevel: 2
  },
  {
    id: "m8",
    name: "Special Masala Dosa",
    description: "Golden and super-crispy paper-thin rice crepe stuffed with mild spiced mustard-tempered potato mash. Served with sambar and coconut and tomato chutneys.",
    price: 140,
    category: "South Indian",
    isVegetarian: true,
    spicyLevel: 1
  },
  {
    id: "m9",
    name: "Paneer Butter Masala Dosa",
    description: "Crisp dosa cooked in pure butter, coated with dry red garlic chutney and filled with grated spiced paneer and butter.",
    price: 170,
    category: "South Indian",
    isVegetarian: true,
    isSignature: true,
    spicyLevel: 1
  },
  {
    id: "m10",
    name: "Steamed Idli Sambhar (2 Pcs)",
    description: "Light-as-air fermented steamed rice and lentil cakes served with boiling hot spicy vegetable drumstick sambar.",
    price: 80,
    category: "South Indian",
    isVegetarian: true,
    spicyLevel: 1
  },
  {
    id: "m11",
    name: "Fresh Hot Jalebi (per Portion)",
    description: "Traditional fermented batter fried spiral-shapes soaked hot in sugar syrup. Crisp, rich, and juicy.",
    price: 90,
    category: "Sweets",
    isVegetarian: true,
    spicyLevel: 0
  },
  {
    id: "m12",
    name: "Sweet Thick Lassi",
    description: "Rich refreshing Punjabi sweet curd lassi served in standard glasses, loaded with fresh cardamom powder and fresh cream.",
    price: 80,
    category: "Beverages",
    isVegetarian: true,
    spicyLevel: 0
  }
];

export const SWEET_ITEMS: SweetItem[] = [
  {
    id: "s1",
    name: "Besan Desi Ghee Ladoo",
    description: "Roasted aromatic gram flour sweetened and rolled with premium cashew pieces, almonds, and cardamom in authentic pure Desi Ghee.",
    pricePerKg: 480,
    image: "/src/assets/images/besan_ladoo_1779465847839.png",
    availableWeights: [0.25, 0.5, 1.0, 2.0],
    isBestSeller: true
  },
  {
    id: "s2",
    name: "Royal Golden Gulab Jamun",
    description: "Soft spongy khoya (reduced milk) berry-sized balls cooked red-golden and immersed in heavy saffron and cardamom syrup.",
    pricePerKg: 380,
    image: "/src/assets/images/gulab_jamun_1779465826310.png",
    availableWeights: [0.25, 0.5, 1.0, 2.0],
    isBestSeller: true
  },
  {
    id: "s3",
    name: "Desi Ghee Crisp Jalebi",
    description: "Deep fried standard spiral swirls of flour dipped in hot cardamom and saffron-infused sugar syrup.",
    pricePerKg: 360,
    image: "/src/assets/images/sweets_hero_1779465732194.png",
    availableWeights: [0.5, 1.0, 2.0]
  },
  {
    id: "s4",
    name: "Silver Sheet Kaju Katli",
    description: "Traditional triangular slices made of premium fine cashews and pure sugar, adorned with edible silver leaf (Varq). Melt-in-mouth texture.",
    pricePerKg: 800,
    image: "/src/assets/images/sweets_counter_1779465800002.png",
    availableWeights: [0.25, 0.5, 1.0, 2.0],
    isBestSeller: true
  },
  {
    id: "s5",
    name: "Alwar Milk Cake",
    description: "Grainy condensed sweet caramelized milk fudge with chocolatey-brown centers and rich milky margins.",
    pricePerKg: 560,
    image: "/src/assets/images/sweets_counter_1779465800002.png",
    availableWeights: [0.25, 0.5, 1.0, 2.0]
  },
  {
    id: "s6",
    name: "Desi Ghee Motichoor Laddu",
    description: "Very tiny pearl shaped gram flour structures deeply fried in original ghee, sweetened and lightly spiced with melon seeds and cardamom.",
    pricePerKg: 440,
    image: "/src/assets/images/sweets_hero_1779465732194.png",
    availableWeights: [0.25, 0.5, 1.0, 2.0]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Spacious Front Seating",
    category: "Interiors",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG7zk2vWxfWuNbeGFiLHOv4GrhWf2Z9mzkZ7mEUBgbSTcmEL8FAoUlEc3u1922jBSzjXLCIA3dfu4bBvLXOJJJjSjY85QZsu7OEeck1_JXixOKilYZ-0K3mu4wYTFypmeKG99w=s1360-w1360-h1020-rw",
    caption: "Clean, family-friendly tables in our bright, air-conditioned dining zone directly opposite the bus stand."
  },
  {
    id: "g2",
    title: "Gleaming Sweets Selection",
    category: "Sweets Counter",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEM44yE25eUHxlzkc5UByuomOXnSqZ10SOKzSKsaV_ITkWb046Wpx2Md9vAP5GyF0ZK3fKTInyL762Vn1nJdS0Gr5WwZs3OIdVL7D5Tw7f7SM0xSzFm4schkHIrJbW_3-VqSbCfqw=s1360-w1360-h1020-rw",
    caption: "Freshly prepared traditional milk sweets, pedas, and laddoos lined beautifully in our standard glass displays."
  },
  {
    id: "g3",
    title: "Welcoming Family Dining Hall",
    category: "Interiors",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGBEOdZoLaD4lch_-6BuS8sX1pfL4mbRwNm2k9dr7fIuPW3oJwie3cv53j_ngIpHlrNPBbGtwrj1fmZ5XniMDO9TgwdQdDRdFkdqhWd5Iai5NFVC4Dn4DUcr6-y6GPkpmAKYDgBYO3DJ2Q=s1360-w1360-h1020-rw",
    caption: "Spacious comfortable tables positioned with strict hygiene standards, perfect for small and large families."
  },
  {
    id: "g4",
    title: "Traditional Sweet Trays Display",
    category: "Sweets Counter",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE6v4KrVwRGfLsVIvKp7vrkoYG1eWtw7M-9c0AoCzDbPB3Q1ersuCtXOP_ZcMdfbUB_BbdAklgJXyzzcdZ84JTH-3p93UK0EgObM9d2L8nnadeLWFf9hixTvJJ9XfXznHkipRnn=s1360-w1360-h1020-rw",
    caption: "Deliciously prepared festive barfis and dry fruit confectioneries glowing neatly inside the counter shelves."
  },
  {
    id: "g5",
    title: "Bright Front Entrance View",
    category: "Storefront",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFKKna5HptIwOnZu65renOg7ISU9JHv8PHJcSIRGDfohX-g_2DJGhoIxa-P3Z9D1yC6JQVwr5iKnXUEKF-Xo2uC2O6pG5QmKwxS43BV9nzdctuFU3SJeVvM2oXY0zvkl97QmjmhKA=s1360-w1360-h1020-rw",
    caption: "The elegant, welcoming double entrance on Axis Bank road, a prominent local landmark of Naraingarh."
  },
  {
    id: "g6",
    title: "Sweets Showcase Counter Room",
    category: "Sweets Counter",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHsycl1C_2_YkbmQaCvqoZzB00WHXCYC1r3389n5pNFoGfesgpg0-rjHidT-GdgsDzJiOkAzFS1V0LxO2Vmx68iuYsjKkBATJSAu6232SEyC1QH0xtphCMQz_SJ6cySgV2q9HJ0=s1360-w1360-h1020-rw",
    caption: "Customers exploring our massive range of pure ghee traditional Indian desserts and packed gift boxes."
  },
  {
    id: "g7",
    title: "Clean Seating Configuration",
    category: "Interiors",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEyv_guDteppQtuGiMicpVCf8b0XJC6_m4MxkTAgnufs4sIGTYZx52PgmElXoqJ81Xr_BSeKAqHBR9Ct1AK9p2fSi_FP-J1haYRQORPegzuLMTUnjzVvpLPmbFMGCISUkw5Safk5Q=s1360-w1360-h1020-rw",
    caption: "Cozy sofa booths and tables, tidy space setups for daily multi-cuisine breakfast, lunch and dinner."
  },
  {
    id: "g8",
    title: "Rich Custard & Festive Desserts",
    category: "Sweets Counter",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGGlCky-nEmRzEWJOwevP0xz8Yuwg14yfUwQzxO4AqlUBwRg0UpiMxVaQQKMABsFvmXCvUd2diUh3tsAGX9L7BblC4vDGEmRzBj9hgy_gZpLZF1K9Q8FI8-_EWaGlDdIEaHx_Zi=s1360-w1360-h1020-rw",
    caption: "Authentic, freshly plated festive specialties and sweet delicacies crafted under deep hygiene standards."
  },
  {
    id: "g9",
    title: "Classic Flagship Storefront Billboard",
    category: "Storefront",
    image: "https://lh3.googleusercontent.com/p/AF1QipPPvzqarDkHZMnXPxW_WCXHijQjdY9jQS9Z4cDw=s1360-w1360-h1020-rw",
    caption: "The iconic green and gold signage overlooking the main road, welcoming visitors since 1998."
  },
  {
    id: "g10",
    title: "Main Family Dining Hall",
    category: "Interiors",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFI9eDqfnaTBUdqXqws1z206d5WYVJ6rznAgxDa3rXHi1sYYwwVGSZ0dO6hTdIBw32oW5QrCPydJc_B0FT8kQMjLf15BMBpvx9JrfA0IDtqRDrFBaSiHugvtw80gntaQ8lckspx_A=s1360-w1360-h1020-rw",
    caption: "A wider view of our premium air-conditioned seating hall, designed carefully to accommodate both small and large gatherings comfortably."
  },
  {
    id: "g11",
    title: "Traditional Gift Boxes Display",
    category: "Sweets Counter",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHagMnyv4GkevyKpag1QeUggi4YBQuxJGPv5w4IGKRO6fBs5cky_NQWBMl7FcREqMwcxukTGZPnY88U4BB1JQFpsvJMp9JggMkRh1DFczg6QJC8UkTr68w0avrqasGU--rO_yNY=s1360-w1360-h1020-rw",
    caption: "Exquisite celebratory and festive sweets gift box hampers arranged in our dedicated custom gifting section."
  },
  {
    id: "g12",
    title: "Premium Cozy Booth Seating",
    category: "Interiors",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEq_CJyur70tpb99gLFTBoW-jKKMXWopux-E2bFOQJbQ9sivq00m_TnIM6IizpBpgXn4XprthcIgwTx85zEMlT2xuLoA1LCUAkXc5yDYCk7LefJxrym-tm47py__PJbKRD42zDtDQ=s1360-w1360-h1020-rw",
    caption: "Comfortable cushioned high-back sofa booths offering a relaxing and hygienic space for family dining."
  },
  {
    id: "g13",
    title: "Elegant Sweets Display Room",
    category: "Sweets Counter",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHUNtobD5akPOWQK5wuc_qXtU3zytmH69bFWoCl9hlrDFCmRT-dART2JTG_CHSTKNt33pZU5v7GQBy1INyYiX1TuB8Ksp7rdrhrNxK0LNUUv8pfJqGSbXDBucG-kb4qx0vQoyzL=s1360-w1360-h1020-rw",
    caption: "Brightly lit visual glass cases showcasing our freshly prepared daily batch of Desi Ghee laddoos and traditional milk sweets."
  },
  {
    id: "g14",
    title: "Luxury Sweet Assortments",
    category: "Sweets Counter",
    image: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEM6hC3dgWvJIgCD-dgATN-SD44zPkW_EgOxqksWjvrKFJNVNy46SupOKpON6_4PbinuTVYc01vekNockzs-PieuL2eFbhkfn4YQOZ7VCF5flPFYYgiI0RCT5TLxtnACF5pnQ5a=s1360-w1360-h1020-rw",
    caption: "A sumptuous array of handpicked Indian sweets, dry fruit creations, and delicious pedas prepared to perfection."
  }
];

export const CUSTOMER_REVIEWS = [
  {
    id: "r1",
    author: "Raman Preet Singh",
    rating: 5,
    text: "Goyal's is a household name in Naraingarh! Whether it is buying laddoos for festivals or ordering the Maharaja Thali for Sunday family dinner, they are irreplaceable. Superb quality and incredibly reasonable rates.",
    date: "May 2026"
  },
  {
    id: "r2",
    author: "Meenakshi Sharma",
    rating: 5,
    text: "The Cheese Malai Seekh Kabab is just out of this world! Melt in the mouth. It is great to have a highly clean, purely vegetarian and kid-friendly spot opposite the bus stand. I highly recommend it.",
    date: "April 2026"
  },
  {
    id: "r3",
    author: "Aditya Goyal",
    rating: 4,
    text: "Genuine traditional taste. The jalebis are always crisp and hot. Excellent seating area with good glass counters display. Always busy because the food is fresh and price is affordable.",
    date: "May 2026"
  }
];

export const TIMELINE_BUILD = [
  { date: "June 2026", phase: "Research & Planning", desc: "Sourcing specifications, finalizing menu, verified with listings" },
  { date: "July 2026", phase: "Design Setup", desc: "Configuring warm traditional festive colors: saffron, maroon and cream theme" },
  { date: "August 2026", phase: "Content Writing", desc: "Sweets recipes and exhaustive digital menu categorization" },
  { date: "September 2026", phase: "Development & Testing", desc: "Crafting modular SPA sections, table bookings, and sweet basket algorithms" },
  { date: "October 2026", phase: "Launch & Promotion", desc: "Live publication, Swiggy/Zomato links, WhatsApp reservation integrations" }
];

export const JSON_LD_SCHEMA = {
  "@context": "http://schema.org",
  "@type": "Restaurant",
  "name": "Goyal's Sweets & Restaurant",
  "image": [
    "/src/assets/images/sweets_hero_1779465732194.png",
    "/src/assets/images/sweets_counter_1779465800002.png"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Near Bus Stand, State Highway 22",
    "addressLocality": "Naraingarh",
    "postalCode": "134203",
    "addressCountry": "IN"
  },
  "telephone": "+918222000999",
  "openingHours": "Mo-Su 11:30-21:45",
  "priceRange": "₹800 for two",
  "servesCuisine": ["North Indian", "Chinese", "South Indian"],
  "url": "https://goyalsweetsnaraingarh.com",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.3",
    "reviewCount": "542"
  }
};
