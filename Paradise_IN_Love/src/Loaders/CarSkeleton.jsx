import React from 'react'

function CarSkeleton() {
  return (
    <div>
      <AnimatePresence mode="wait">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="bg-white rounded-2xl shadow-xl overflow-hidden"
  >
    {/* Empty State Skeleton */}
    {false ? ( // Changed condition to false to show loading skeleton
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 sm:p-12"
      >
        <div className="mx-auto w-24 h-24 flex items-center justify-center bg-pink-100 rounded-full mb-4">
          <div className="text-pink-500 text-3xl animate-pulse">🛒</div>
        </div>
        <div className="h-6 w-48 mx-auto bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-64 mx-auto bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="h-10 w-40 mx-auto bg-gray-200 rounded-full animate-pulse"></div>
      </motion.div>
    ) : (
      <div className="divide-y divide-gray-100">
        {/* Cart Items Skeleton - shows 3 placeholder items */}
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 150, delay: index * 0.05 }}
            className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 hover:bg-gray-50 transition-colors"
          >
            {/* Image Placeholder */}
            <div className="flex-shrink-0 w-full sm:w-32 md:w-40 h-32 sm:h-40 bg-gray-200 rounded-lg animate-pulse"></div>

            <div className="flex-grow flex flex-col justify-between">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                    <div className="h-8 w-8 bg-gray-200 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-100 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 animate-pulse"></div>
                  </div>
                  <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                </div>

                <div className="text-right">
                  <div className="h-4 w-16 ml-auto bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-6 w-20 ml-auto bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}

    {/* Summary Section Skeleton */}
    <motion.div 
      layout
      className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 border-t border-gray-200"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex-1 w-full">
          <div className="flex justify-between items-center mb-2">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none h-12 w-full sm:w-48 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="flex-1 sm:flex-none h-12 w-full sm:w-48 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  </motion.div>
</AnimatePresence>
    </div>
  )
}

export default CarSkeleton
