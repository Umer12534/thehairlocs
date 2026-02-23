// export const testCategories = [
//   {
//     name: "Oils",
//     description: "Natural hair oils for nourishment and growth",
//     image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Moisturizers",
//     description: "Hydrating creams and lotions for soft hair",
//     image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Shampoos",
//     description: "Cleansing solutions for all hair types",
//     image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Conditioners",
//     description: "Smoothing and detangling hair conditioners",
//     image: "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Styling",
//     description: "Gels, waxes and sprays for perfect styling",
//     image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//   },
//   {
//     name: "Serums",
//     description: "Lightweight treatments for shine and repair",
//     image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//   },
// ];

// export const testProducts = [
//   // OILS (15 products)
//   {
//     name: "Argan Nourishing Oil",
//     category: "Oils",
//     description: "Rich argan oil for deep nourishment and shine, suitable for all hair types",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 45,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 1200, stock: 25 },
//       "100ml": { price: 2200, stock: 18 },
//       "150ml": { price: 3200, stock: 10 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Coconut Miracle Oil",
//     category: "Oils",
//     description: "Pure coconut oil for deep conditioning and frizz control",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 38,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 800, stock: 40 },
//       "100ml": { price: 1500, stock: 32 },
//       "150ml": { price: 2200, stock: 20 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Jojoba Hair Oil",
//     category: "Oils",
//     description: "Lightweight jojoba oil that mimics natural scalp oils",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 27,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 950, stock: 35 },
//       "100ml": { price: 1800, stock: 28 },
//       "150ml": { price: 2600, stock: 15 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Almond Nourishing Oil",
//     category: "Oils",
//     description: "Vitamin E rich almond oil for hair growth and strength",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 42,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 850, stock: 45 },
//       "100ml": { price: 1600, stock: 38 },
//       "150ml": { price: 2350, stock: 22 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Rosemary Hair Oil",
//     category: "Oils",
//     description: "Rosemary infused oil for scalp health and thickness",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 51,
//     rating: 4.9,
//     sizes: {
//       "50ml": { price: 1100, stock: 30 },
//       "100ml": { price: 2100, stock: 24 },
//       "150ml": { price: 3000, stock: 12 }
//     },
//     sale: { isOnSale: true, percentage: 20 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Olive Oil Treatment",
//     category: "Oils",
//     description: "Extra virgin olive oil for intense moisture and repair",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 22,
//     rating: 4.2,
//     sizes: {
//       "50ml": { price: 700, stock: 50 },
//       "100ml": { price: 1350, stock: 42 },
//       "150ml": { price: 2000, stock: 30 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Avocado Hair Oil",
//     category: "Oils",
//     description: "Nutrient-rich avocado oil for damaged and brittle hair",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 31,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 900, stock: 38 },
//       "100ml": { price: 1700, stock: 30 },
//       "150ml": { price: 2450, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Castor Oil Growth Formula",
//     category: "Oils",
//     description: "Cold-pressed castor oil for hair growth and thickness",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 48,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 650, stock: 55 },
//       "100ml": { price: 1250, stock: 48 },
//       "150ml": { price: 1850, stock: 35 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Tea Tree Scalp Oil",
//     category: "Oils",
//     description: "Tea tree oil for dandruff control and scalp refreshment",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 35,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 1000, stock: 32 },
//       "100ml": { price: 1900, stock: 25 },
//       "150ml": { price: 2750, stock: 15 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Grapeseed Light Oil",
//     category: "Oils",
//     description: "Non-greasy grapeseed oil for fine hair types",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 19,
//     rating: 4.1,
//     sizes: {
//       "50ml": { price: 750, stock: 42 },
//       "100ml": { price: 1450, stock: 36 },
//       "150ml": { price: 2150, stock: 24 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Bhringraj Hair Oil",
//     category: "Oils",
//     description: "Ayurvedic bhringraj oil for premature graying",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 29,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 1150, stock: 28 },
//       "100ml": { price: 2200, stock: 22 },
//       "150ml": { price: 3200, stock: 12 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Amla Hair Oil",
//     category: "Oils",
//     description: "Amla enriched oil for shine and hair strengthening",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 33,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 850, stock: 45 },
//       "100ml": { price: 1600, stock: 38 },
//       "150ml": { price: 2350, stock: 25 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Lavender Relaxing Oil",
//     category: "Oils",
//     description: "Lavender essential oil blend for relaxation and hair health",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 41,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 1050, stock: 33 },
//       "100ml": { price: 2000, stock: 27 },
//       "150ml": { price: 2900, stock: 16 }
//     },
//     sale: { isOnSale: true, percentage: 18 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Biotin Hair Oil",
//     category: "Oils",
//     description: "Biotin-infused oil for hair growth and strength",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 52,
//     rating: 4.9,
//     sizes: {
//       "50ml": { price: 1300, stock: 22 },
//       "100ml": { price: 2450, stock: 16 },
//       "150ml": { price: 3500, stock: 8 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Sesame Warm Oil",
//     category: "Oils",
//     description: "Warming sesame oil for hot oil treatments",
//     images: [
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 18,
//     rating: 4.0,
//     sizes: {
//       "50ml": { price: 650, stock: 48 },
//       "100ml": { price: 1250, stock: 40 },
//       "150ml": { price: 1850, stock: 28 }
//     },
//     sale: { isOnSale: true, percentage: 8 },
//     isNewArrival: true,
//     isFeatured: false
//   },

//   // MOISTURIZERS (15 products)
//   {
//     name: "Coconut Hydrating Moisturizer",
//     category: "Moisturizers",
//     description: "Deep hydration cream with coconut oil for dry and damaged hair",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 32,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 800, stock: 30 },
//       "100ml": { price: 1500, stock: 22 },
//       "150ml": { price: 2100, stock: 15 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Shea Butter Deep Moisture",
//     category: "Moisturizers",
//     description: "Rich shea butter cream for extreme hydration",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 44,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 950, stock: 35 },
//       "100ml": { price: 1800, stock: 28 },
//       "150ml": { price: 2600, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Aloe Vera Hydrating Gel",
//     category: "Moisturizers",
//     description: "Lightweight aloe vera gel for daily moisture",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 28,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 600, stock: 45 },
//       "100ml": { price: 1150, stock: 38 },
//       "150ml": { price: 1700, stock: 25 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Honey Moisture Lock",
//     category: "Moisturizers",
//     description: "Honey-infused moisturizer for shine and softness",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 36,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 850, stock: 40 },
//       "100ml": { price: 1600, stock: 32 },
//       "150ml": { price: 2350, stock: 20 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Mango Butter Cream",
//     category: "Moisturizers",
//     description: "Tropical mango butter for soft and supple hair",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 31,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 900, stock: 36 },
//       "100ml": { price: 1700, stock: 28 },
//       "150ml": { price: 2450, stock: 16 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Glycerin Hydration Boost",
//     category: "Moisturizers",
//     description: "Glycerin-based moisturizer for intense hydration",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 22,
//     rating: 4.1,
//     sizes: {
//       "50ml": { price: 550, stock: 50 },
//       "100ml": { price: 1050, stock: 42 },
//       "150ml": { price: 1550, stock: 30 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Avocado Moisture Cream",
//     category: "Moisturizers",
//     description: "Avocado oil enriched cream for damaged hair",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 39,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 1000, stock: 32 },
//       "100ml": { price: 1900, stock: 25 },
//       "150ml": { price: 2750, stock: 14 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Cucumber Fresh Moisturizer",
//     category: "Moisturizers",
//     description: "Cooling cucumber moisturizer for refreshed hair",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 25,
//     rating: 4.2,
//     sizes: {
//       "50ml": { price: 700, stock: 44 },
//       "100ml": { price: 1350, stock: 36 },
//       "150ml": { price: 2000, stock: 22 }
//     },
//     sale: { isOnSale: true, percentage: 8 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Vitamin E Moisture Rich",
//     category: "Moisturizers",
//     description: "Vitamin E cream for nourished and healthy hair",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 42,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 950, stock: 38 },
//       "100ml": { price: 1800, stock: 30 },
//       "150ml": { price: 2600, stock: 18 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Olive Oil Moisture Boost",
//     category: "Moisturizers",
//     description: "Olive oil based moisturizer for dry scalp",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 29,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 750, stock: 42 },
//       "100ml": { price: 1450, stock: 35 },
//       "150ml": { price: 2150, stock: 24 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Jojoba Hydrating Cream",
//     category: "Moisturizers",
//     description: "Lightweight jojoba moisturizer for fine hair",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 34,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 850, stock: 40 },
//       "100ml": { price: 1600, stock: 32 },
//       "150ml": { price: 2350, stock: 20 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Argan Oil Moisture Milk",
//     category: "Moisturizers",
//     description: "Argan oil enriched moisture milk for softness",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 47,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 1100, stock: 28 },
//       "100ml": { price: 2100, stock: 22 },
//       "150ml": { price: 3000, stock: 12 }
//     },
//     sale: { isOnSale: true, percentage: 18 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Rose Water Hydrator",
//     category: "Moisturizers",
//     description: "Rose water based moisturizer for fragrant hydration",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 38,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 800, stock: 45 },
//       "100ml": { price: 1500, stock: 38 },
//       "150ml": { price: 2200, stock: 25 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Almond Milk Moisture",
//     category: "Moisturizers",
//     description: "Almond milk protein moisturizer for strength",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 27,
//     rating: 4.2,
//     sizes: {
//       "50ml": { price: 900, stock: 36 },
//       "100ml": { price: 1700, stock: 28 },
//       "150ml": { price: 2450, stock: 16 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Cocoa Butter Cream",
//     category: "Moisturizers",
//     description: "Rich cocoa butter for deep conditioning",
//     images: [
//       "https://images.unsplash.com/photo-1601612628452-9e99ced43524?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 41,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 950, stock: 34 },
//       "100ml": { price: 1800, stock: 26 },
//       "150ml": { price: 2600, stock: 15 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: true
//   },

//   // SHAMPOOS (20 products)
//   {
//     name: "Keratin Smooth Shampoo",
//     category: "Shampoos",
//     description: "Keratin enriched shampoo for frizz control and smooth, shiny hair",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 28,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 600, stock: 40 },
//       "100ml": { price: 1100, stock: 35 },
//       "150ml": { price: 1600, stock: 20 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Volume Boost Shampoo",
//     category: "Shampoos",
//     description: "Volumizing shampoo for thin and fine hair",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 35,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 550, stock: 45 },
//       "100ml": { price: 1050, stock: 38 },
//       "150ml": { price: 1550, stock: 25 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Anti-Dandruff Shampoo",
//     category: "Shampoos",
//     description: "Tea tree and zinc formula for dandruff control",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 42,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 650, stock: 50 },
//       "100ml": { price: 1250, stock: 42 },
//       "150ml": { price: 1850, stock: 30 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Color Protect Shampoo",
//     category: "Shampoos",
//     description: "Sulfate-free shampoo for color-treated hair",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 31,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 700, stock: 38 },
//       "100ml": { price: 1350, stock: 30 },
//       "150ml": { price: 2000, stock: 18 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Moisturizing Shampoo",
//     category: "Shampoos",
//     description: "Hydrating shampoo for dry and damaged hair",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 38,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 600, stock: 42 },
//       "100ml": { price: 1150, stock: 35 },
//       "150ml": { price: 1700, stock: 22 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Clarifying Shampoo",
//     category: "Shampoos",
//     description: "Deep cleansing shampoo for product buildup",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 26,
//     rating: 4.2,
//     sizes: {
//       "50ml": { price: 580, stock: 48 },
//       "100ml": { price: 1120, stock: 40 },
//       "150ml": { price: 1650, stock: 28 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Coconut Milk Shampoo",
//     category: "Shampoos",
//     description: "Nourishing shampoo with coconut milk",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 44,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 650, stock: 44 },
//       "100ml": { price: 1250, stock: 36 },
//       "150ml": { price: 1850, stock: 24 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Argan Oil Shampoo",
//     category: "Shampoos",
//     description: "Argan oil enriched shampoo for shine",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 39,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 680, stock: 40 },
//       "100ml": { price: 1300, stock: 32 },
//       "150ml": { price: 1900, stock: 20 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Biotin Shampoo",
//     category: "Shampoos",
//     description: "Biotin-infused shampoo for hair growth",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 48,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 720, stock: 35 },
//       "100ml": { price: 1400, stock: 28 },
//       "150ml": { price: 2050, stock: 15 }
//     },
//     sale: { isOnSale: true, percentage: 18 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Tea Tree Shampoo",
//     category: "Shampoos",
//     description: "Refreshing tea tree shampoo for scalp health",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 33,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 620, stock: 46 },
//       "100ml": { price: 1200, stock: 38 },
//       "150ml": { price: 1750, stock: 26 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Sulfate-Free Shampoo",
//     category: "Shampoos",
//     description: "Gentle sulfate-free formula for daily use",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 37,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 750, stock: 42 },
//       "100ml": { price: 1450, stock: 34 },
//       "150ml": { price: 2100, stock: 22 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Aloe Vera Shampoo",
//     category: "Shampoos",
//     description: "Soothing aloe vera shampoo for sensitive scalp",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 29,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 580, stock: 48 },
//       "100ml": { price: 1120, stock: 40 },
//       "150ml": { price: 1650, stock: 28 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Protein Shampoo",
//     category: "Shampoos",
//     description: "Protein-enriched shampoo for damaged hair",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 41,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 680, stock: 38 },
//       "100ml": { price: 1320, stock: 30 },
//       "150ml": { price: 1950, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Rosemary Shampoo",
//     category: "Shampoos",
//     description: "Rosemary extract for hair thickness",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 45,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 700, stock: 36 },
//       "100ml": { price: 1350, stock: 28 },
//       "150ml": { price: 2000, stock: 16 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Peppermint Shampoo",
//     category: "Shampoos",
//     description: "Cooling peppermint for refreshed scalp",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 34,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 620, stock: 44 },
//       "100ml": { price: 1200, stock: 36 },
//       "150ml": { price: 1750, stock: 24 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Baby Shampoo",
//     category: "Shampoos",
//     description: "Gentle tear-free formula for kids",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 22,
//     rating: 4.0,
//     sizes: {
//       "50ml": { price: 450, stock: 60 },
//       "100ml": { price: 850, stock: 50 },
//       "150ml": { price: 1250, stock: 35 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Men's Strengthening Shampoo",
//     category: "Shampoos",
//     description: "Fortifying shampoo for men's hair",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 27,
//     rating: 4.2,
//     sizes: {
//       "50ml": { price: 650, stock: 42 },
//       "100ml": { price: 1250, stock: 34 },
//       "150ml": { price: 1850, stock: 22 }
//     },
//     sale: { isOnSale: true, percentage: 8 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Dry Shampoo",
//     category: "Shampoos",
//     description: "Quick refresh dry shampoo for busy days",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 49,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 550, stock: 55 },
//       "100ml": { price: 1050, stock: 48 },
//       "150ml": { price: 1550, stock: 35 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Curly Hair Shampoo",
//     category: "Shampoos",
//     description: "Defining shampoo for curly hair types",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 36,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 680, stock: 40 },
//       "100ml": { price: 1320, stock: 32 },
//       "150ml": { price: 1950, stock: 20 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "2-in-1 Shampoo Conditioner",
//     category: "Shampoos",
//     description: "Combination shampoo and conditioner",
//     images: [
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 32,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 720, stock: 38 },
//       "100ml": { price: 1400, stock: 30 },
//       "150ml": { price: 2050, stock: 18 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: true,
//     isFeatured: false
//   },

//   // CONDITIONERS (15 products)
//   {
//     name: "Silk Protein Conditioner",
//     category: "Conditioners",
//     description: "Silk protein conditioner for detangling and adding silky smoothness",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 19,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 700, stock: 28 },
//       "100ml": { price: 1300, stock: 20 },
//       "150ml": { price: 1900, stock: 12 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Deep Conditioning Mask",
//     category: "Conditioners",
//     description: "Intensive deep conditioning treatment",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 42,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 850, stock: 35 },
//       "100ml": { price: 1600, stock: 28 },
//       "150ml": { price: 2350, stock: 15 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Leave-In Conditioner",
//     category: "Conditioners",
//     description: "No-rinse conditioner for daily moisture",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 36,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 650, stock: 40 },
//       "100ml": { price: 1250, stock: 32 },
//       "150ml": { price: 1850, stock: 20 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Keratin Conditioner",
//     category: "Conditioners",
//     description: "Keratin treatment conditioner for smoothness",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 38,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 750, stock: 38 },
//       "100ml": { price: 1450, stock: 30 },
//       "150ml": { price: 2100, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Argan Oil Conditioner",
//     category: "Conditioners",
//     description: "Argan oil enriched conditioner for shine",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 41,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 780, stock: 36 },
//       "100ml": { price: 1500, stock: 28 },
//       "150ml": { price: 2200, stock: 16 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Coconut Conditioner",
//     category: "Conditioners",
//     description: "Hydrating coconut conditioner",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 34,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 680, stock: 42 },
//       "100ml": { price: 1320, stock: 34 },
//       "150ml": { price: 1950, stock: 22 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Volume Conditioner",
//     category: "Conditioners",
//     description: "Lightweight conditioner for volume",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 28,
//     rating: 4.2,
//     sizes: {
//       "50ml": { price: 620, stock: 45 },
//       "100ml": { price: 1200, stock: 38 },
//       "150ml": { price: 1750, stock: 25 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Color Safe Conditioner",
//     category: "Conditioners",
//     description: "Protects color-treated hair",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 31,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 720, stock: 38 },
//       "100ml": { price: 1400, stock: 30 },
//       "150ml": { price: 2050, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 8 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Shea Butter Conditioner",
//     category: "Conditioners",
//     description: "Rich shea butter for deep moisture",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 44,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 800, stock: 34 },
//       "100ml": { price: 1550, stock: 26 },
//       "150ml": { price: 2250, stock: 14 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Aloe Vera Conditioner",
//     category: "Conditioners",
//     description: "Soothing aloe vera conditioner",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 27,
//     rating: 4.1,
//     sizes: {
//       "50ml": { price: 600, stock: 48 },
//       "100ml": { price: 1150, stock: 40 },
//       "150ml": { price: 1700, stock: 28 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Protein Conditioner",
//     category: "Conditioners",
//     description: "Protein treatment for damaged hair",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 39,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 750, stock: 36 },
//       "100ml": { price: 1450, stock: 28 },
//       "150ml": { price: 2100, stock: 16 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Biotin Conditioner",
//     category: "Conditioners",
//     description: "Biotin-infused for hair strength",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 46,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 820, stock: 32 },
//       "100ml": { price: 1600, stock: 24 },
//       "150ml": { price: 2350, stock: 12 }
//     },
//     sale: { isOnSale: true, percentage: 18 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Rosemary Conditioner",
//     category: "Conditioners",
//     description: "Rosemary extract for scalp health",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 33,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 680, stock: 40 },
//       "100ml": { price: 1320, stock: 32 },
//       "150ml": { price: 1950, stock: 20 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Dry Hair Conditioner",
//     category: "Conditioners",
//     description: "Intensive moisture for very dry hair",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 37,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 720, stock: 38 },
//       "100ml": { price: 1400, stock: 30 },
//       "150ml": { price: 2050, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Sulfate-Free Conditioner",
//     category: "Conditioners",
//     description: "Gentle conditioner for daily use",
//     images: [
//       "https://images.unsplash.com/photo-1631730319945-12a764138ed1?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 30,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 700, stock: 42 },
//       "100ml": { price: 1350, stock: 34 },
//       "150ml": { price: 2000, stock: 22 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },

//   // STYLING (20 products)
//   {
//     name: "Volume Boost Styling Gel",
//     category: "Styling",
//     description: "Strong hold styling gel for volume and long-lasting hairstyles",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 23,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 550, stock: 35 },
//       "100ml": { price: 1000, stock: 25 },
//       "150ml": { price: 1450, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 20 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Hair Spray Strong Hold",
//     category: "Styling",
//     description: "Long-lasting strong hold hair spray",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 34,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 600, stock: 40 },
//       "100ml": { price: 1150, stock: 32 },
//       "150ml": { price: 1700, stock: 20 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Texturizing Spray",
//     category: "Styling",
//     description: "Adds texture and volume to hair",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 41,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 650, stock: 38 },
//       "100ml": { price: 1250, stock: 30 },
//       "150ml": { price: 1850, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Pomade Classic",
//     category: "Styling",
//     description: "Classic pomade for sleek styles",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 28,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 580, stock: 42 },
//       "100ml": { price: 1120, stock: 35 },
//       "150ml": { price: 1650, stock: 22 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Hair Wax Matte Finish",
//     category: "Styling",
//     description: "Matte finish hair wax for natural look",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 36,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 620, stock: 40 },
//       "100ml": { price: 1200, stock: 32 },
//       "150ml": { price: 1750, stock: 20 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Sea Salt Spray",
//     category: "Styling",
//     description: "Beachy waves sea salt spray",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 45,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 550, stock: 45 },
//       "100ml": { price: 1050, stock: 38 },
//       "150ml": { price: 1550, stock: 25 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Heat Protectant Spray",
//     category: "Styling",
//     description: "Protects hair from heat styling",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 52,
//     rating: 4.9,
//     sizes: {
//       "50ml": { price: 680, stock: 42 },
//       "100ml": { price: 1300, stock: 34 },
//       "150ml": { price: 1900, stock: 22 }
//     },
//     sale: { isOnSale: true, percentage: 18 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Curl Defining Cream",
//     category: "Styling",
//     description: "Defines and enhances natural curls",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 39,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 700, stock: 38 },
//       "100ml": { price: 1350, stock: 30 },
//       "150ml": { price: 2000, stock: 18 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Anti-Frizz Serum",
//     category: "Styling",
//     description: "Controls frizz and adds shine",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 47,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 750, stock: 36 },
//       "100ml": { price: 1450, stock: 28 },
//       "150ml": { price: 2100, stock: 16 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Hair Mousse Volume",
//     category: "Styling",
//     description: "Lightweight mousse for volume",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 31,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 520, stock: 48 },
//       "100ml": { price: 1000, stock: 40 },
//       "150ml": { price: 1480, stock: 28 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Edge Control Gel",
//     category: "Styling",
//     description: "Strong hold for baby hairs and edges",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 43,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 450, stock: 55 },
//       "100ml": { price: 850, stock: 48 },
//       "150ml": { price: 1250, stock: 35 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Hair Cream Smoothing",
//     category: "Styling",
//     description: "Smoothing cream for sleek styles",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 29,
//     rating: 4.2,
//     sizes: {
//       "50ml": { price: 580, stock: 44 },
//       "100ml": { price: 1120, stock: 36 },
//       "150ml": { price: 1650, stock: 24 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Dry Texture Spray",
//     category: "Styling",
//     description: "Adds instant texture and grit",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 38,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 620, stock: 40 },
//       "100ml": { price: 1200, stock: 32 },
//       "150ml": { price: 1750, stock: 20 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Hair Oil Shine Spray",
//     category: "Styling",
//     description: "Adds instant shine and gloss",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 35,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 650, stock: 38 },
//       "100ml": { price: 1250, stock: 30 },
//       "150ml": { price: 1850, stock: 18 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Braiding Gel",
//     category: "Styling",
//     description: "Strong hold gel for braids",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 27,
//     rating: 4.1,
//     sizes: {
//       "50ml": { price: 500, stock: 50 },
//       "100ml": { price: 950, stock: 42 },
//       "150ml": { price: 1400, stock: 30 }
//     },
//     sale: { isOnSale: true, percentage: 8 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Hair Clay Matte",
//     category: "Styling",
//     description: "Matte clay for textured styles",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 32,
//     rating: 4.3,
//     sizes: {
//       "50ml": { price: 600, stock: 42 },
//       "100ml": { price: 1150, stock: 34 },
//       "150ml": { price: 1700, stock: 22 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Root Lift Spray",
//     category: "Styling",
//     description: "Lifts roots for instant volume",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 44,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 580, stock: 44 },
//       "100ml": { price: 1120, stock: 36 },
//       "150ml": { price: 1650, stock: 24 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Finishing Spray",
//     category: "Styling",
//     description: "Locks style in place all day",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 37,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 620, stock: 40 },
//       "100ml": { price: 1200, stock: 32 },
//       "150ml": { price: 1750, stock: 20 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Curl Activator",
//     category: "Styling",
//     description: "Activates and defines curls",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 41,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 680, stock: 36 },
//       "100ml": { price: 1320, stock: 28 },
//       "150ml": { price: 1950, stock: 16 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Hair Perfume",
//     category: "Styling",
//     description: "Fragrance spray for fresh hair",
//     images: [
//       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 48,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 750, stock: 35 },
//       "100ml": { price: 1450, stock: 28 },
//       "150ml": { price: 2100, stock: 15 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },

//   // SERUMS (15 products)
//   {
//     name: "Argan Oil Serum",
//     category: "Serums",
//     description: "Lightweight argan serum for shine and repair",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 52,
//     rating: 4.9,
//     sizes: {
//       "50ml": { price: 850, stock: 32 },
//       "100ml": { price: 1600, stock: 25 },
//       "150ml": { price: 2350, stock: 15 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Keratin Repair Serum",
//     category: "Serums",
//     description: "Keratin serum for damaged hair repair",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 44,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 780, stock: 36 },
//       "100ml": { price: 1500, stock: 28 },
//       "150ml": { price: 2200, stock: 16 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Hair Growth Serum",
//     category: "Serums",
//     description: "Stimulates hair growth and thickness",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 58,
//     rating: 4.9,
//     sizes: {
//       "50ml": { price: 950, stock: 28 },
//       "100ml": { price: 1800, stock: 22 },
//       "150ml": { price: 2600, stock: 12 }
//     },
//     sale: { isOnSale: true, percentage: 18 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Color Protect Serum",
//     category: "Serums",
//     description: "Protects color-treated hair from fading",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 36,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 820, stock: 34 },
//       "100ml": { price: 1600, stock: 26 },
//       "150ml": { price: 2350, stock: 14 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Anti-Frizz Serum",
//     category: "Serums",
//     description: "Tames frizz and flyaways",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 47,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 750, stock: 38 },
//       "100ml": { price: 1450, stock: 30 },
//       "150ml": { price: 2100, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Heat Protection Serum",
//     category: "Serums",
//     description: "Protects from heat styling damage",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 51,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 800, stock: 35 },
//       "100ml": { price: 1550, stock: 28 },
//       "150ml": { price: 2250, stock: 16 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Split End Serum",
//     category: "Serums",
//     description: "Mends and prevents split ends",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 42,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 720, stock: 40 },
//       "100ml": { price: 1400, stock: 32 },
//       "150ml": { price: 2050, stock: 20 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Shine Enhancing Serum",
//     category: "Serums",
//     description: "Adds mirror-like shine to hair",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 38,
//     rating: 4.5,
//     sizes: {
//       "50ml": { price: 680, stock: 42 },
//       "100ml": { price: 1300, stock: 34 },
//       "150ml": { price: 1900, stock: 22 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Scalp Treatment Serum",
//     category: "Serums",
//     description: "Soothes and treats scalp issues",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 45,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 850, stock: 33 },
//       "100ml": { price: 1600, stock: 25 },
//       "150ml": { price: 2350, stock: 15 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   },
//   {
//     name: "Biotin Serum",
//     category: "Serums",
//     description: "Biotin enriched for hair strength",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 49,
//     rating: 4.8,
//     sizes: {
//       "50ml": { price: 880, stock: 30 },
//       "100ml": { price: 1700, stock: 24 },
//       "150ml": { price: 2450, stock: 14 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Rosemary Hair Serum",
//     category: "Serums",
//     description: "Rosemary infusion for scalp health",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 40,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 780, stock: 36 },
//       "100ml": { price: 1500, stock: 28 },
//       "150ml": { price: 2200, stock: 16 }
//     },
//     sale: { isOnSale: true, percentage: 12 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Niacinamide Serum",
//     category: "Serums",
//     description: "Niacinamide for hair thickening",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 35,
//     rating: 4.4,
//     sizes: {
//       "50ml": { price: 820, stock: 34 },
//       "100ml": { price: 1600, stock: 26 },
//       "150ml": { price: 2350, stock: 14 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: false
//   },
//   {
//     name: "Moisture Lock Serum",
//     category: "Serums",
//     description: "Locks in moisture for dry hair",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 43,
//     rating: 4.6,
//     sizes: {
//       "50ml": { price: 720, stock: 38 },
//       "100ml": { price: 1400, stock: 30 },
//       "150ml": { price: 2050, stock: 18 }
//     },
//     sale: { isOnSale: true, percentage: 10 },
//     isNewArrival: true,
//     isFeatured: false
//   },
//   {
//     name: "Olaplex Style Serum",
//     category: "Serums",
//     description: "Bond building serum for damaged hair",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 54,
//     rating: 4.9,
//     sizes: {
//       "50ml": { price: 1200, stock: 22 },
//       "100ml": { price: 2300, stock: 16 },
//       "150ml": { price: 3350, stock: 8 }
//     },
//     sale: { isOnSale: false, percentage: 0 },
//     isNewArrival: false,
//     isFeatured: true
//   },
//   {
//     name: "Night Repair Serum",
//     category: "Serums",
//     description: "Overnight treatment for hair repair",
//     images: [
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop",
//       "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop"
//     ],
//     status: "active",
//     likes: 46,
//     rating: 4.7,
//     sizes: {
//       "50ml": { price: 900, stock: 30 },
//       "100ml": { price: 1750, stock: 24 },
//       "150ml": { price: 2500, stock: 12 }
//     },
//     sale: { isOnSale: true, percentage: 15 },
//     isNewArrival: true,
//     isFeatured: true
//   }
// ];
