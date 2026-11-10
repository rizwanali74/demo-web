# HUJRAH // حجره — Sculptural Living & Contemporary Objects

A minimal, high-aesthetic e-commerce experience inspired by the contemporary editorial style of [Forma Object](https://www.formaobject.com/). Tailored for high-end furniture, sculptural objects, and minimalist interior spaces with the provided **HUJRAH (حجره)** identity.

---

## ✨ Design & Features

- **Forma Object Minimal Aesthetic**: Crisp typography (clean modern sans-serif with tracked uppercase headings), generous gallery white space, subtle 1px borders, and fluid animations.
- **Brand Logo Integration**: Fitted with the official **HUJRAH // حجره** logo with custom furniture iconography.
- **Prestige Top Bar & Header**:
  - Live announcement bar with free UAE delivery progress notice
  - Multi-currency switcher: **AED**, **USD ($)**, and **EUR (€)**
  - Direct categories: *Shop All*, *Sofas*, *Chairs*, *Tables*, *Lighting*, *Objects*, and *Bespoke*
  - Expandable search overlay
  - Shopping bag drawer with counter badge
- **Curated Category Filter & Sort**: Instant pill filters for *All Objects*, *Sofas & Seating*, *Lounge Chairs*, *Tables*, *Lighting*, *Objects & Mirrors*, and *Ready to Ship*.
- **Interactive Product Cards**:
  - Neutral photography canvas with image zoom
  - Secondary image swap on hover
  - Available colorway swatches
  - Badges (*New Arrival*, *Bespoke Available*, *In Stock*, *Made to Order*)
  - Quick action buttons: **Pay Instant Buy**, **WhatsApp Order**, and **Add to Bag**
- **Product Detail / Quick View Modal**:
  - Multi-angle image gallery with thumbnail navigation
  - Finish / swatch picker
  - Quantity counter
  - Detailed architectural specifications matrix
- **"In Situ" Interactive Living Room Lookbook**: Clickable hotspots positioned on room furniture to inspect specifications and order directly.
- **Studio Philosophy & Trade Program**: Dedicated section for architects, hospitality, and custom residential commissions.
- **Slide-Over Shopping Bag Drawer**:
  - Dynamic Free Delivery progress bar (threshold: AED 1,500)
  - Quantity adjustment and line-item calculation
  - Express **Apple Pay** and **WhatsApp order checkout**

---

## 🗄️ Products Data Layer (`data.json`) & Future API Integration

All products, brand settings, and editorial stories are organized in:
1. `public/data.json` (served as static asset, loaded via client-side `fetch('/data.json')`)
2. `src/data/data.json` (fallback bundle for offline resilience)

### 🔌 How to connect your live API later:

In [src/App.jsx](file:///c:/Users/Rizwan%20Ali/Desktop/demo/src/App.jsx#L34-L48), the data is fetched inside the `useEffect` hook:

```javascript
useEffect(() => {
  async function loadCatalog() {
    try {
      // 🔄 Simply change '/data.json' to your live API endpoint:
      // const res = await fetch('https://api.yourdomain.com/v1/products');
      const res = await fetch('/data.json');
      if (res.ok) {
        const json = await res.json();
        setCatalogData(json);
        if (json.products && json.products.length > 0) {
          setProducts(json.products);
        }
      }
    } catch (err) {
      console.info('Fallback to local catalog:', err);
    }
  }
  loadCatalog();
}, []);
```

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
