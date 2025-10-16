"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";

export default function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data (like from your backend)
    setTimeout(() => {
      setFoods([
        {
          id: 1,
          name: "Jollof Rice & Chicken",
          price: 2500,
          rating: 4.8,
          image: "/foods/jollof.jpeg",
        },
        {
          id: 2,
          name: "Efo Riro & Pounded Yam",
          price: 3000,
          rating: 4.9,
          image: "/images/efo-riro.jpg",
        },
        {
          id: 3,
          name: "Shawarma Deluxe",
          price: 2000,
          rating: 4.7,
          image: "/images/shawarma.jpg",
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="font-semibold text-lg mb-3 text-gray-800">
          Popular Near You
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <Skeleton height={120} />
              <div className="p-2">
                <Skeleton width="80%" height={16} />
                <Skeleton width="40%" height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
      className="mt-8"
    >
      <h2 className="font-semibold text-lg mb-3 text-gray-800">
        Popular Near You
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {foods.map((food) => (
          <motion.div
            key={food.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={food.image}
              alt={food.name}
              className="h-32 w-full object-cover"
            />
            <div className="p-2">
              <h3 className="font-medium text-sm text-gray-800">{food.name}</h3>
              <p className="text-[#FF6B00] font-semibold text-sm">
                ₦{food.price.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">⭐ {food.rating}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
