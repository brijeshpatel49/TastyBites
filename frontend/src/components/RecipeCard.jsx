import {
  FaClock,
  FaRegBookmark,
  FaBookmark,
  FaUserAlt,
  FaArrowRight,
} from "react-icons/fa";

const RecipeCard = ({
  recipe,
  savedRecipes,
  isLoggedIn,
  onSave,
  onUnsave,
  onClick,
}) => {
  const isSaved = savedRecipes.includes(recipe._id);

  return (
    <div className="rounded-2xl shadow-md overflow-hidden bg-white w-full max-w-sm h-105 flex flex-col justify-between relative hover:shadow-xl transition duration-300">
      <div onClick={onClick} className="cursor-pointer">
        {/* Image */}
        <div className="relative">
          <img
            src={recipe.imageUrl || "https://via.placeholder.com/400x250"}
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-3">
            {recipe.description?.slice(0, 60) || "No description provided"}
          </p>

          <div className="flex justify-between items-center text-xs text-gray-600 mb-3">
            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              {recipe.category || "No category"}
            </span>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {recipe.type || "No type"}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-500" />
              <span>{recipe.cookingTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserAlt className="text-blue-500" />
              <span>{recipe.userOwner?.username || "Unknown"}</span>
            </div>
          </div>
        </div>

        <button className="absolute bottom-4 left-4 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-yellow-200 hover:shadow-lg transition-all duration-300 text-sm font-normal">
          <FaArrowRight className="text-yellow-500 text-sm" />
          View More
        </button>
        {/* Save Button */}

        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent card click
            if (!isLoggedIn) return alert("Please login to save recipes");
            isSaved ? onUnsave() : onSave();
          }}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow hover:bg-yellow-100 transition"
        >
          {isSaved ? (
            <FaBookmark className="text-yellow-500" />
          ) : (
            <FaRegBookmark className="text-gray-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
