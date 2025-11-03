"use client";

import { useApi } from "@/app/context/ApiContext";
import { useParams } from "next/navigation";

export default function FoodTestPage() {
  const params = useParams();

  const {baseUrl} = useApi();

  console.log("Dynamic Route Params:", params);

  const foodId = params.foodId; // must match folder name
  
  useEffect(() => {
    if (!foodId) return;

    axios.get(`${baseUrl}vendors/foods/get-food?id=${foodId}`).then(res => setFood(res.data));
  }, [foodId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800">
        Testing Dynamic Route
      </h1>
      <p className="mt-4 text-gray-600">The ID passed in the URL is:</p>
      <div className="mt-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-md font-mono text-lg">
        {foodId}
      </div>
    </div>
  );
}
