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
  Loader2,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useApi } from "@/app/context/ApiContext";

export const dynamic = "force-dynamic"; // ✅ Ensures no static caching on Vercel

export default function FoodSearchMobile() {
  const { baseUrl } = useApi();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState(null);

  const selectedCategory = searchParams.get("category");

  // ✅ Ensure client hydration before running effects
  useEffect(() => setHydrated(true), []);

  // ✅ Fetch foods based on category or search query
  useEffect(() => {
    if (!hydrated) return; // wait for hydration

    const fetchFoods = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (query) params.q = query;

        const res = await axios.get(`${baseUrl}/search/food/search`, {
          params,
        });

        setFoods(res.data.data || []);
        if (selectedCategory) setActiveCategory(selectedCategory);
      } catch (err) {
        console.error("Fetch Foods Error:", err);
        setError("Failed to load foods. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [baseUrl, hydrated, selectedCategory, query]);

  // ✅ Handle category click and update URL
  const handleCategoryClick = async (category) => {
    setActiveCategory(category);
    setQuery("");

    router.push(`?category=${encodeURIComponent(category)}`);
  };

  // ✅ Search manually
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/search/food/search`, {
        params: { q: query },
      });
      setFoods(res.data.data || []);
      setActiveCategory("");
      router.push("?"); // clear category param
    } catch (err) {
      console.error("Search Error:", err);
      setError("Search failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Rice Dishes",
    "Swallow",
    "Grilled",
    "Soups",
    "Pasta",
    "Snacks",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 p-3">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for food..."
            className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600 transition-colors"
          >
            <SlidersHorizontal size={18} />
          </button>
        </form>

        {/* Categories */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-3 pb-3 mt-2">
          {categories.map((category) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap border transition-colors ${
                activeCategory === category
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              <Flame
                size={16}
                className={
                  activeCategory === category
                    ? "text-white"
                    : "text-orange-500"
                }
              />
              <span className="text-sm font-medium">{category}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin mb-2" size={24} />
            Loading foods...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : foods.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No foods found{selectedCategory ? ` in ${selectedCategory}` : ""}.
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
            >
              {foods.map((food, index) => (
                <motion.div
                  key={food._id || index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
                >
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <img
                    src={food.images?.[0]?.url || "/placeholder.jpg"}
                    alt={food.name}
                    className="w-full h-30 object-cover rounded-md"
                  />
                  </div>
                  <h3 className="font-medium text-gray-800 truncate">
                    {food.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {food.description || "Delicious meal"}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-orange-500">
                      ₦{food.price?.toLocaleString() || "—"}
                    </span>
                    <MapPin size={14} className="text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bottom Vendor Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-orange-500 text-white rounded-full p-4 shadow-lg hover:bg-orange-600 transition-colors">
          <Store size={22} />
        </button>
      </div>
    </div>
  );
}
