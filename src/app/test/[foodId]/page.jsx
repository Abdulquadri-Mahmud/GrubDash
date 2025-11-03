"use client";

export default async function Page({ params }) {
  const { foodId } = params;

  console.log("Food ID:", foodId);
  // Example fetch
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/foods/${foodId}`, {
  //   cache: "no-store", // so it fetches fresh data
  // });
  // const food = await res.json();

  // if (!food) {
  //   return <div>Food not found</div>;
  // }

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold">{food.name}</h1>
      <p>{food.description}</p> */}
      hellow o
    </div>
  );
}
