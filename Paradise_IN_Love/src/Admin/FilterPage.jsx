import { FiFilter, FiUser, FiCalendar, FiShoppingBag, FiRefreshCw } from 'react-icons/fi';

const FilterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/50">
          {/* Header with decorative elements */}
          <div className="relative bg-gradient-to-r from-pink-500 to-purple-600 p-6">
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20"></div>
            <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-full bg-pink-400/30"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="bg-white/20 p-3 rounded-full mb-4">
                <FiFilter className="text-white" size={28} />
              </div>
              <h1 className="text-2xl font-bold text-white">Advanced Filters</h1>
              <p className="text-pink-100 mt-1">Refine your search results</p>
            </div>
          </div>

          <form className="space-y-6 p-6">
            {/* Filter by Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter name"
                className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/70 shadow-sm transition-all"
              />
            </div>

            {/* Filter by Date */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="text-gray-400" size={20} />
              </div>
              <input
                type="date"
                className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/70 shadow-sm appearance-none"
              />
            </div>

            {/* Filter by Brand */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiShoppingBag className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter brand"
                className="pl-10 w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/70 shadow-sm transition-all"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Price Range</label>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/70 shadow-sm"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/70 shadow-sm"
                />
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                className="w-full mt-3 accent-pink-500"
              />
            </div>

            {/* Filter Options */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">Availability</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <input type="checkbox" className="rounded text-pink-500 focus:ring-pink-300" />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <input type="checkbox" className="rounded text-pink-500 focus:ring-pink-300" />
                  <span>Pre-order</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-2">
              <button
                type="button"
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-xl transition-all font-medium"
              >
                <FiRefreshCw size={18} />
                <span>Reset</span>
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
              >
                Apply Filters
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Use filters to find exactly what you're looking for</p>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;