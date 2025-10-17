"use client";
import { useState, useEffect } from "react";
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
  const [loadedImages, setLoadedImages] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false); // track page load

  // Mark page as loaded
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="mt-3 px-3">
      <h2 className="font-semibold text-shadow-2xs text-lg mb-3 text-gray-800">Categories</h2>
      <div className="scroll flex gap-3 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-3">
        {categories.map((cat) => (
          <div key={cat.id} className=" flex flex-col items-center bg-white shadow p-3 rounded-xl min-w-[80px] flex-shrink-0 snap-center">
            <div className="w-16 h-16 mb-1 relative">
              {/* Show skeleton until page is loaded and image is ready */}
              {!loadedImages[cat.id] && pageLoaded && (
                <Skeleton
                  width={64}
                  height={64}
                  circle
                  className="absolute top-0 left-0 animate-pulse"
                />
              )}
              {pageLoaded && (
                <img
                  src={cat.icon}
                  alt={cat.name}
                  onLoad={() => handleImageLoad(cat.id)}
                  className={`w-16 h-16 rounded-full object-cover transition-opacity duration-500 absolute top-0 left-0 ${
                    loadedImages[cat.id] ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                />
              )}
            </div>
            <span className="text-xs font-medium text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
