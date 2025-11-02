"use client";

import { useFoods } from "@/app/hooks/useVendorFoodQuery";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Utensils, Clock } from "lucide-react";
import FoodDetailsModal from "../modals/FoodDetailsModal";
import HomeFoodListSkeleton from "../skeletons/HomeFoodListSkeleton";
import { useRouter } from "next/navigation";

export default function FoodList() {
  const { foods, isLoading } = useFoods();
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accent = "#FF6600";

  const router = useRouter()

  // Group foods by category
  const foodsByCategory = useMemo(() => {
    if (!foods?.data) return {};
    return foods.data.reduce((acc, food) => {
      const cat = food.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(food);
      return acc;
    }, {});
  }, [foods]);

  if (isLoading)
    return (
      <HomeFoodListSkeleton/>
    );

  return (
    <div className="space-y-3 flex-1 mt-2">
      {Object.entries(foodsByCategory).map(([category, foods]) => (
        <div key={category} className="space-y-3 bg-white md:p-3 p-2 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
          <div className="flex md:space-x-4 space-x-2 scroll overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth touch-pan-x">
            {foods.map((food) => (
              <motion.div
                key={food._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.25 }}
                className="bg-white p-2 rounded-md shadow-md min-w-[220px] cursor-pointer snap-start"
                onClick={() => router.push(`/food-details/${food._id}`)}
              >
                {/* Image */}
                <div className="relative rounded-md overflow-hidden">
                  <img
                    src={food.images?.[0]?.url || "/placeholder.jpg"}
                    alt={food.name}
                    className="w-full h-30 object-cover rounded-md"
                  />
                  <span
                    className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${
                      food.available
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {food.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-2">
                  <h3 className="truncate text-md font-semibold text-gray-800">
                    {food.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1 truncate">
                    {food.vendor?.storeName || "Unknown Store"}
                  </p>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} />
                      <span className="text-xs">
                        {food.rating} ({food.ratingCount})
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      ₦{(food.price || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Utensils size={12} /> {food.category || "Uncategorized"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {food.estimatedDeliveryTime} mins
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      <AnimatePresence>
        {selectedFoodId && (
          <FoodDetailsModal
            foodId={selectedFoodId}
            open={isModalOpen}
            setOpen={setIsModalOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
