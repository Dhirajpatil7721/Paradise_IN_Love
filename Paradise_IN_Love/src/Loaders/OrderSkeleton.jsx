import React from 'react';
import { motion } from 'framer-motion';

const OrderSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* <div className="text-center mb-8 sm:mb-12">
          <div className="h-10 w-64 mx-auto bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-48 mx-auto bg-gray-200 rounded-full"></div>
        </div> */}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Skeleton for cart items */}
          {[1, 2].map((item) => (
            <div key={item} className="flex flex-col sm:flex-row gap-4 p-6 border-b border-gray-100">
              {/* Image placeholder */}
              <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 sm:h-40 bg-gray-200 rounded-lg animate-pulse"></div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 w-full">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-100">
                      <div className="h-8 w-8 bg-gray-200 animate-pulse"></div>
                      <div className="h-8 w-8 bg-gray-100 animate-pulse"></div>
                      <div className="h-8 w-8 bg-gray-200 animate-pulse"></div>
                    </div>
                    <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-16 ml-auto bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 w-20 ml-auto bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Skeleton for summary */}
          {/* <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex-1 w-full space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
              
              <div className="flex gap-4 w-full sm:w-auto">
                <div className="flex-1 sm:flex-none h-12 w-full sm:w-40 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 sm:flex-none h-12 w-full sm:w-48 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSkeleton;