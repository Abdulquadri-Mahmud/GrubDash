"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import {
  Clock,
  Tag,
  Flame,
  ArrowLeft,
  Truck,
  ChevronRight,
  Utensils,
} from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

import FoodDetailsSkeleton from "@/app/components/skeletons/FoodDetailsSkeleton";
import AddToCartModal from "@/app/components/Cart/AddToCartModal";

export default function FoodDetails() {
  const { foodId } = useParams();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New states for direct fetching
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dragRef = useRef(null);
  const accent = "#FF6600";

  // ✅ Run client-only
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Fetch food details from API
  useEffect(() => {
    if (!foodId) return;

    const fetchFood = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://grub-dash-api.vercel.app/api/vendors/foods/get-food?id=${foodId}`
        );
        const json = await res.json();
        setData(json?.data || null);
      } catch (err) {
        console.error("❌ Error fetching food:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [foodId]);

  // ✅ Controls for images
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
    console.log("Added to cart:", item);
  };

  if (!isClient) {
    return <div className="min-h-screen bg-white">Loading...</div>;
  }

  // ✅ Show loading or error
  if (loading) return <FoodDetailsSkeleton />;
  if (error || !data)
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load food details.
      </div>
    );

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="flex items-center px-3 py-2 bg-white sticky top-0 z-50">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h1 className="md:text-lg text-sm font-semibold text-gray-800 capitalize">
          {data?.vendor?.storeName || "Food Details"}{" "}
          {data?.vendor?.address?.city && `- ${data.vendor.address.city}`}
        </h1>
      </header>

      {/* Card section */}
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
              View Vendor
              <ChevronRight size={16} className="ml-1" />
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Prep Time & Delivery Fee */}
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
              {data?.deliveryFee || 0}
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

      {/* Food Info */}
      <div className="md:p-6 p-3 space-y-3">
        {/* Image Section */}
        <div className="relative w-full rounded-3xl overflow-hidden">
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

              {/* Controls */}
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
        <h3 className="md:text-3xl font-semibold text-gray-800 mb-2">
          {data?.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {data?.description || "No description provided for this dish."}
        </p>

        {/* Category */}
        <div className="flex items-center gap-2 text-gray-600 mt-2">
          <Utensils size={16} color={accent} />
          <span>Category:</span>
          <span className="font-medium text-gray-800 ml-1">
            {data?.category || "Uncategorized"}
          </span>
        </div>

        {/* Metadata */}
        {data?.metadata && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-orange-50 rounded-xl border border-orange-100 w-full mt-3"
          >
            <div className="p-2">
              <h4 className="text-md font-semibold text-orange-700 mb-3 flex items-center gap-2">
                <Flame size={18} /> Dish Metadata
              </h4>
            </div>
            <div className="grid grid-cols-3 p-1 rounded-b-2xl gap-2 bg-white text-sm text-gray-700">
              <p>
                <strong className="text-orange-600 font-semibold">
                  Portion Size:
                </strong>{" "}
                {data.metadata.portionSize || "N/A"}
              </p>
              <p>
                <strong className="text-orange-600 font-semibold">
                  Spice Level:
                </strong>{" "}
                {data.metadata.spiceLevel || "Not specified"}
              </p>
              <p>
                <strong className="text-orange-600 font-semibold">
                  Chef Special:
                </strong>{" "}
                {data.metadata.chefSpecial ? "Yes" : "No"}
              </p>
            </div>
          </motion.div>
        )}

        {/* Tags */}
        {data?.tags?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mt-3">
            {data.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-orange-50 border border-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Tag size={12} /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* Variants */}
        {data?.variants?.length > 0 && (
          <div className="mt-4">
            {data.variants.map((variant, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md p-3 md:p-4 transition-all mb-2"
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
      </div>

      {/* Cart Modal */}
      <AddToCartModal
        food={selectedFood}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddToCart}
      />
    </div>
  );
}
