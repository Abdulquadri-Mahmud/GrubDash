import React from "react";

const RestaurantCard = ({ name, cuisine, rating, image }) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
      <div
        className="h-48 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="md:p-4 p-2 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900">{name}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {cuisine}
        </p>
        <p className="mt-2 text-sm text-orange-500">{rating}</p>
        <button className="mt-4 w-full rounded-lg bg-orange-500/20 dark:bg-orange-500/30 py-2 text-sm font-semibold text-orange-500 hover:bg-orange-500 hover:text-white transition-colors">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
