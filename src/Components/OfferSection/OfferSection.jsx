import React from "react";
import { Link } from "react-router";
import { FaGift, FaTrophy, FaLeaf } from "react-icons/fa";

const OfferSection = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 py-12 px-4 rounded-xl shadow-lg mt-8 max-w-6xl mx-auto">
      <div className="text-center">
        <div className="flex justify-center text-5xl text-yellow-500 mb-4">
          <FaGift />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
          🎁 Special Offer Just for You!
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6 text-lg">
          Track <span className="font-bold text-primary">10 items</span> this month and unlock exclusive tips, eco-badges, and food-saving rewards.
        </p>
        <div className="flex justify-center gap-6 mb-6 text-xl text-primary">
          <div className="flex flex-col items-center">
            <FaTrophy className="text-3xl mb-1" />
            <span>Earn Badges</span>
          </div>
          <div className="flex flex-col items-center">
            <FaLeaf className="text-3xl mb-1" />
            <span>Eco Tips</span>
          </div>
          <div className="flex flex-col items-center">
            <FaGift className="text-3xl mb-1" />
            <span>Exclusive Rewards</span>
          </div>
        </div>
        <Link to="/fridge" className="btn btn-primary btn-lg shadow-md hover:scale-105 transition">
          Explore Now
        </Link>
      </div>
    </section>
  );
};

export default OfferSection;
