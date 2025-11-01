import React, { Suspense } from 'react'
import SearchPageSkeleton from '../components/skeletons/SearchPageSkeleton';
import dynamic from 'next/dynamic';

const FoodSearchMobile = dynamic(
  () => import("../components/searchs/Searchs"));

export default function page() {
  return (
    <Suspense fallback={<SearchPageSkeleton/>}>
      <FoodSearchMobile />
    </Suspense>
  )
}
