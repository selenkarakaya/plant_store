import ProductListPage from "./ProductListPage";
import DiscountPopup from "../components/DiscountPopup";
import Products from "../pages/Products";

function Home() {
  return (
    <div>
      <ProductListPage />
      <DiscountPopup />
    </div>
  );
}

export default Home;
