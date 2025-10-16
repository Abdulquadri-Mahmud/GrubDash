"use client";
import { motion } from "framer-motion";
import { Drumstick, Sandwich, Pizza, Coffee, Utensils } from "lucide-react";

const categories = [
  { id: 1, name: "Rice", icon: <Utensils /> },
  { id: 2, name: "Swallow", icon: <Drumstick /> },
  { id: 3, name: "Shawarma", icon: <Sandwich /> },
  { id: 4, name: "Snacks", icon: <Pizza /> },
  { id: 5, name: "Drinks", icon: <Coffee /> },
  { id: 6, name: "Local", icon: <Utensils /> },
];

export default function CategoryList() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 overflow-hidden"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 0 }}
        dragElastic={0.2}
        className="flex gap-4 px-2 mb-3 cursor-grab active:cursor-grabbing"
      >
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center bg-white shadow p-3 rounded-xl min-w-[80px]"
            transition={{ delay: index * 0.05 }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-3 bg-orange-100 text-[#FF6B00] rounded-full mb-1"
            >
              {cat.icon}
            </motion.div>
            <span className="text-xs font-medium text-gray-700">
              {cat.name}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
