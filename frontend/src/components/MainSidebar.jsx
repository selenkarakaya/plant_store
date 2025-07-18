import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setSelectedCategoryId,
  fetchProductsByCategory,
} from "../features/products/productSlice";
import ProductListPage from "./ProductListPage";

function MainSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (categoryId) => {
    dispatch(setSelectedCategoryId(categoryId));
    dispatch(fetchProductsByCategory(categoryId));
    navigate(`/category/${categoryId}`);
  };
  return (
    <div>
      <div className="flex justify-between items-center gap-x-4 max-w-screen-xl mx-auto my-4">
        <div className="w-[60%] h-[40rem] flex items-end bg-[url('https://res.cloudinary.com/de4kodlhk/image/upload/v1752694832/Green_and_White_Simple_Plant_Shop_Instagram_Post_2_bzjbdc.png')] bg-cover bg-center"></div>
        <div className="w-[35%]">
          <h1 className="font-semibold my-2">
            Indoor Plants — Making Your Home Look Like a Jungle 🪴🌿
          </h1>
          <p className="text-right">
            Explore The Biggest, Greenest, Most Awesome Indoor Plants Collection
            Ever — Ready To Ship Fast Across The UK! Turn Your Space Into A
            Jungle Paradise 🌿✨
          </p>
          <div className="flex flex-col justify-center items-center my-6 gap-y-2">
            <button
              className="bg-orange w-1/2 py-2 hover:opacity-90"
              onClick={() => handleClick(6)}
            >
              All Indoor Plants
            </button>
            <button
              className="bg-orange w-1/2 py-2 hover:opacity-90"
              onClick={() => handleClick(8)}
            >
              Indoor Plants on Sale
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-y-2  mx-auto my-4 py-9 bg-primary text-lime-50">
        <h1 className="font-semibold">
          Bring Life & Vibes Into Your Home with Our Indoor Plants
        </h1>
        <h2>
          Transform Your Living Space into a Sanctuary of Nature, Peace, and
          Fresh Energy. Let the Green Leaves Whisper Calmness and the Vibrant
          Colors Inspire Your Everyday! 🍃🌞💚
        </h2>
      </div>
    </div>
  );
}

export default MainSidebar;
