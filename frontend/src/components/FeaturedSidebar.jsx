import { useEffect, useState } from "react";

const bgImagesPairs = [
  [
    "https://res.cloudinary.com/de4kodlhk/image/upload/v1752694880/Green_Natural_Home_Plants_Photo_Collage_emznyf.png",
    "https://res.cloudinary.com/de4kodlhk/image/upload/v1752694852/Green_Simple_Furniture_Home_Photo_Collage_vhiif9.png",
  ],
  [
    "https://res.cloudinary.com/de4kodlhk/image/upload/v1752694852/Green_Simple_Furniture_Home_Photo_Collage_vhiif9.png",
    "https://res.cloudinary.com/de4kodlhk/image/upload/v1752694833/Green_and_White_Simple_Plant_Shop_Instagram_Post_4_jrst2l.png",
  ],
  [
    "https://res.cloudinary.com/de4kodlhk/image/upload/v1752694880/Green_Natural_Home_Plants_Photo_Collage_emznyf.png",
    "https://res.cloudinary.com/de4kodlhk/image/upload/v1752694844/Green_and_White_Simple_Plant_Shop_Instagram_Post_3_bywka6.png",
  ],
];

function FeaturedSidebar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bgImagesPairs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="bg-[url('https://res.cloudinary.com/de4kodlhk/image/upload/v1752694815/Green_Minimalist_House_Plant_Store_Facebook_Cover_zwbon2.png')] bg-cover bg-center h-[36rem] rounded-lg shadow-lg relative">
        <div className="absolute inset-0  w-1/2 px-10 flex flex-col items-center justify-center gap-y-4 text-primary">
          <h1 className="text-2xl font-bold">
            Houseplants & Indoor Plants Delivered
          </h1>
          <p className="font-semibold">
            We are the UK Houseplant & Indoor Plant specialists. Huge range of
            Houseplants & Indoor Plants on sale with fast delivery.
          </p>
          <button>Houseplants On Sale</button>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Houseplant & Indoor Plant Delivery
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            Over 250,000 Indoor Plants Delivered
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🪴</div>
            <h3 className="text-xl font-semibold mb-2">
              Step 1 | Buy Houseplants Online
            </h3>
            <p className="text-gray-600">
              The first step to buy houseplants online is to pick your perfect
              houseplant.
              <br />
              We have a huge selection!
            </p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">
              Step 2 | Your Order is Packed
            </h3>
            <p className="text-gray-600">
              We will pack your houseplants carefully with our eco packaging and
              send you tracking information.
            </p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-semibold mb-2">
              Step 3 | Houseplants Delivered
            </h3>
            <p className="text-gray-600">
              Over 95% of our orders are delivered within 1–3 working days.
              <br />
              You can track your order from start to finish.
            </p>
          </div>
        </div>
      </section>
      <section className="relative h-[36rem] rounded-lg shadow-lg overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-1/2 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${bgImagesPairs[currentIndex][0]})` }}
        ></div>

        <div
          className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${bgImagesPairs[currentIndex][1]})` }}
        ></div>

        {/* Üstteki siyah overlay ve yazı */}
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <p className="text-white text-2xl font-semibold z-10 uppercase">
            Elevate Your Space with Plants
          </p>
        </div>
      </section>
    </>
  );
}

export default FeaturedSidebar;
