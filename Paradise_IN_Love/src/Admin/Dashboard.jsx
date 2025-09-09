import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FiHome,
  FiShoppingBag,
  FiPlus,
  FiUsers,
  FiLogOut,
  FiX,
  FiMenu,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiTrash2,
  FiLayers,
  FiSearch
} from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleFilters = () => setShowFilters(!showFilters);

  const API_URL = import.meta.env.VITE_RENDER;

  const isActiveLink = (path) =>
    location.pathname === path ? "bg-pink-600 text-white" : "hover:bg-pink-500/20";

  // Fetch Products with search functionality
  const fetchProducts = async (searchQuery = "") => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = searchQuery
        ? `${API_URL}/product/search-product`
        : `${API_URL}/product/get`;

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
        }),
      });

      const result = await response.json();
      if (result && Array.isArray(result.data)) {
        setProducts(result.data);
        setTotalPages(result.totalNoPage || 1);
      } else {
        setProducts([]);
        throw new Error("Invalid product data");
      }
    } catch (err) {
      setError(err.message || "Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm);
  }, [currentPage, searchTerm]);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchProducts(searchTerm);
  };

  // Reset search
  const resetSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    fetchProducts();
  };

  // Filtering Logic
  const filteredProducts = products.filter((product) => {
    if (!product) return false;

    const productCategory = typeof product.category === 'string'
      ? product.category
      : product.category?.name;

    const productSubCategory = typeof product.subCategory === 'string'
      ? product.subCategory
      : product.subCategory?.name;

    const matchesCategory = selectedCategory
      ? productCategory === selectedCategory
      : true;

    const matchesSubCategory = selectedSubCategory
      ? productSubCategory === selectedSubCategory
      : true;

    return matchesCategory && matchesSubCategory;
  });

  // Predefined categories
  const predefinedCategories = [
    "Kurti",
    "Anarkali Suit",
    "Gown",
    "Dress Material",
    "Saree",
    "Leggings",
  ];

  // Extract categories
  const extractCategories = (products) => {
    const categories = new Set(predefinedCategories);

    products.forEach(product => {
      if (!product) return;
      const category = typeof product.category === 'string'
        ? product.category
        : product.category?.name;
      if (category) categories.add(category);
    });

    return ["All Categories", ...Array.from(categories).sort()];
  };

  // Extract subcategories
  const extractSubCategories = (products) => {
    const subCategories = new Set();

    products.forEach(product => {
      if (!product) return;
      const subCategory = typeof product.subCategory === 'string'
        ? product.subCategory
        : product.subCategory?.name;
      if (subCategory) subCategories.add(subCategory);
    });

    return ["All Sub-Categories", ...Array.from(subCategories).sort()];
  };

  const uniqueCategories = extractCategories(products);
  const uniqueSubCategories = extractSubCategories(products);

  // Delete Product
  const handleDelete = async (product) => {
    try {
      const response = await fetch(`${API_URL}/product/delete-product`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: product._id }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete product');
      }

      setProducts(prev => prev.filter(item => item._id !== product._id));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error('Delete error:', error.message);
      toast.error("Error deleting product");
    }
  };

  // Edit Product
  const handleEdit = (product) => {
    navigate("/edit-popup", {
      state: { product },
    });
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-pink-50 min-h-screen">
      {/* Mobile Toggle */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors shadow-lg"
      >
        {/* <FiMenu size={24} /> */}
          ☰ Menu
      </button>

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } fixed md:relative inset-y-0 left-0 w-64 bg-gradient-to-b from-pink-700 to-purple-800 text-white transition-transform duration-300 ease-in-out flex flex-col z-30 shadow-xl`}
      >
        <div className="p-5 flex items-center justify-between border-b border-pink-400/30">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3 shadow-md">
              <div className="bg-pink-500 w-10 h-10 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold text-white tracking-wide">Paradise in Love</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-pink-600/50 md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>
        <nav className="mt-8 flex flex-col px-3 flex-grow space-y-1">
          {[
            { to: "/dashboard", icon: FiHome, label: "Product Inventory" },
            { to: "/orders", icon: FiShoppingBag, label: "Orders" },
            { to: "/add-product", icon: FiPlus, label: "Add Product" },
            { to: "/category-management", icon: FiLayers, label: "Categories" },
            { to: "/customers", icon: FiUsers, label: "Customers" },
            { to: "/logout", icon: FiLogOut, label: "Logout" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-3 flex items-center rounded-lg mx-1 text-pink-100 transition-all duration-200 ${isActiveLink(
                to
              )}`}
              onClick={isSidebarOpen ? toggleSidebar : undefined}
            >
              <Icon className="mr-3 text-lg" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 text-center text-pink-200/80 text-sm border-t border-pink-400/20">
          &copy; 2023 Paradise in Love
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4 md:p-6 overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Product Inventory
          </h2>

          <div className="flex gap-3 flex-col sm:flex-row w-full sm:w-auto">
            <form onSubmit={handleSearch} className="flex gap-2 w-full">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm ? (
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX size={20} />
                  </button>
                ) : (
                  <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                )}
              </div>
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md whitespace-nowrap"
              >
                Search
              </button>
            </form>

            <Link
              to="/add-product"
              className="flex items-center gap-1 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors shadow-md whitespace-nowrap justify-center"
            >
              <FiPlus className="text-lg" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-md border border-pink-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value === "All Categories" ? "" : e.target.value)}
                >
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sub-Category
                </label>
                <select
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm"
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value === "All Sub-Categories" ? "" : e.target.value)}
                >
                  {uniqueSubCategories.map((subCategory) => (
                    <option key={subCategory} value={subCategory}>
                      {subCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Product Table */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600 mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Product</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Description</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Price</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Stock</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Image</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Category</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Sub-Category</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-pink-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <tr
                        key={product._id || index}
                        className={index % 2 === 0 ? "bg-white" : "bg-pink-50/30 hover:bg-pink-100/50"}
                      >
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{product?.name || "-"}</div>
                          <div className="text-sm text-gray-500">
                            {product?.color ? (
                              Array.isArray(product.color)
                                ? product.color.map(c => c?.name || c).join(", ")
                                : product.color?.name || product.color
                            ) : "-"}
                          </div>
                        </td>
                        <td className="px-5 py-4 max-w-xs text-sm text-gray-700">
                          <div className="line-clamp-2">{product?.description || "-"}</div>
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="text-gray-900 font-medium">₹{product?.price?.toFixed(2) ?? "-"}</div>
                          <div className="text-sm text-gray-500">
                            MRP: ₹{product?.mrp?.toFixed(2) ?? "-"}
                          </div>
                        </td>
                        {/* <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${(product?.stock || 0) > 10
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                            }`}>
                            {product?.stock ?? "0"} in stock
                          </span>
                        </td> */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${product?.stock > 10
                                ? "bg-green-100 text-green-800"
                                : product?.stock === 10
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {product?.stock === 10
                              ? "Last 10 available"
                              : `${product?.stock ?? "0"} in stock`}
                          </span>
                        </td>

                        <td className="px-5 py-4 whitespace-nowrap">
                          {product?.image ? (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 overflow-hidden">
                              <img
                                src={product.image}
                                alt={product?.name || "Product"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.parentElement.className = "bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-16 h-16 flex items-center justify-center text-gray-400 text-xs";
                                  e.target.parentElement.textContent = "No Image";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-16 h-16 flex items-center justify-center text-gray-400 text-xs">
                              No Image
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-700">
                          {product.category ? (
                            Array.isArray(product.category)
                              ? product.category.map(cat => cat?.name || cat).join(", ")
                              : product.category?.name || product.category
                          ) : "-"}
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-700">
                          {product.subCategory ? (
                            Array.isArray(product.subCategory)
                              ? product.subCategory.map(sub => sub?.name || sub).join(", ")
                              : product.subCategory?.name || product.subCategory
                          ) : "-"}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:text-blue-900 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={18} />
                            </button>

                            <button
                              onClick={() => handleDelete(product)}
                              className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-5 py-8 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <svg className="w-16 h-16 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17c0 1.105-2.239 2-5 2s-5-.895-5-2m0-5c0 1.105 2.239 2 5 2s5-.895 5-2"></path>
                          </svg>
                          <p className="text-lg font-medium">No products found</p>
                          <p className="mt-1">Try adjusting your filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-6">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-pink-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={50}
          toastClassName="rounded-lg shadow-md"
          progressClassName="bg-pink-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;