"use client";
import { motion } from "framer-motion";

const banners = [
  {
    id: 1,
    text: "🍲 Get ₦1000 off your first order!",
    color: "bg-[#FF6B00]",
  },
  {
    id: 2,
    text: "🔥 Try our new spicy Jollof from The Place!",
    color: "bg-[#FFD580] text-gray-800",
  },
  {
    id: 3,
    text: "🛵 Fast delivery in under 30 minutes!",
    color: "bg-[#FF915A]",
  },
];

export default function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4 overflow-hidden"
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -250, right: 0 }}
        dragElastic={0.25}
        className="flex gap-4 px-3 mb-3 cursor-grab active:cursor-grabbing"
      >
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`${banner.color} text-white px-5 py-8 rounded-2xl min-w-[85%] font-semibold shadow-lg`}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-base leading-tight"
            >
              {banner.text}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
