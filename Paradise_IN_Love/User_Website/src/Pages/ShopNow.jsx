// import React, { useEffect, useState } from 'react';
// import ProductCard from '../Components/ProductCard'; // Make sure this component accepts a 'product' prop

// const ShopNow = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);

//   const [productcatsub, setProductcatsub] = useState([]);

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/category/get-category', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//         });
//         const result = await response.json();
//         if (result?.data?.length > 0) {
//           setCategories(result.data);
//           setSelectedCategory(result.data[0]._id);

//           // Fetch subcategories for the first category on load
//           fetchSubcategories(result.data[0]._id);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fetch subcategories by categoryId
//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/subcategory/get-subcategory-by-Id', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ categoryId }),
//       });
//       const result = await response.json();
//       console.log('Fetched subcategories:', result);
//       setSubcategories(result.data || []);
//       setSelectedSubcategory(null);
//       console.log(productcatsub.data);

//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   // When category is clicked
//   const handleCategoryClick = (catId) => {
//     setSelectedCategory(catId);
//     fetchSubcategories(catId);
//   };

//   const fetchProductcatsub = async (selectedCategory, selectedSubcategory) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           categoryId: selectedCategory,
//           subCategoryId: selectedSubcategory,
//           page: 1,
//           limit: 10
//         })
//       })
//       const result = await response.json();
//       console.log('Fetched Product :', result);
//       setProductcatsub(result.data || []);
//     } catch (error) {
//       console.error('Error fetching Product:', error);
//     }
//   }

//   console.log('Cat', productcatsub);
//   console.log('Subcat', selectedSubcategory);


//   return (
//     <div className="min-h-screen mt-20 bg-gray-50 p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Shop Now - Paradise in Love</h1>

//       {/* Categories */}
//       <div className="overflow-x-auto mb-6">
//         <div className="flex space-x-4 min-w-max px-2 snap-x snap-mandatory scrollbar-hide">
//           {categories.map((cat) => (
//             <button
//               key={cat._id}
//               onClick={() => handleCategoryClick(cat._id)}
//               className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition snap-center ${selectedCategory === cat._id
//                 ? 'bg-indigo-600 text-white shadow-lg'
//                 : 'bg-white text-gray-700 hover:bg-indigo-100'
//                 }`}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
//         {/* Sidebar - Subcategories */}
//         <aside className="w-1/4 p-6 bg-white shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
//           <ul className="space-y-2">
//             {subcategories.length === 0 ? (
//               <li className="text-gray-500">No subcategories available</li>
//             ) : (
//               subcategories.map((subcat) => (
//                 <li key={subcat._id} className="mb-2">
//                   <button
//                     onClick={() => {
//                       setSelectedSubcategory(subcat._id)
//                       fetchProductcatsub(selectedCategory, selectedSubcategory)
//                     }}
//                     className={`w-full text-left px-3 py-2 rounded-md ${selectedSubcategory === subcat._id
//                       ? 'bg-indigo-500 text-white font-bold'
//                       : 'hover:bg-indigo-100 text-gray-800'
//                       }`}
//                   >
//                     {subcat.name}
//                   </button>
//                 </li>
//               ))
//             )}
//           </ul>
//         </aside>

//         {/* Product Grid */}
//         <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {/* TODO: Fetch & render products dynamically based on selectedCategory/selectedSubcategory */}
//           <ProductCard
//             product={{
//               id: 1,
//               name: 'Elegant Cotton Kurti',
//               category: 'Kurti',
//               subcategory: 'Cotton Kurtis',
//               price: 'Rs. 1200 (Rs. 1600) - 25% OFF',
//               image1: 'https://via.placeholder.com/200',
//               image2: 'https://via.placeholder.com/200?text=Back',
//               description: 'Comfortable and stylish cotton kurti.',
//               rating: '4.5 out of 5 stars',
//             }}
//           />
//           {/* Other hardcoded products */}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ShopNow;

// import React, { useEffect, useState } from 'react';
// import ProductCard from '../Components/ProductCard';

// const ShopNow = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   const [subcategories, setSubcategories] = useState([]);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);

//   const [productcatsub, setProductcatsub] = useState([]);

//   // Fetch categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/category/get-category', {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//         });
//         const result = await response.json();
//         if (result?.data?.length > 0) {
//           setCategories(result.data);
//           setSelectedCategory(result.data[0]._id);
//           fetchSubcategories(result.data[0]._id);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fetch subcategories by categoryId
//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/subcategory/get-subcategory-by-Id', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({ categoryId }),
//       });
//       const result = await response.json();
//       setSubcategories(result.data || []);
//       setSelectedSubcategory(null);
//       setProductcatsub([]); // Reset product list when category changes
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   // When category is clicked
//   const handleCategoryClick = (catId) => {
//     setSelectedCategory(catId);
//     fetchSubcategories(catId);
//   };

//   const fetchProductcatsub = async (categoryId, subCategoryId) => {
//     try {
//       const response = await fetch('http://localhost:8080/api/product/get-product-by-category-and-subcategory', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           categoryId,
//           subCategoryId,
//           page: 1,
//           limit: 10,
//         }),
//       });
//       const result = await response.json();
//       console.log('Fetched Product :', result);
//       setProductcatsub(result.data || []);
//       console.log(productcatsub);
      
//     } catch (error) {
//       console.error('Error fetching Product:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen mt-20 bg-gray-50 p-4 md:p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Shop Now - Paradise in Love</h1>

//       {/* Categories */}
//       <div className="overflow-x-auto mb-6">
//         <div className="flex space-x-4 min-w-max px-2 snap-x snap-mandatory scrollbar-hide">
//           {categories.map((cat) => (
//             <button
//               key={cat._id}
//               onClick={() => handleCategoryClick(cat._id)}
//               className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition snap-center ${
//                 selectedCategory === cat._id
//                   ? 'bg-indigo-600 text-white shadow-lg'
//                   : 'bg-white text-gray-700 hover:bg-indigo-100'
//               }`}
//             >
//               {cat.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
//         {/* Sidebar - Subcategories */}
//         <aside className="w-full md:w-1/4 p-6 bg-white shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
//           <ul className="space-y-2">
//             {subcategories.length === 0 ? (
//               <li className="text-gray-500">No subcategories available</li>
//             ) : (
//               subcategories.map((subcat) => (
//                 <li key={subcat._id} className="mb-2">
//                   <button
//                     onClick={() => {
//                       setSelectedSubcategory(subcat._id);
//                       fetchProductcatsub(selectedCategory, subcat._id);
//                     }}
//                     className={`w-full text-left px-3 py-2 rounded-md ${
//                       selectedSubcategory === subcat._id
//                         ? 'bg-indigo-500 text-white font-bold'
//                         : 'hover:bg-indigo-100 text-gray-800'
//                     }`}
//                   >
//                     {subcat.name}
//                   </button>
//                 </li>
//               ))
//             )}
//           </ul>
//         </aside>

//         {/* Product Grid */}
//         <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {productcatsub.length > 0 ? (
//             productcatsub.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-500">No products found. Select a subcategory to view items.</p>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default ShopNow;


import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard'; // Ensure this accepts a 'product' prop

const ShopNow = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [productcatsub, setProductcatsub] = useState([]);

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/category/get-category', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const result = await response.json();
        if (result?.data?.length > 0) {
          setCategories(result.data);
          const firstCategoryId = result.data[0]._id;
          setSelectedCategory(firstCategoryId);
          fetchSubcategories(firstCategoryId);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories by categoryId
  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await fetch('http://localhost:8080/api/subcategory/get-subcategory-by-Id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ categoryId }),
      });
      const result = await response.json();
      setSubcategories(result.data || []);
      setSelectedSubcategory(null);
      setProductcatsub([]); // Clear products when switching category
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  // Fetch products by category & subcategory
  const fetchProductcatsub = async (catId, subcatId) => {
    try {
      const response = await fetch('http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          categoryId: catId,
          subCategoryId: subcatId,
          page: 1,
          limit: 10
        })
      });
      const result = await response.json();
      setProductcatsub(result.data || []);
    } catch (error) {
      console.error('Error fetching Product:', error);
    }
  };

  // Handle category click
  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setSelectedSubcategory(null);
    setProductcatsub([]);
    fetchSubcategories(catId);
  };

  // Handle subcategory click
  const handleSubcategoryClick = (subcatId) => {
    setSelectedSubcategory(subcatId);
    fetchProductcatsub(selectedCategory, subcatId);
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Now - Paradise in Love</h1>

      {/* Categories Horizontal List */}
      <div className="overflow-x-auto mb-6">
        <div className="flex space-x-4 min-w-max px-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat._id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-semibold transition snap-center ${
                selectedCategory === cat._id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-indigo-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        {/* Subcategory Sidebar */}
        <aside className="w-full md:w-1/4 p-6 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">Subcategories</h2>
          <ul className="space-y-2">
            {subcategories.length === 0 ? (
              <li className="text-gray-500">No subcategories available</li>
            ) : (
              subcategories.map((subcat) => (
                <li key={subcat._id} className="mb-2">
                  <button
                    onClick={() => handleSubcategoryClick(subcat._id)}
                    className={`w-full text-left px-3 py-2 rounded-md ${
                      selectedSubcategory === subcat._id
                        ? 'bg-indigo-500 text-white font-bold'
                        : 'hover:bg-indigo-100 text-gray-800'
                    }`}
                  >
                    {subcat.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </aside>

        {/* Product Grid */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productcatsub.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          ) : (
            productcatsub.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  category: product.category[0], // or fetch full category name separately
                  subcategory: product.subCategory[0],
                  price: `Rs. ${product.price} (Rs. ${product.mrp}) - ${product.discount}% OFF`,
                  image1: product.image[0],
                  image2: product.image[1] || product.image[0],
                  description: product.description,
                  rating: '4.5 out of 5 stars', // Replace with actual rating if available
                }}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default ShopNow;
