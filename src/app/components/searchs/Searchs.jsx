"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  MapPin,
  Search,
  SlidersHorizontal,
  Store,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import AddressModal from "../modals/AddressModal";
import HomeFoodListSkeleton from "../skeletons/HomeFoodListSkeleton";
import { useUserStorage } from "@/app/hooks/useUserStorage";
import NoFoodsFound from "../food/NoFoodsFound";
import { useApi } from "@/app/context/ApiContext";
import Header2 from "../App_Header/Header2";

import Link from 'next/link';

export default function FoodSearchMobile() {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [trending, setTrending] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const { baseUrl } = useApi();
  const router = useRouter();
  const { user, updateUser } = useUserStorage();

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  // 🧩 Show address modal if user has no city
  useEffect(() => {
    if (!user?.user?.address?.city) {
      setShowAddressModal(true);
    }
  }, [user]);

  // ✅ Address update handler
  const handleAddressUpdate = async (address) => {
    try {
      setUpdating(true);

      const res = await fetch(`${baseUrl}/user/auth/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ addresses: [address] }), // ✅ push as array
      });

      const data = await res.json();
      console.log("Update response:", data);

      if (!data.success) throw new Error(data.message || "Failed to update");

      toast.success("Address updated successfully!");

      updateUser(data); // ✅ sync user data
      window.location.reload(); // reload foods based on city
    } catch (err) {
      toast.error(err.message || "Error updating address");
    } finally {
      setUpdating(false);
    }
  };


  // ✅ All categories (same as before)
  const allCategories = [
    "Rice Dishes",
    "Swallow",
    "Soups & Stews",
    "Beans Dishes",
    "Yam Dishes",
    "Plantain Dishes",
    "Pasta",
    "Snacks",
    "Grills & Barbecue",
    "Shawarma",
    "Breakfast",
    "Drinks",
    "Desserts",
    "Seafood",
    "Vegetarian",
    "Salads",
    "Small Chops",
    "Porridge",
    "Native Delicacies",
    "Others",
  ];

  const getCategoryIcon = (cat) => {
    const c = cat.toLowerCase();

    const categoryImages = {
      "rice dishes": "/category/rice.jpeg",
      swallow: "/category/swallow.jpg",
      "soups & stews": "/category/soup.jpg",
      "beans dishes": "/category/beans.jpg",
      "yam dishes": "/category/yam.jpg",
      "plantain dishes": "/category/plantain.jpg",
      pasta: "/category/pasta.jpg",
      snacks: "/category/snack.jpg",
      "grills & barbecue": "/category/grill.jpg",
      shawarma: "/category/shawarma.jpg",
      drinks: "/category/drinks.jpg",
      "small chops": "/category/smallchops.jpg",
      porridge: "/category/porridge.jpg",
      "native delicacies": "/category/native.jpg",
      others: "/category/others.jpg",
    };

    const matchedKey = Object.keys(categoryImages).find((key) =>
      c.includes(key)
    );

    const imageSrc =
      matchedKey ? categoryImages[matchedKey] : "/category/default.jpg";

    return (
      <img
        src={imageSrc}
        alt={cat}
        className="w-8 h-8 object-cover rounded-full group-hover:border-orange-500 transition-all duration-300"
      />
    );
  };

  // ✅ Fetch all foods
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        let res;

        if (selectedCategory) {
          res = await axios.get(`${baseUrl}/search/food/search`, {
            params: { category: selectedCategory },
          });
          setActiveCategory(selectedCategory);
        } else {
          res = await axios.get(`${baseUrl}/search/food/search`, {
            params: { q: "" },
          });
        }

        setFoods(res.data.data || []);
      } catch (err) {
        console.error("Fetch Foods Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [baseUrl, selectedCategory]);

  // ✅ Fetch trending
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`${baseUrl}/search/food/trending`, {
          params: { limit: 8 },
        });
        setTrending(res.data.trending || []);
      } catch (err) {
        console.error("Trending Error:", err);
      }
    };
    fetchTrending();
  }, [baseUrl]);

  // ✅ Handle typing
  useEffect(() => {
    const fetchSearch = async () => {
      if (query.trim() === "") {
        try {
          setLoading(true);
          const res = await axios.get(`${baseUrl}/search/food/search`, {
            params: { q: "" },
          });
          setFoods(res.data.data || []);
          setActiveCategory("");
        } catch (err) {
          console.error("Reset Foods Error:", err);
        } finally {
          setLoading(false);
        }
        return;
      }

      if (query.length >= 2) {
        try {
          setLoading(true);
          const res = await axios.get(`${baseUrl}/search/food/autocomplete`, {
            params: { q: query },
          });
          setFoods(res.data.suggestions || []);
          setActiveCategory("");
        } catch (err) {
          console.error("Autocomplete Error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    const timeout = setTimeout(fetchSearch, 300);
    return () => clearTimeout(timeout);
  }, [query, baseUrl]);

  // ✅ Category handler
  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setQuery("");
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/search/food/search`, {
        params: { category },
      });
      setFoods(res.data.data || []);
    } catch (err) {
      console.error("Category Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Trending click
  const handleTrendingClick = async (term) => {
    setQuery(term);
    setActiveCategory("");
    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/search/food/autocomplete`, {
        params: { q: term },
      });
      setFoods(res.data.suggestions || []);
    } catch (err) {
      console.error("Trending Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Header2 />
      <Toaster position="top-center" />
      <div className="flex flex-col p-2 space-y-4">

      {/* 🏠 Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={handleAddressUpdate}
        loading={updating}
      />
        {/* 🔍 Search Input */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="relative"
        >
          <Search
            className="text-gray-400 absolute top-4 left-2"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for food, categories or vendor..."
            className="w-full rounded-xl p-3 pl-8 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SlidersHorizontal
            className="text-gray-500 absolute top-4 right-3"
            size={20}
          />
        </motion.div>

        {/* 🔥 Trending */}
        {trending.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Flame className="text-orange-500" /> Trending Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {trending.map((trend) => (
                <motion.button
                  key={trend._id}
                  onClick={() => handleTrendingClick(trend.term)}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1.5 rounded-full text-sm hover:bg-orange-100"
                >
                  {trend.term}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* 🍽️ Categories */}
        <div className="flex overflow-x-auto scroll gap-3 no-scrollbar pt-2 pb-1 px-1">
          {allCategories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              whileTap={{ scale: 0.95 }}
              className={`group flex flex-col items-center justify-center min-w-[85px] px-1 py-2 rounded-2xl shadow-sm border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-orange-500 text-white border-orange-500 scale-105 shadow-md"
                  : "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100"
              }`}
            >
              {getCategoryIcon(cat)}
              <span
                className={`text-[11px] mt-2 font-semibold text-center leading-tight ${
                  activeCategory === cat ? "text-white" : "text-gray-700"
                }`}
              >
                {cat}
              </span>
            </motion.button>
          ))}
        </div>

        {/* 🍱 Food Results */}
        {loading ? (
          <HomeFoodListSkeleton />
        ) : foods.length === 0 ? (
          <NoFoodsFound />
        ) : (
          <div className="grid grid-cols-2 md:gap-4 gap-2">
            <Link href={`/food-details/${food._id}`}>  
              {foods.map((food) => (
                <motion.div key={food.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{   scale: 1.03,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
                  }} transition={{ duration: 0.25 }} className="bg-white p-3 rounded-xl scroll shadow-md cursor-pointer">
                  <div className="relative scroll rounded-md overflow-hidden">
                    <img
                      src={
                        Array.isArray(food?.images)
                          ? food.images[0]?.url
                          : food?.image || food?.image
                      }
                      alt={food?.name}
                      className="w-full h-36 object-cover rounded-md"
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-800 truncate">
                      {food.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">
                      <p className="flex items-center gap-1 text-sm font-medium text-gray-700 truncate">
                        <Store className="text-[#FF6600] w-4" />
                        {food?.vendor?.storeName || "Unknown Vendor"}
                      </p>
                    </div>

                    <p className=" text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin size={12} className="text-orange-500" />
                      {food?.vendor?.address
                        ? `${food.vendor.address.street}, ${food.vendor.address.city}, ${food.vendor.address.state}`
                        : "Address not available"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
