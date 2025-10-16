"use client";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className=" flex items-center bg-white rounded-xl mt-4 shadow-sm p-3"
    >
      <Search className="text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search food or restaurants"
        className="flex-1 px-2 text-sm outline-none"
      />
      <SlidersHorizontal className="text-gray-500" size={20} />
    </motion.div>
  );
}
