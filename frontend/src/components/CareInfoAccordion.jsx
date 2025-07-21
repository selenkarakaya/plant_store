import React, { useState } from "react";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-green-800 hover:text-green-600"
      >
        {title}
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          ▶
        </span>
      </button>
      {isOpen && <div className="pb-4 text-gray-700">{children}</div>}
    </div>
  );
};

const CareInfoAccordion = () => {
  return (
    <div className="w-full mx-auto my-2 p-4 bg-white rounded shadow-md">
      <AccordionItem title="Care Instructions">
        <p>
          Each houseplant requires different levels of care so every order is
          shipped with a handy care guide. For a few quick tips on how to care
          for Hawaii Palm | Hard To Find follow me!
        </p>
        <p className="mt-2">
          Need further help? We have lots of handy guides dedicated to Indoor
          Plant Care.
        </p>
      </AccordionItem>

      <AccordionItem title="14 Day Freshness Guarantee">
        <p>
          We only deliver the highest quality houseplants & indoor plants. We
          are so confident in our plants we give them a 14 day freshness
          guarantee.
        </p>
      </AccordionItem>

      <AccordionItem title="Shipping & Returns">
        <p>Over 90% of our orders are delivered within 1-2 working day.</p>
        <p className="mt-2">
          All of our products are shipped on an express delivery service which
          can be tracked as soon as it has been despatched. We use a number of
          different couriers to give you the best possible experience.
          <br />
          <a href="#" className="text-green-600 underline">
            Delivery Information
          </a>
        </p>
      </AccordionItem>

      <AccordionItem title="Delivery Charges">
        <p>Our gift boxes and mystery boxes include free delivery.</p>
        <p className="mt-2">
          For all other orders, our delivery charges are set out below.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Orders under £20 | £7.99</li>
          <li>Orders £20 - £50 | £4.99</li>
          <li>Orders over £50 | FREE DELIVERY</li>
        </ul>
      </AccordionItem>
    </div>
  );
};

export default CareInfoAccordion;
