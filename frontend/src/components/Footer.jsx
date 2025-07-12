// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Bölüm 1: Başlıklar */}
        <div>
          <h3 className="font-bold mb-3">
            Amazing Houseplants & Indoor Plants
          </h3>
          <ul className="space-y-1 text-sm">
            <li>Houseplants & Indoor Plants</li>
            <li>Houseplants & Indoor Plants On Sale</li>
            <li>A-Z Indoor Plants List</li>
            <li>The Best Indoor Plants</li>
            <li>Perfect Houseplants for Under £50</li>
            <li>Perfect Houseplants for Under £30</li>
            <li>Houseplant Gift Cards</li>
            <li>Indoor Plant Care Guides</li>
          </ul>
        </div>

        {/* Bölüm 2: Arama ve şirket bilgileri */}
        <div>
          <h3 className="font-bold mb-3">Search & Company Info</h3>
          <ul className="space-y-1 text-sm">
            <li>Search</li>
            <li>Company Information</li>
            <li>Contact Us</li>
            <li>Delivery Information</li>
            <li>Frequently Asked Questions</li>
            <li>Trade Plants</li>
            <li>Payment Information</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Policies & Terms</h3>
          <ul className="space-y-1 text-sm">
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Terms of Service</li>
            <li>Terms and Conditions</li>
            <li>About Selen’s Greenery</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">About Us</h3>
          <p className="text-sm mb-4">
            We sell a huge range of quality Houseplants and Indoor Plants with
            UK delivery. Browse our amazing selection of rare and unusual
            plants, air plants, ferns, orchids & succulents. All Houseplants are
            packed with love and come with our Houseplant promise of unbeatable
            quality.
          </p>
          <p className="font-semibold text-green-700">
            WE ARE 4.7/5 RATED "EXCELLENT"
          </p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Selen’sGreenery.co.uk. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
