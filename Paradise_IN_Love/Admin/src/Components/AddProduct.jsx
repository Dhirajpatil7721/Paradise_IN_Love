import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiShoppingBag,
  FiPlus,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiTrash2,
  FiImage,
  FiLogOut,
  FiChevronDown
} from 'react-icons/fi';

const AddProduct = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    images: [],
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const isActiveLink = (path) =>
    location.pathname === path ? 'bg-gray-700 text-white shadow-md' : 'hover:bg-gray-700 text-white';

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProduct({ ...product, images: [...product.images, ...imageUrls] });
  };

  const removeImage = (index) => {
    const newImages = [...product.images];
    newImages.splice(index, 1);
    setProduct({ ...product, images: newImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
    alert('Product added successfully!');
  };

  const categories = [
    'Wedding Decor',
    'Flowers & Bouquets',
    'Invitations',
    'Gifts & Favors',
    'Jewelry',
    'Attire',
    'Venue Decor'
  ];

  const subcategories = {
    'Wedding Decor': ['Centerpieces', 'Table Runners', 'Wedding Arches', 'Lighting Decor'],
    'Flowers & Bouquets': ['Bridal Bouquets', 'Boutonnieres', 'Ceremony Flowers', 'Reception Flowers'],
    'Invitations': ['Digital Invitations', 'Printed Invitations', 'Save the Dates'],
    'Gifts & Favors': ['Handmade Gifts', 'Personalized Favors', 'Bridal Party Gifts'],
    'Jewelry': ['Bridal Jewelry', 'Groom Accessories', 'Wedding Rings'],
    'Attire': ['Bridal Gowns', 'Groom Attire', 'Bridesmaid Dresses'],
    'Venue Decor': ['Backdrops', 'Ceiling Decor', 'Entrance Decor']
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} fixed md:relative inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-transform duration-300 ease-in-out flex flex-col z-30 shadow-xl`}
      >
        <div className="p-4 flex items-center justify-between border-b border-pink-500">
          <div className="flex items-center">
            <div className="bg-white p-1 rounded-lg mr-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-8 h-8 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
            </div>
            <h1 className="text-xl font-bold tracking-wide">Paradies in Love</h1>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-700 transition-all md:hidden"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col px-2 flex-grow">
          <Link 
            to="/dashboard" 
            className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/dashboard')}`}
          >
            <FiHome className="mr-3" size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link 
            to="/orders" 
            className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/orders')}`}
          >
            <FiShoppingBag className="mr-3" size={20} />
            <span className="font-medium">Orders</span>
          </Link>
          <Link 
            to="/add-product" 
            className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/add-product')}`}
          >
            <FiPlus className="mr-3" size={20} />
            <span className="font-medium">Add Product</span>
          </Link>
          <Link 
            to="/customers" 
            className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 transition-all ${isActiveLink('/customers')}`}
          >
            <FiUsers className="mr-3" size={20} />
            <span className="font-medium">Customers</span>
          </Link>
          <Link to="/logout" className={`px-4 py-3 flex items-center rounded-lg mx-2 my-1 ${isActiveLink("/setting")}`}>
                      <FiLogOut className="mr-3" size={20} />
                      {isSidebarOpen && <span>Logout</span>}
                    </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden p-4 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-200 transition-all"
          >
            <FiMenu size={24} className="text-gray-700" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">Add Product</h2>
          <div className="w-8"></div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Add New Product</h2>
              <p className="text-gray-600 mt-1">Fill in the details below to add a new product</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-pink-600 to-rose-600 p-4 text-white">
              <h3 className="text-xl font-bold">Product Information</h3>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none transition-all"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-8 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none transition-all"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none transition-all"
                    rows="4"
                    placeholder="Describe your product..."
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <div className="relative">
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none appearance-none transition-all"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Subcategory */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                  <div className="relative">
                    <select
                      name="subcategory"
                      value={product.subcategory}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:outline-none appearance-none transition-all"
                      disabled={!product.category}
                    >
                      <option value="">Select a subcategory</option>
                      {product.category && subcategories[product.category]?.map((subcat, idx) => (
                        <option key={idx} value={subcat}>{subcat}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FiChevronDown className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="border-t border-gray-200 pt-6">
                <label className="block text-lg font-medium text-gray-800 mb-4">Product Images</label>
                <div className="mb-6">
                  <div className="border-2 border-dashed border-rose-300 rounded-xl p-8 text-center bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      <div className="mx-auto bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center mb-3">
                        <FiImage className="text-rose-500" size={24} />
                      </div>
                      <p className="text-gray-600 font-medium">Drag & drop images or click to browse</p>
                      <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG up to 10MB</p>
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative group w-28 h-28 sm:w-32 sm:h-32 border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                      <img 
                        src={image} 
                        alt={`product-${index}`} 
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-gray-100"
                      >
                        <FiTrash2 className="text-rose-600" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 rounded-lg text-white font-medium hover:from-pink-700 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;