"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import { MapPin, Star } from "lucide-react";

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setVendors([
        {
          id: 1,
          name: "Mama Cass",
          location: "Ikeja, Lagos",
          rating: 4.5,
          image: "/foods/amala.jpeg",
        },
        {
          id: 2,
          name: "The Place",
          location: "Lekki Phase 1",
          rating: 4.7,
          image: "/foods/amala.jpeg",
        },
        {
          id: 3,
          name: "Ofada Spot",
          location: "Yaba, Lagos",
          rating: 4.3,
          image: "/foods/ofada.jpeg",
        },
        {
          id: 4,
          name: "Chicken Republic",
          location: "Surulere, Lagos",
          rating: 4.6,
          image: "/images/chicken-republic.jpg",
        },
        {
          id: 5,
          name: "Kiliman",
          location: "Ilupeju, Lagos",
          rating: 4.4,
          image: "/images/kiliman.jpg",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      setWidth(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth);
    }
  }, [vendors]);

  if (loading) {
    return (
      <div className="mt-8 px-3">
        <h2 className="font-semibold text-lg mb-3 text-gray-800">
          Top Restaurants
        </h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="min-w-[220px] rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <Skeleton height={120} />
              <div className="p-2">
                <Skeleton width="70%" height={16} />
                <Skeleton width="50%" height={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="mt-8 px-3 overflow-hidden"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="font-semibold text-lg mb-3 text-gray-800">
        Top Restaurants
      </h2>

      <motion.div
        ref={scrollRef}
        className="cursor-grab active:cursor-grabbing"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.15}
          className="flex gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm min-w-[220px] overflow-hidden hover:shadow-md"
            >
              <div className="relative">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="h-32 w-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-md text-gray-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={12} className="text-yellow-400" />
                  {vendor.rating}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 text-sm mb-1">
                  {vendor.name}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin size={12} className="mr-1" />
                  {vendor.location}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
