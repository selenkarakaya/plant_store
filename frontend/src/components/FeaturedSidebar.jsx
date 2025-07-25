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
      <section
        className="bg-[url('https://res.cloudinary.com/de4kodlhk/image/upload/v1752694815/Green_Minimalist_House_Plant_Store_Facebook_Cover_zwbon2.png')] bg-cover bg-center h-64 sm:h-[36rem] rounded-lg shadow-lg relative"
        aria-label="Houseplants & Indoor Plants delivery banner"
      >
        <div className="absolute inset-0 w-full sm:w-1/2 px-6 sm:px-10 flex flex-col items-center sm:items-start justify-center gap-y-4 text-primary text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold">
            Houseplants & Indoor Plants Delivered
          </h1>
          <p className="font-semibold max-w-md">
            We are the UK Houseplant & Indoor Plant specialists. Huge range of
            Houseplants & Indoor Plants on sale with fast delivery.
          </p>
          <button
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
            aria-label="Shop Houseplants On Sale"
          >
            Houseplants On Sale
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <header className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            Houseplant & Indoor Plant Delivery
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            Over 250,000 Indoor Plants Delivered
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
          <article className="flex-1 bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4" role="img" aria-label="Plant emoji">
              🪴
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Step 1 | Buy Houseplants Online
            </h3>
            <p className="text-gray-600">
              The first step to buy houseplants online is to pick your perfect
              houseplant.
              <br />
              We have a huge selection!
            </p>
          </article>
          <article className="flex-1 bg-white rounded-lg shadow-lg p-6 text-center">
            <div
              className="text-4xl mb-4"
              role="img"
              aria-label="Package emoji"
            >
              📦
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Step 2 | Your Order is Packed
            </h3>
            <p className="text-gray-600">
              We will pack your houseplants carefully with our eco packaging and
              send you tracking information.
            </p>
          </article>
          <article className="flex-1 bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-4xl mb-4" role="img" aria-label="Truck emoji">
              🚚
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Step 3 | Houseplants Delivered
            </h3>
            <p className="text-gray-600">
              Over 95% of our orders are delivered within 1–3 working days.
              <br />
              You can track your order from start to finish.
            </p>
          </article>
        </div>
      </section>

      <section
        className="relative h-64 sm:h-[36rem] rounded-lg shadow-lg overflow-hidden"
        aria-label="Image slider showcasing indoor plants"
      >
        <div
          className="absolute inset-y-0 left-0 w-full sm:w-1/2 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${bgImagesPairs[currentIndex][0]})` }}
        ></div>

        <div
          className="absolute inset-y-0 right-0 w-full sm:w-1/2 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${bgImagesPairs[currentIndex][1]})` }}
        ></div>

        <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-4">
          <p className="text-white text-xl sm:text-2xl font-semibold z-10 uppercase text-center">
            Elevate Your Space with Plants
          </p>
        </div>
      </section>
    </>
  );
}

export default FeaturedSidebar;
