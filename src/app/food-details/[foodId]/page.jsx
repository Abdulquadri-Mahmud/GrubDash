"use client";

import Header2 from "@/app/components/App_Header/Header2";
import AddToCartModal from "@/app/components/Cart/AddToCartModal";
import FoodDetailsSkeleton from "@/app/components/skeletons/FoodDetailsSkeleton";
import { motion } from "framer-motion";
import {
  X,
  Utensils,
  Star,
  Clock,
  Tag,
  Flame,
  ArrowLeft,
  Truck,
  ChevronRight,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";

export default function FoodDetails() {
  const [isClient, setIsClient] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { foodId } = useParams();
  const router = useRouter();
  const accent = "#FF6600";
  const dragRef = useRef(null);

  // ✅ Client-safe rendering
  useEffect(() => setIsClient(true), []);

  // ✅ Fetch food details directly from API
  useEffect(() => {
    const fetchFood = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://grub-dash-api.vercel.app/api/vendors/foods/get-food?id=${foodId}`
        );
        const result = await res.json();
        console.log("🍲 Food fetched:", result);
        if (result?.data) {
          setData(result.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("❌ Failed to fetch food:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (foodId) fetchFood();
  }, [foodId]);

  // ✅ Image navigation
  const nextImage = () => {
    if (!data?.images?.length) return;
    setCurrentImage((prev) => (prev + 1) % data.images.length);
  };

  const prevImage = () => {
    if (!data?.images?.length) return;
    setCurrentImage((prev) =>
      prev === 0 ? data.images.length - 1 : prev - 1
    );
  };

  const handleViewVendor = () => {
    if (data?.vendor?._id) {
      router.push(`/view-vendor/${data.vendor._id}`);
    }
  };

  const handleAddClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item) => {
    console.log("🛒 Added to cart:", item);
  };

  if (!isClient) {
    return <div className="min-h-screen bg-white">Loading...</div>;
  }

  return (
    <div>
      {/* 🧭 Custom Header */}
      <header className="flex items-center px-3 py-2 bg-white sticky top-0 z-50">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h1 className="md:text-lg text-sm font-semibold text-gray-800 capitalize">
          {data?.vendor?.storeName || "Food Details"} -{" "}
          {data?.vendor?.address
            ? ` ${data.vendor.address.city}`
            : "Address not available"}
        </h1>
      </header>

      {/* 🧱 Card Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow overflow-hidden mt-3"
      >
        <div className="flex items-center justify-center py-3 px-3 bg-gradient-to-r from-orange-50 to-white">
          <motion.div
            onClick={handleViewVendor}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer group"
          >
            <Clock
              className="text-orange-500 group-hover:text-orange-600 transition"
              size={15}
            />
            <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition flex items-center">
              <ChevronRight size={16} className="ml-1" />
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Info section */}
        <div className="flex flex-wrap justify-between md:justify-evenly items-center px-5 py-3 text-center text-gray-700">
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-400">Preparation Time</p>
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <Clock size={13} color={accent} />
              {data?.estimatedDeliveryTime - 5 || "0"} -{" "}
              {data?.estimatedDeliveryTime || "0"} mins
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-gray-400">Delivery Fee</p>
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-700">
              <TbCurrencyNaira size={13} />
              {data?.deliveryFee}
            </p>
          </div>

          {data?.vendor?.acceptsDelivery && (
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-gray-400">Delivery Type</p>
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                <Truck size={14} className="text-orange-500" />
                Instant Delivery
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* 🧩 Body */}
      <div className="md:p-6 p-3 pb-20 space-y-3">
        {loading ? (
          <FoodDetailsSkeleton />
        ) : error ? (
          <p className="text-center text-red-500">Failed to load food details.</p>
        ) : data ? (
          <>
            {/* Image section */}
            <div className="relative w-full h-45 rounded-3xl overflow-hidden">
              {data?.images?.length > 1 ? (
                <>
                  <motion.img
                    key={currentImage}
                    src={data.images[currentImage]?.url}
                    alt={data?.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                  >
                    ›
                  </button>

                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {data.images.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i === currentImage
                            ? "bg-orange-500"
                            : "bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <img
                  src={data?.images?.[0]?.url || "/placeholder.jpg"}
                  alt={data?.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Info */}
            <div>
              <h3 className="md:text-3xl font-semibold text-gray-800 mb-2">
                {data?.name}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {data?.description || "No description provided for this dish."}
              </p>
            </div>

            {/* Variants */}
            {data?.variants?.length > 0 && (
              <div className="mt-4 grid gap-4">
                {data.variants.map((variant, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 12,
                    }}
                    className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl shadow-sm shadow-gray-100 hover:shadow-md p-3 md:p-4 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {variant.image ? (
                        <img
                          src={variant.image}
                          alt={variant.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-800 text-base leading-tight">
                          {variant.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {variant.description || "No description available"}
                        </p>
                        <p className="text-orange-600 font-semibold text-sm mt-1">
                          ₦{(variant.price || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleAddClick(variant)}
                        className="cursor-pointer bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold text-xs md:text-sm px-5 py-2 rounded-full shadow-sm transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">No food found.</p>
        )}
      </div>

      <AddToCartModal
        food={selectedFood}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddToCart}
      />
    </div>
  );
}
