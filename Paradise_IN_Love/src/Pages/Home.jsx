// import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// // import homeImg from '../assets/home1.jpg';
// import homeImg from '../assets/Home.png';
// import o3girl from '../assets/1.jpeg';
// import o3boy from '../assets/2.jpeg';
// import o3teengirl from '../assets/3.jpeg';
// import o3img from '../assets/4.jpeg';
// import o3goggle from '../assets/5.jpeg';
// import o3powder from '../assets/6.jpeg';
// import o3suits from '../assets/7.jpeg';
// import slider1 from '../assets/slider 1.jpeg';
// import slider2 from '../assets/slider 2.jpeg';
// import slider3 from '../assets/slider 3.jpeg';
// import slider4 from '../assets/slider 4.jpeg';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const totalSlides = 4;
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({
//       once: true,
//       duration: 800,
//       easing: 'ease-in-out'
//     });

//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   // const handleRedirect = (label) => {
//   //   const route = label.toLowerCase().replace(/\s+/g, '-');
//   //   navigate(`/${route}`);
//   // };

//   ///////fetch 
//   const categories = [
//     { id: "683eb42bf4e1cfcb9b170319", subIds: ["683eb77cf4e1cfcb9b170334", "683ecf26da32e0d2140a5acc"], src: o3girl, label: 'Kurti', aos: 'zoom-in', path: '/kurti' },
//     { id: "683ec7dbda32e0d2140a5aa9", subIds: ["683ed019da32e0d2140a5acf", "683ed575da32e0d2140a5ad2"], src: o3boy, label: 'Gown', aos: 'zoom-out', path: '/gown' },
//     { id: "683ec83cda32e0d2140a5aab", subIds: ["683ec9ddda32e0d2140a5ab7", "683eca34da32e0d2140a5ab9"], src: o3suits, label: 'Causal Suit', aos: 'zoom-in', path: '/causal-suit' },
//     { id: "683ec870da32e0d2140a5aad", subIds: ["683ed619da32e0d2140a5ad5", "683ed6eada32e0d2140a5ad8"], src: o3img, label: 'Anarkali Suit', aos: 'zoom-out', path: '/Anarkali' },
//     { id: "683ec8beda32e0d2140a5aaf", subIds: ["683ed7beda32e0d2140a5adb", "683ed8d0da32e0d2140a5ade"], src: o3goggle, label: 'Dress Material', aos: 'zoom-in', path: '/dress-material' },
//     { id: "683ec8f1da32e0d2140a5ab1", subIds: ["683ed9dfda32e0d2140a5ae1", "683eda9dda32e0d2140a5ae4"], src: o3teengirl, label: 'Saree', aos: 'zoom-out', path: '/saree' },
//     { id: "683ec921da32e0d2140a5ab3", subIds: ["68402c7efef586f973129628"], src: o3powder, label: 'Leggings', aos: 'zoom-in', path: '/leggings' },
//   ]

//   //  const handleCategoryClick = async (categoryId, subCategoryIds) => {
//   //   try {
//   //     const res = await fetch("http://localhost:8080/api/product/get-pruduct-by-category-and-subcategory", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         categoryId: [categoryId],         // must be array
//   //         subCategoryId: subCategoryIds,    // already array
//   //         page: 1,                          // send default page
//   //         limit: 10                         // send default limit
//   //       }),
//   //     });

//   //     const data = await res.json();

//   //     if (res.ok) {
//   //       toast.success("Fetched products by category!");
//   //       console.log(data.data); // handle as needed
//   //     } else {
//   //       toast.error(data.message || "Failed to fetch products");
//   //     }
//   //   } catch (err) {
//   //     toast.error("Fetch error: " + err.message);
//   //   }
//   //   console.log("Sending categoryId and subCategoryId:", [categoryId], subCategoryIds);

//   // };
//   const [products, setProducts] = useState([]);

//   const handleCategoryClick = async (categoryId, subCategoryIds) => {
//     console.log("Sending request with:", categoryId, subCategoryIds);

//     try {
//       const res = await fetch("http://localhost:8080/api/product/get-product-by-category-and-subcategory", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           categoryId: [categoryId],   // array
//           subCategoryId: subCategoryIds,  // array
//           page: 1,
//           limit: 10
//         }),
//       });

//       console.log("Response status:", res.status);

//       const data = await res.json();

//       console.log("Response data:", data);

//       if (res.ok) {
//         toast.success("Fetched products by category!");
//         setProducts(data.data);
//       } else {
//         toast.error(data.message || "Failed to fetch products");
//       }
//     } catch (err) {
//       toast.error("Fetch error: " + err.message);
//     }
//   };


  


//   return (
//     <div className="overflow-x-hidden">
//       {/* <ToastContainer /> */}

//       {/* Hero Section */}
//       <div className="relative bg-[#FAFDFF87] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen !mt-0 !pt-0 top-0 z-0">
//         <img
//           src={homeImg}
//           alt="Hero"
//           className="w-full h-full object-cover object-center"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="absolute inset-x-0 bottom-1/4 md:bottom-1/3 flex justify-center z-20">
//           <button
//             className="bg-white text-black font-bold text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:bg-gray-800 hover:text-white"
//             onClick={() => navigate('/shopnow')}
//           >
//             Shop Now
//           </button>
//         </div>
//       </div>

//       {/* Our Products Section */}
//       <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-10">
//         <h2
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent drop-shadow-md font-custom select-none"
//           data-aos="fade-down"
//         >
//           Our Products
//         </h2>

//         <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto px-2 sm:px-4 pb-4 scroll-smooth no-scrollbar">
//           {categories.map(({ id, subIds, src, label, aos, path }) => (
//             <div
//               key={id}
//               onClick={() => {
//                 handleCategoryClick(id, subIds);
//                 navigate(path);
//               }}
//               data-aos={aos}
//               className="relative cursor-pointer flex-shrink-0 w-32 sm:w-40 md:w-48 transition-transform transform hover:scale-105 hover:shadow-xl"
//             >
//               <img
//                 src={src}
//                 alt={label}
//                 className="p-1 sm:p-2 w-full aspect-square object-cover brightness-[55%] rounded-full mx-auto transition duration-300"
//               />
//               <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-base md:text-lg lg:text-xl font-custom font-normal text-center">
//                 {label}
//               </span>
//             </div>
//           ))}


//         </div>
//       </div>

//       {/* Auto Slider Section */}
//       <div className="relative w-full h-[80px] xs:h-[100px] sm:h-[140px] md:h-[180px] lg:h-[210px] xl:h-[250px] overflow-hidden transition-transform transform hover:scale-[1.01]">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={currentSlide}
//             src={[slider1, slider2, slider3, slider4][currentSlide]}
//             alt={`Slide ${currentSlide + 1}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         </AnimatePresence>
//       </div>

//       {/* New Arrivals Section */}
//       <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-10">
//         <h2
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent drop-shadow-md font-custom select-none"
//           data-aos="fade-down"
//         >
//           New Arrivals
//         </h2>

//         <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7" data-aos="fade-up">
//           {[
//             { src: o3girl, label: 'Saree', aos: 'zoom-in' ,path:'/saree' },
//             { src: o3boy, label: 'Gown', aos: 'zoom-out',path:"/gown" },
//             { src: o3teengirl, label: 'Kurti', aos: 'zoom-in' ,path:"/kurti"},
//             { src: o3img, label: 'Anarkali Suit', aos: 'zoom-in',path:"/Anarkali"},
//             { src: o3goggle, label: 'Dress Material', aos: 'zoom-out',path:"/dress-material" },
//             { src: o3powder, label: 'Leggings', aos: 'zoom-in',path:"/leggings" },
//           ].map(({ src, label, aos ,path}, i) => (
//             <div
//               key={i}
//               className="relative cursor-pointer group transition-transform transform hover:scale-105 hover:shadow-lg"
//               onClick={() => navigate(path)}
//               data-aos={aos}
//             >
//               <img
//                 src={src}
//                 alt={label}
//                 className="w-full aspect-[4/3] object-cover brightness-[55%] rounded-md transition duration-300 group-hover:brightness-75"
//               />
//               <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-custom font-normal transition duration-300 group-hover:scale-110">
//                 {label}
//               </span>

//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

//Animation 1

//   import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Import images
// import homeImg from '../assets/Home.png';
// import o3girl from '../assets/1.jpeg';
// import o3boy from '../assets/2.jpeg';
// import o3teengirl from '../assets/3.jpeg';
// import o3img from '../assets/4.jpeg';
// import o3goggle from '../assets/5.jpeg';
// import o3powder from '../assets/6.jpeg';
// import o3suits from '../assets/7.jpeg';
// import slider1 from '../assets/slider 1.jpeg';
// import slider2 from '../assets/slider 2.jpeg';
// import slider3 from '../assets/slider 3.jpeg';
// import slider4 from '../assets/slider 4.jpeg';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const totalSlides = 4;
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({
//       once: true,
//       duration: 800,
//       easing: 'ease-in-out'
//     });

//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   const categories = [
//     { id: "1", subIds: [], src: o3girl, label: 'Kurti', aos: 'zoom-in', path: '/kurti' },
//     { id: "2", subIds: [], src: o3boy, label: 'Gown', aos: 'zoom-out', path: '/gown' },
//     { id: "3", subIds: [], src: o3suits, label: 'Causal Suit', aos: 'zoom-in', path: '/causal-suit' },
//     { id: "4", subIds: [], src: o3img, label: 'Anarkali Suit', aos: 'zoom-out', path: '/Anarkali' },
//     { id: "5", subIds: [], src: o3goggle, label: 'Dress Material', aos: 'zoom-in', path: '/dress-material' },
//     { id: "6", subIds: [], src: o3teengirl, label: 'Saree', aos: 'zoom-out', path: '/saree' },
//     { id: "7", subIds: [], src: o3powder, label: 'Leggings', aos: 'zoom-in', path: '/leggings' },
//   ];

//   const newArrivals = [
//     { src: o3girl, label: 'Saree', path: '/saree' },
//     { src: o3boy, label: 'Gown', path: "/gown" },
//     { src: o3teengirl, label: 'Kurti', path: "/kurti" },
//     { src: o3img, label: 'Anarkali Suit', path: "/Anarkali" },
//     { src: o3goggle, label: 'Dress Material', path: "/dress-material" },
//     { src: o3powder, label: 'Leggings', path: "/leggings" },
//   ];

//   return (
//     <div className="overflow-x-hidden">
//       {/* Hero Section */}
//       <div className="relative bg-[#FAFDFF87] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen !mt-0 !pt-0 top-0 z-0">
//         <img
//           src={homeImg}
//           alt="Hero"
//           className="w-full h-full object-cover object-center"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
//         <div className="absolute inset-x-0 bottom-1/4 md:bottom-1/3 flex justify-center z-20">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white text-black font-bold text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-800 hover:text-white"
//             onClick={() => navigate('/shopnow')}
//           >
//             Shop Now
//           </motion.button>
//         </div>
//       </div>

//       {/* Our Products Section */}
//       <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-10">
//         <h2
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent drop-shadow-md font-custom select-none"
//           data-aos="fade-down"
//         >
//           Our Products
//         </h2>

//         <div className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto px-2 sm:px-4 pb-4 scroll-smooth no-scrollbar">
//           {categories.map(({ id, src, label, aos }) => (
//             <motion.div
//               key={id}
//               whileHover={{ scale: 1.05 }}
//               data-aos={aos}
//               className="relative flex-shrink-0 w-32 sm:w-40 md:w-48"
//             >
//               <img
//                 src={src}
//                 alt={label}
//                 className="p-1 sm:p-2 w-full aspect-square object-cover brightness-[55%] rounded-full mx-auto transition duration-300"
//               />
//               <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-base md:text-lg lg:text-xl font-custom font-normal text-center">
//                 {label}
//               </span>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Auto Slider Section */}
//       <div className="relative w-full h-[80px] xs:h-[100px] sm:h-[140px] md:h-[180px] lg:h-[210px] xl:h-[250px] overflow-hidden transition-transform transform hover:scale-[1.01]">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={currentSlide}
//             src={[slider1, slider2, slider3, slider4][currentSlide]}
//             alt={`Slide ${currentSlide + 1}`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 1 }}
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         </AnimatePresence>
//       </div>

//       {/* New Arrivals Section */}
//       <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-10">
//         <h2
//           className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent drop-shadow-md font-custom select-none"
//           data-aos="fade-down"
//         >
//           New Arrivals
//         </h2>

//         <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
//           {newArrivals.map(({ src, label, path }, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{
//                 duration: 0.6,
//                 delay: index * 0.1,
//                 ease: [0.17, 0.67, 0.83, 0.67]
//               }}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => navigate(path)}
//               className="relative cursor-pointer group"
//             >
//               <motion.img
//                 src={src}
//                 alt={label}
//                 className="w-full aspect-[4/3] object-cover brightness-[55%] rounded-md group-hover:brightness-75 transition duration-300"
//                 whileHover={{ scale: 1.02 }}
//               />
//               <motion.span 
//                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-custom font-normal"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 {label}
//               </motion.span>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



//Animation 2
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import images
// import homeImg from '../assets/Home.png';
import homeImg from '../assets/HomeBg.png';
import o3girl from '../assets/1.jpeg';
import o3boy from '../assets/2.jpeg';
import o3teengirl from '../assets/3.jpeg';
import o3img from '../assets/4.jpeg';
import o3goggle from '../assets/5.jpeg';
import o3powder from '../assets/6.jpeg';
import o3suits from '../assets/7.jpeg';
import slider1 from '../assets/slider 1.jpeg';
import slider2 from '../assets/slider 2.jpeg';
import slider3 from '../assets/slider 3.jpeg';
import slider4 from '../assets/slider 4.jpeg';


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const totalSlides = 4;
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS with more configuration options
    AOS.init({
      once: false, // Changed to false to allow animations to trigger every time element comes into view
      duration: 1000,
      easing: 'ease-in-out-quart',
      mirror: true,
      anchorPlacement: 'top-bottom',
    });

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    // Intersection Observer for custom visibility tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe the hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) observer.observe(heroSection);

    return () => {
      clearInterval(interval);
      if (heroSection) observer.unobserve(heroSection);
    };
  }, []);

  const categories = [
    { id: "1", subIds: [], src: o3girl, label: 'Kurti', aos: 'zoom-in', path: '/kurti' },
    { id: "2", subIds: [], src: o3boy, label: 'Gown', aos: 'zoom-out', path: '/gown' },
    { id: "3", subIds: [], src: o3suits, label: 'Causal Suit', aos: 'zoom-in', path: '/causal-suit' },
    { id: "4", subIds: [], src: o3img, label: 'Anarkali Suit', aos: 'zoom-out', path: '/Anarkali' },
    { id: "5", subIds: [], src: o3goggle, label: 'Dress Material', aos: 'zoom-in', path: '/dress-material' },
    { id: "6", subIds: [], src: o3teengirl, label: 'Saree', aos: 'zoom-out', path: '/saree' },
    { id: "7", subIds: [], src: o3powder, label: 'Leggings', aos: 'zoom-in', path: '/leggings' },
  ];

  const newArrivals = [
    { src: o3girl, label: 'Saree', path: '/saree' },
    { src: o3boy, label: 'Gown', path: "/gown" },
    { src: o3teengirl, label: 'Kurti', path: "/kurti" },
    { src: o3img, label: 'Anarkali Suit', path: "/Anarkali" },
    { src: o3goggle, label: 'Dress Material', path: "/dress-material" },
    { src: o3powder, label: 'Leggings', path: "/leggings" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with enhanced animations */}
      <div className="hero-section relative bg-[#FAFDFF87] h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen !mt-0 !pt-0 top-0 z-0">
        <motion.img
          src={homeImg}
          alt="Hero"
          className="w-full h-full object-cover object-center"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <motion.div
          className="absolute inset-x-0 bottom-1/4 md:bottom-1/3 flex justify-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: "backOut" }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0px 5px 15px rgba(255, 255, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            // className="bg-white text-black font-bold text-sm sm:text-base md:text-lg px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-full shadow-lg transition duration-300 hover:bg-gray-800 hover:text-white"
           className="relative text-[17px] uppercase no-underline px-10 py-4 inline-block cursor-pointer rounded-full transition-all duration-200 border-none font-medium bg-white text-black font-sans hover:-translate-y-[3px] active:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:shadow-[0_5px_10px_rgba(0,0,0,0.2)] after:content-[''] after:absolute after:inset-0 after:rounded-full after:bg-white after:z-[-1] after:transition-all after:duration-400 hover:after:scale-[1.4] hover:after:opacity-0" 
            onClick={() => navigate('/shopnow')}
            initial={{ scale: 0.9 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 10,
              delay: 1.2
            }}
          >
            Shop Now
          </motion.button>
          
        </motion.div>
      </div>

      {/* Our Products Section with enhanced animations */}
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent drop-shadow-md font-custom select-none"
          data-aos="fade-down"
          data-aos-delay="100"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          Our Products
        </motion.h2>

        <motion.div
          className="flex gap-3 sm:gap-4 md:gap-5 overflow-x-auto px-2 sm:px-4 pb-4 scroll-smooth no-scrollbar"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {categories.map(({ id, src, label, aos }) => (
            <motion.div
              key={id}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              data-aos={aos}
              data-aos-delay={id * 100}
              className="relative flex-shrink-0 w-32 sm:w-40 md:w-48 cursor-pointer"
              // onClick={() => navigate(path)}
              variants={itemVariants}
            >
              <motion.img
                src={src}
                alt={label}
                className="p-1 sm:p-2 w-full aspect-square object-cover brightness-[55%] rounded-full mx-auto transition duration-300 hover:brightness-75"
                whileHover={{ scale: 1.02 }}
              />
              <motion.span 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-base md:text-lg lg:text-xl font-custom font-normal text-center"
                whileHover={{ scale: 1.1 }}
              >
                {label}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Auto Slider Section with enhanced animations */}
      <motion.div 
        className="relative w-full h-[80px] xs:h-[100px] sm:h-[140px] md:h-[180px] lg:h-[210px] xl:h-[250px] overflow-hidden transition-transform transform hover:scale-[1.01]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={[slider1, slider2, slider3, slider4][currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              duration: 1,
              ease: [0.6, 0.05, 0.01, 0.9]
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      {/* New Arrivals Section with enhanced animations */}
      <div className="container mx-auto px-4 sm:px-6 py-6 md:py-8 lg:py-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 md:mb-10 text-center uppercase tracking-wider sm:tracking-widest bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent drop-shadow-md font-custom select-none"
          data-aos="fade-down"
          data-aos-delay="100"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          New Arrivals
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-7"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
        >
          {newArrivals.map(({ src, label }, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              // onClick={() => navigate(path)}
              className="relative cursor-pointer group overflow-hidden rounded-md"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <motion.img
                src={src}
                alt={label}
                className="w-full aspect-[4/3] object-cover brightness-[55%] rounded-md group-hover:brightness-75 transition duration-300"
                whileHover={{ scale: 1.02 }}
                initial={{ scale: 1 }}
              />
              <motion.span 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-custom font-normal"
                whileHover={{ scale: 1.1 }}
              >
                {label}
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>


    </div>
  );
};

export default Home;
