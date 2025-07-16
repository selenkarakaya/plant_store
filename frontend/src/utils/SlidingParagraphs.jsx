import React, { useEffect, useState } from "react";

export default function AutoSlidingParagraphs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const texts = [
    {
      text: "🌿 Bring life to your home with beautiful plants.",
      bg: "bg-orange",
    },
    {
      text: "🌞 Creating a natural atmosphere is easier than ever!",
      bg: "bg-primary",
    },
    {
      text: "🪴 Discover the most popular pots now.",
      bg: "bg-terracotta",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative w-full h-20 overflow-hidden border border-gray-300 ${texts[activeIndex].bg}`}
    >
      {texts.map((text, index) => (
        <p
          key={index}
          className={`absolute top-1/2 -translate-y-1/2 w-full text-center uppercase text-white text-lg transition-all duration-5000 ease-in-out  px-4 ${
            index === activeIndex
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0"
          }`}
        >
          {text.text}
        </p>
      ))}
    </div>
  );
}
