"use client";

import { useState, useEffect, useMemo } from "react";
import { use } from "react"; // for Next.js 15+ dynamic params
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Star,
  Clock,
  X,
  Search,
  Utensils,
  Mail,
  ShoppingCart,
  Truck,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { useVendorForUserDisplay } from "@/app/hooks/useVendorQueries";
import { useRouter } from "next/navigation";
import ViewVendorSkeleton from "@/app/components/skeletons/ViewVendorSkeleton";

export default function ViewVendor({ params }) {
  const { id } = use(params);
  const { vendor, foods, isLoading } = useVendorForUserDisplay(id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [search, setSearch] = useState("");

  const router = useRouter();

  // Prevent background scroll when modals are open
  useEffect(() => {
    const hasOpenModal = isModalOpen || isFoodModalOpen;
    document.body.style.overflow = hasOpenModal ? "hidden" : "auto";
  }, [isModalOpen, isFoodModalOpen]);

  // Group foods by category
  const groupedFoods = useMemo(() => {
    if (!foods) return {};
    return foods.reduce((acc, food) => {
      const category = food.category || "Uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(food);
      return acc;
    }, {});
  }, [foods]);

  // Filter foods by search
  const filteredFoods = useMemo(() => {
    if (!foods) return [];
    if (!search.trim()) return foods;
    const q = search.toLowerCase();
    return foods.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        (f.category && f.category.toLowerCase().includes(q))
    );
  }, [foods, search]);

  const openFoodModal = (food) => {
    setSelectedFood(food);
    setIsFoodModalOpen(true);
  };

  const closeFoodModal = () => {
    setSelectedFood(null);
    setIsFoodModalOpen(false);
  };

  // ====== Loading and Empty States ======
  if (isLoading) {
    return (
      <ViewVendorSkeleton/>
    );
  }

  if (!vendor) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <Image
          src="/images/empty-vendor.svg"
          alt="No Vendor Found"
          width={180}
          height={180}
          className="mb-4"
        />
        <p className="text-gray-600 text-sm">No vendor details available.</p>
      </div>
    );
  }

  return (
    <div className="pb-12 bg-gray-50">
      {/* ===== Header ===== */}
      <div className="relative w-full h-56 bg-gradient-to-r from-orange-500 to-orange-400">
        <button type="button" onClick={() => router.back()} className="absolute top-4 z-50 left-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition" aria-label="Go back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-4 left-5 flex items-center gap-3">
          <img
            src={vendor.logo || "/images/vendor-placeholder.png"}
            alt={vendor.storeName}
            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
          />
          <div>
            <h1 className="text-xl font-semibold text-white flex items-center gap-2">
              <Utensils size={16} /> {vendor.storeName}
            </h1>
            <p className="flex items-center text-white/90 text-sm">
              <Star className="text-yellow-400 w-4 h-4 mr-1" />
              {vendor.rating || 0} ({vendor.ratingCount || 0})
            </p>
            <div className="flex items-center gap-2 text-white text-sm">
                <Phone size={15} className="text-orange-500" />
                <span>{vendor.phone || "No phone"}</span>
            </div>
            {vendor.email && (
                <div className="flex items-center gap-2 text-white text-sm">
                    <Mail size={15} className="text-orange-500" />
                    <span>{vendor.email}</span>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Vendor Info ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="md:p-5 p-2"
      >
        {/* About */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="font-semibold text-gray-800 mb-2">About</h2>
          <p className="text-gray-600 sm:text-sm text-xs leading-relaxed">
            {vendor.storeDescription || "No description provided."}
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 space-y-3">
          <h2 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <MapPin className="text-orange-500" size={16} /> Contact Info
          </h2>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Phone size={15} className="text-orange-500" />
            <span>{vendor.phone || "No phone"}</span>
          </div>
          {vendor.email && (
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Mail size={15} className="text-orange-500" />
              <span>{vendor.email}</span>
            </div>
          )}
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
            <MapPin size={12} className="text-orange-500" />
            {vendor?.address
              ? `${vendor.address.street}, ${vendor.address.city}, ${vendor.address.state}`
              : "Address not available"}
          </p>
        </div>

        {/* Opening Hours */}
        {vendor?.openingHours && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Clock size={16} className="text-orange-500" /> Opening Hours
            </h2>
            <ul className="grid sm:grid-cols-2 gap-y-2 text-sm text-gray-600">
              {Object.entries(vendor.openingHours).map(([day, hours]) => (
                <li key={day} className="flex justify-between border-b pb-1">
                  <span className="capitalize">{day}</span>
                  <span>{hours.closed ? "Closed" : `${hours.open} - ${hours.close}`}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ===== Foods Section ===== */}
        {/* <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Utensils size={16} className="text-orange-500" /> Foods
          </h2>

          {Object.keys(groupedFoods).length === 0 ? (
            <p className="text-gray-500 text-sm">No foods listed by this vendor.</p>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedFoods).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-gray-800 font-semibold mb-3">{category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2">
                    {items.slice(0, 4).map((food) => (
                      <motion.div
                        key={food._id}
                        whileHover={{ scale: 1.03 }}
                        className="rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
                        onClick={() => openFoodModal(food)}
                      >
                        <img
                          src={Array.isArray(food.images) ? food.images[0]?.url : food.image}
                          alt={food.name}
                          className="w-full h-24 object-cover rounded-md"
                        />
                        <div className="p-2">
                            <p className="font-medium text-gray-800 text-sm line-clamp-1">
                            {food.name}
                            </p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                <Truck size={12} className="text-orange-500" />
                                {vendor?.address
                                ? `${vendor.address.city}, ${vendor.address.state}`
                                : "Address not available"}
                            </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          See All Button
          {foods?.length > 4 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition"
              >
                See All Foods
              </button>
            </div>
          )}
        </div> */}
      </motion.div>

      ===== Modal: All Foods =====
      {/* <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-5xl p-6 shadow-lg relative overflow-y-auto max-h-[90vh]"
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={22} />
              </button>

              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Utensils size={18} className="text-orange-500" /> All Foods
              </h3>

              Search
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 mb-4">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent outline-none text-sm px-2"
                />
              </div>

              Food List
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFoods.length === 0 ? (
                  <p className="col-span-full text-gray-500 text-sm text-center">
                    No foods match your search.
                  </p>
                ) : (
                  filteredFoods.map((food) => (
                    <motion.div
                      key={food._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50 hover:bg-orange-50 p-3 rounded-xl shadow-sm transition cursor-pointer"
                      onClick={() => openFoodModal(food)}
                    >
                      <img
                        src={Array.isArray(food.images) ? food.images[0]?.url : food.image}
                        alt={food.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <p className="mt-2 font-medium text-gray-800 text-sm line-clamp-1">
                        {food.name}
                      </p>
                      <p className="text-orange-600 text-sm font-semibold">₦{food.price}</p>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* ===== Modal: Food Variants ===== */}
      {/* <AnimatePresence>
        {isFoodModalOpen && selectedFood && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-lg relative"
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
                onClick={closeFoodModal}
              >
                <X size={22} />
              </button>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {selectedFood.name}
              </h3>

              <p className="text-gray-600 text-sm mb-4">
                {selectedFood.description || "No description available."}
              </p>

              Variants
              <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                {selectedFood.variants?.map((variant) => (
                  <div
                    key={variant._id}
                    className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">
                          {variant.name}
                        </p>
                        <p className="text-orange-600 text-sm font-semibold">
                          ₦{variant.price}
                        </p>
                      </div>
                    </div>
                    <button className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 hover:bg-orange-600 transition">
                      <ShoppingCart size={12} /> Add
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}
