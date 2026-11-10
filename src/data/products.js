// Data layer for HUJRAH // حجره
// Loads from local JSON, ready for external API replacement
import data from './data.json';

export const BRAND = data.brand;
export const CATEGORIES = data.categories;
export const PRODUCTS = data.products;
export const EDITORIAL_STORIES = data.editorialStories;

/**
 * Async API simulator / Loader:
 * Later, simply replace the fetch URL with your production endpoint:
 * e.g., const response = await fetch('https://api.yourdomain.com/products');
 */
export async function getCatalogData() {
  try {
    const res = await fetch('/data.json');
    if (res.ok) {
      const json = await res.json();
      return json;
    }
  } catch (err) {
    console.warn('Fallback to local bundled data:', err);
  }
  return data;
}

export default data;
