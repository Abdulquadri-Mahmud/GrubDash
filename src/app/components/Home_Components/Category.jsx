"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const categories = [
  { id: 1, name: "Rice", icon: "/category/rice.jpeg" },
  { id: 2, name: "Swallow", icon: "/category/swallow.jpg" },
  { id: 3, name: "Shawarma", icon: "/category/shawarma.jpg" },
  { id: 4, name: "Snacks", icon: "/category/snacks.webp" },
  { id: 5, name: "Drinks", icon: "/category/drinks.jpg" },
  { id: 6, name: "Local", icon: "/category/rice.jpeg" },
];

export default function CategoryList() {
  const scrollRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [appLoaded, setAppLoaded] = useState(false); // Track when the app is fully loaded

  // Set app as loaded once component mounts
  useEffect(() => {
    setAppLoaded(true);
    if (scrollRef.current) {
      setWidth(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth);
    }
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-3 overflow-hidden"
    >
      <motion.div
        ref={scrollRef}
        drag="x"
        dragConstraints={{ left: -width, right: 0 }}
        dragElastic={0.2}
        className="scroll flex gap-4 px-2 pb-2 cursor-grab active:cursor-grabbing overflow-x-auto scrollbar-none"
      >
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center bg-white shadow p-3 rounded-xl min-w-[80px] flex-shrink-0"
            transition={{ delay: index * 0.05 }}
          >
            <div className="relative w-12 h-12 mb-1">
              {/* Only load the image if the app is loaded */}
              {appLoaded ? (
                <>
                  {!loadedImages[cat.id] && (
                    <Skeleton
                      width={48}
                      height={48}
                      circle
                      className="absolute top-0 left-0 animate-pulse"
                    />
                  )}
                  <motion.img
                    src={cat.icon}
                    alt={cat.name}
                    onLoad={() => handleImageLoad(cat.id)}
                    onError={() => handleImageError(cat.id)}
                    className={`w-12 h-12 rounded-full object-cover transition-opacity duration-500 absolute top-0 left-0 ${
                      loadedImages[cat.id] ? "opacity-100" : "opacity-0"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  />
                </>
              ) : (
                // Show a skeleton before the app is loaded
                <Skeleton width={48} height={48} circle className="absolute top-0 left-0 animate-pulse" />
              )}
            </div>
            <span className="text-xs font-medium text-gray-700">{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
