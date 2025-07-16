import DiscountPopup from "../components/DiscountPopup";
import PopularProducts from "../components/PopularProducts";
import SlidingParagraphs from "../utils/SlidingParagraphs";
import MainSidebar from "../components/MainSidebar";
import FeaturedSidebar from "../components/FeaturedSidebar";

function Home() {
  return (
    <div>
      <SlidingParagraphs />
      <MainSidebar />
      <DiscountPopup />
      <PopularProducts />
      <FeaturedSidebar />
    </div>
  );
}

export default Home;
