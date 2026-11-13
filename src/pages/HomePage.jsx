import { useStore } from '../hooks/useStore';
import Hero from '../components/home/Hero';
import CatalogSection from '../components/home/CatalogSection';
import CustomFurnitureContactSection from '../components/home/CustomFurnitureContactSection';

export default function HomePage() {
  const {
    products,
    searchQuery,
    setSearchQuery,
    formatPrice,
    navigateShop,
    navigateContact,
    navigateProduct,
    openWhatsAppOrder
  } = useStore();

  return (
    <>
      <Hero
        onExploreCollection={() => navigateShop('all')}
        onOpenWhatsAppConcierge={() => openWhatsAppOrder(null)}
      />
      <CatalogSection
        products={products}
        activeFilter="all"
        setActiveFilter={navigateShop}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        formatPrice={formatPrice}
        onOpenProductPage={navigateProduct}
      />
      <CustomFurnitureContactSection
        onOpenWhatsAppConcierge={navigateContact}
      />
    </>
  );
}
