import DiscountPopup from "../components/DiscountPopup";
import PopularProducts from "../components/PopularProducts";
import SlidingParagraphs from "../utils/SlidingParagraphs";
import MainSidebar from "../components/MainSidebar";

function Home() {
  return (
    <div>
      <SlidingParagraphs />
      <MainSidebar />
      <DiscountPopup />
      <PopularProducts />
    </div>
  );
}

export default Home;
