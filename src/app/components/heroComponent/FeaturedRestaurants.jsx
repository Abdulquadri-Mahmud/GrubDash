"use client"
import RestaurantCard from "./RestaurantCard";

const FeaturedRestaurants = () => {
  const restaurants = [
    {
      name: "Taste of Lagos",
      cuisine: "Yoruba Cuisine",
      rating: "⭐ 4.5 (200+)",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDT9MWO9qeJyaRmS1rcUCMo2I5CY1L99zW17FfiFObWy1v6Qs8rXFDsccimsRJ5ka9teTyBg4XfFr68TZH9GH44SGjtR-wo8GbLkXXF5t494jaICZ2YpugEduQiCUJvMQoCnDPOa7mKxZsHFnQ9hhylp8ZS8ERYVflTCfN2KsahSB_VllTlug3kMULDuBQSp-mYpwGZ5hMTq0h32nfVuco41bAzjhCo_oc_CHHVykrtIgPZcAHru_YMKWbl7mcAgB5ua-gcKgA1ObcP",
    },
    {
      name: "Ibadan Delights",
      cuisine: "Traditional Dishes",
      rating: "⭐ 4.0 (150+)",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBkgSdGBkKtzouGKyya7sS_CaCYvAMWMP9D0zX2nCn0mqX_BkQ9C2VwsfQC0E0l-so2m5f7IIwbMgESN9tU3WMzNhSgqVvFGG5fV-hyi5lFP8ai2MKuwPSgN46gpArsdQukKZUTnF2ZTOHtHFKqeZvUPhIY6jg90KI3_3D_BKw-eO43eicphSPQJ8fAxKb9Tm-tCydedtJRfjo40Nq1uslz148R1glpYwI2gOi1WeRSGe8NLdGXkyMnhMBCbOr9pZ_LrIcXVqbGnt7q",
    },
    {
      name: "Ikorodu Delights",
      cuisine: "Traditional Dishes",
      rating: "⭐ 4.0 (150+)",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBkgSdGBkKtzouGKyya7sS_CaCYvAMWMP9D0zX2nCn0mqX_BkQ9C2VwsfQC0E0l-so2m5f7IIwbMgESN9tU3WMzNhSgqVvFGG5fV-hyi5lFP8ai2MKuwPSgN46gpArsdQukKZUTnF2ZTOHtHFKqeZvUPhIY6jg90KI3_3D_BKw-eO43eicphSPQJ8fAxKb9Tm-tCydedtJRfjo40Nq1uslz148R1glpYwI2gOi1WeRSGe8NLdGXkyMnhMBCbOr9pZ_LrIcXVqbGnt7q",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 my-6 mb-0 pl-2 py-2 rounded-xl bg-white">
      <div className="flex justify-between items-center px-3 border-b border-gray-100 pb-3">
        <h2 className="text-xl sm:text-3xl  font-semibold tracking-tight text-slate-900">
          Featured Restaurants
        </h2>
        {/* <Link href={'all-restaurant'} className="text-sm font-medium text-gray-500">See All</Link> */}
      </div>

      {/* Horizontal scroll container */}
      <div className="mt-4 flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll">
        {restaurants.map((res) => (
          <div className="min-w-[250px] flex-shrink-0" key={res.name}>
            <RestaurantCard {...res} />
          </div>
        ))}
      </div>

      {/* <div className="mt-12 text-center">
        <button className="rounded-full bg-orange-500 px-6 py-3 text-base font-bold text-white shadow-md hover:bg-orange-500 transition-transform hover:scale-105">
          View All Restaurants
        </button>
      </div> */}
    </section>
  );
};

export default FeaturedRestaurants;
