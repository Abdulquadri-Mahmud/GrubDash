"use client";

import React from "react";
import HomeHeader from "../components/Home_Components/HomeHeader";
import SearchBar from "../components/Home_Components/SearchBar";
import CategoryList from "../components/Home_Components/Category";
import PromoBanner from "../components/Home_Components/PromoBanner";
import FoodList from "../components/Home_Components/FoodList";
import VendorList from "../components/Home_Components/VendorList";
import FeatureSlider from "../components/heroComponent/FeatureSlider";
import RecommendedList from "../components/Home_Components/RecommendedList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <HomeHeader />
      <div className="md:px-4 p-2">
        <SearchBar />
        <CategoryList />
        <PromoBanner />
        <VendorList />
        {/* <RecommendedList /> */}
        <FoodList />
        <FeatureSlider />
      </div>
    </div>
  );
}
