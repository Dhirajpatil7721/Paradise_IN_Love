// src/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaTelegram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-stone-50 to-stone-100 p-6 border-t border-pink-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Logo and Contact Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-4">
              Paradise IN Love
            </h1>
            <p className="text-gray-600 mb-4 italic">
              "Fashion that speaks to your heart"
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center group">
                <FaPhoneAlt className="text-pink-500 mr-3 group-hover:animate-pulse" />
                <span className="text-gray-700 group-hover:text-pink-600 transition">
                  +91-9876543210
                </span>
              </div>
              <div className="flex items-center group">
                <FaEnvelope className="text-pink-500 mr-3 group-hover:animate-bounce" />
                <span className="text-gray-700 group-hover:text-pink-600 transition">
                  contact@paradiseinlove.com
                </span>
              </div>
              <div className="flex items-center group">
                <FaMapMarkerAlt className="text-pink-500 mr-3 group-hover:rotate-12 transition" />
                <span className="text-gray-700 group-hover:text-pink-600 transition">
                  123 Fashion Street, Pune, India
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-gray-800 font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebook className="text-blue-600" />, label: "Facebook" },
                  { icon: <FaTwitter className="text-blue-400" />, label: "Twitter" },
                  { icon: <FaInstagram className="text-gradient-to-r from-purple-500 to-pink-500" />, label: "Instagram" },
                  { icon: <FaYoutube className="text-red-600" />, label: "YouTube" },
                  { icon: <FaPinterest className="text-red-500" />, label: "Pinterest" },
                  { icon: <FaTelegram className="text-blue-500" />, label: "Telegram" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    aria-label={social.label}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-pink-200">
              Quick Links
            </h4>
            <ul className="space-y-3">
  {[
    { path: "/", label: "Home" },
     { path: "/about", label: "About" },
     { path: "/contact", label: "Contact Us" },
    { path: "/signin", label: "Sign In" },
    { path: "/signup", label: "Sign Up" },

  ].map((link, index) => (
    <li key={index}>
      <Link 
        to={link.path} 
        className="text-gray-600 hover:text-pink-500 transition-colors flex items-center group"
      >
        <span className="w-2 h-2 bg-pink-300 rounded-full mr-2 group-hover:bg-pink-500 transition-colors"></span>
        {link.label}
      </Link>
    </li>
  ))}
</ul>
          </div>

          {/* Shop Categories */}
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-pink-200">
              Shop Categories
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/kurti", label: "Kurtis" },
                { path: "/saree", label: "Saree Collection" },
                { path: "/gown", label: "Designer Gowns" },
                { path: "/Anarkali", label: "Anarkali Suits" },
                { path: "/dress-material", label: "Dress Material" },
                { path: "/causal-suit", label: "Casual Suits" },
                { path: "/leggings", label: "Leggings & Palazzos" },
                // { path: "/accessories", label: "Accessories" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-pink-500 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-pink-300 rounded-full mr-2 group-hover:bg-pink-500 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-800 text-lg mb-4 pb-2 border-b border-pink-200">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {[
                { path: "/privacy-policy", label: "Privacy Policy" },
                { path: "/refund-policy", label: "Refund Policy" },
                { path: "/return-policy", label: "Return Policy" },
                { path: "/disclaimer", label: "Disclaimer" },
                { path: "/terms-and-conditions", label: "Terms & Conditions" },
                // { path: "/faqs", label: "FAQs" },
                //  path: "/size-guide", label: "Size Guide" },{
                // { path: "/track-order", label: "Track Your Order" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-gray-600 hover:text-pink-500 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-pink-300 rounded-full mr-2 group-hover:bg-pink-500 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Newsletter Subscription
            <div className="mt-6">
              <h4 className="font-bold text-gray-800 text-lg mb-3">Newsletter</h4>
              <p className="text-gray-600 text-sm mb-3">
                Subscribe to get updates on new arrivals and special offers
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 w-full rounded-l-lg border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
                <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-r-lg hover:from-pink-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-3 md:mb-0">
            © {new Date().getFullYear()} Saksham Softech. All rights reserved.
          </p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;