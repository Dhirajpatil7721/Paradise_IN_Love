import React, { useEffect, useState } from 'react';
import ProductCard from '../Components/ProductCard';
import { motion } from 'framer-motion';

const products = [
  {
    name: 'Anarkali Suits',
    description: 'Floral Printed Tie-up Neck Designer Anarkali Suit with Dupatta',
    price: 'Rs. 815 (Rs. 2549, 68% OFF)',
    rating: '4.3 ★ 3.5k',
    image1: 'src/assets/1.jpeg',
    image2: 'src/assets/2.jpeg',
  },
  {
    name: 'Dress Material',
    description: 'Women Printed Pure Cotton T-Shirt with Skirt Material',
    price: 'Rs. 251 (Rs. 699, 64% OFF)',
    rating: '4.2 ★ 980',
    image1: 'src/assets/3.jpeg',
    image2: 'src/assets/4.jpeg',
  },
  {
    name: 'Anarkali Suits',
    description: 'Floral Printed Tie-up Neck Designer Anarkali Suit with Dupatta',
    price: 'Rs. 815 (Rs. 2549, 68% OFF)',
    rating: '4.3 ★ 3.5k',
    image1: 'src/assets/5.jpeg',
    image2: 'src/assets/6.jpeg',
  },
  {
    name: 'Dress Material',
    description: 'Women Printed Pure Cotton T-Shirt with Skirt Material',
    price: 'Rs. 251 (Rs. 699, 64% OFF)',
    rating: '4.2 ★ 980',
    image1: 'src/assets/7.jpeg',
    image2: 'src/assets/1.jpeg',
  },{
    name: 'Anarkali Suits',
    description: 'Floral Printed Tie-up Neck Designer Anarkali Suit with Dupatta',
    price: 'Rs. 815 (Rs. 2549, 68% OFF)',
    rating: '4.3 ★ 3.5k',
    image1: 'src/assets/6.jpeg',
    image2: 'src/assets/3.jpeg',
  },
  {
    name: 'Dress Material',
    description: 'Women Printed Pure Cotton T-Shirt with Skirt Material',
    price: 'Rs. 251 (Rs. 699, 64% OFF)',
    rating: '4.2 ★ 980',
    image1: 'src/assets/4.jpeg',
    image2: 'src/assets/2.jpeg',
  },

];

const ProductView = () => {

// const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch('http://localhost:8080/api/category/get-category');
//         if (!res.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await res.json();
//         setCategories(data.data);
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//       }
//     };
    
//     fetchCategories();
//   }, []);
//   console.log(categories);

const [kurti, setKurti] = useState([]);
const categoryId = "683eb42bf4e1cfcb9b170319"; 

useEffect(() => {
  const fetchProductsByCategory = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/product/get-product-by-category?id=${categoryId}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setKurti(data.data);
      console.log(data.data);
    } catch (err) {
      console.error('Error fetching products by category:', err);
    }
  };

  if (categoryId) {
    fetchProductsByCategory();
  }
}, [categoryId]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-300 bg-clip-text text-transparent">
          Fashion Collection
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Discover our exclusive collection of ethnic wear at unbeatable prices
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductView;
