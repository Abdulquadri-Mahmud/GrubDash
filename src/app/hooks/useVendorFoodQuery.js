"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getVendorFoods,
} from "../utils/vendor/api/vendorFoodApi";
import toast from "react-hot-toast";

// ✅ Custom hook for managing foods
export const useFoods = () => {
  const queryClient = useQueryClient();

  // 🔹 Fetch all foods
  const {
    data: foods,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  // 🔹 Create new food
  const createMutation = useMutation({
    mutationFn: ({ vendorId, data }) => createFood(vendorId, data),
    onSuccess: () => {
      toast.success("🍛 Food created successfully!");
      queryClient.invalidateQueries(["foods"]);
    },
    onError: () => toast.error("❌ Failed to create food."),
  });

  // 🔹 Update existing food
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateFood(id, data),
    onSuccess: () => {
      toast.success("✅ Food updated successfully!");
      queryClient.invalidateQueries(["foods"]);
    },
    onError: () => toast.error("❌ Failed to update food."),
  });

  // 🔹 Delete food / variant / image / tag / metadata
  const deleteMutation = useMutation({
    mutationFn: ({ id, options }) => deleteFood(id, options),
    onSuccess: (_, variables) => {
      const { options } = variables;

      // Dynamic success messages based on what was deleted
      if (options?.deleteAll) toast.success("🗑️ Food deleted successfully!");
      else if (options?.variantId) toast.success("🧩 Variant deleted successfully!");
      else if (options?.imageId) toast.success("🖼️ Image deleted successfully!");
      else if (options?.tagKey) toast.success("🏷️ Tag removed successfully!");
      else if (options?.metaKey) toast.success("⚙️ Metadata field removed!");
      else toast.success("🗑️ Item deleted successfully!");

      queryClient.invalidateQueries(["foods"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("❌ Failed to delete item.");
    },
  });

  return {
    foods,
    isLoading,
    isError,
    refetch,
    createFood: createMutation.mutate,
    updateFood: updateMutation.mutate,
    deleteFood: deleteMutation.mutate, // use like deleteFood({ id, options })
  };
};

// ✅ Optional: Hook for fetching a single food by ID
export const useFoodById = (id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["food", id],
    queryFn: () => getFoodById(id),
    enabled: !!id, // only fetch if id exists
  });

  return { food: data, isLoading, isError };
};

export const useVendorFood = (vendorId) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["food", vendorId],
    queryFn: () => getVendorFoods(vendorId),
    enabled: !!vendorId, // only fetch if id exists
  });

  return { foods: data, isLoading, isError };
};



{/* <button
  onClick={() =>
    deleteFood({
      id: food._id,
      options: { deleteAll: true }, // delete the entire food
    })
  }
>
  Delete Food
</button>

<button
  onClick={() =>
    deleteFood({
      id: food._id,
      options: { variantId: "671b3a1f..." }, // delete one variant
    })
  }
>
  Delete Variant
</button>

<button
  onClick={() =>
    deleteFood({
      id: food._id,
      options: { tagKey: "spicy" }, // delete a tag
    })
  }
>
  Remove Tag
</button> */}
