import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="absolute inset-0 bg-pink-100 opacity-20"></div>
        <div className="container mx-auto px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl font-bold text-pink-600">Paradise IN Love</h1>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                Our <span className="text-pink-500">Love Story</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Paradise IN Love was born from a passion for fashion and a desire to make every woman feel beautiful, confident, and loved.
              </p>
              <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                Shop Our Collection
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 bg-pink-200 rounded-full overflow-hidden shadow-xl flex items-center justify-center">
  {/* Background Gradient Layer */}
  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-300 opacity-70"></div>

  {/* Border Layer */}
  <div className="absolute inset-4 border-2 border-white rounded-full"></div>

  {/* Center Image */}
 <img 
  src="src/assets/about.jpeg" 
  alt="Product"
  className="relative z-10 w-48 h-48 md:w-64 md:h-64 object-cover rounded-full"
/>

</div>

            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Passion for Fashion</h3>
              <p className="text-gray-600 text-center">
                We curate the most beautiful dresses that make you feel special for every occasion.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Quality Assurance</h3>
              <p className="text-gray-600 text-center">
                Every dress is carefully selected for quality, comfort, and style to ensure your satisfaction.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Easy Shopping</h3>
              <p className="text-gray-600 text-center">
                Our app provides a seamless shopping experience with secure payments and fast delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-pink-200 overflow-hidden border-4 border-white shadow-lg">
                {/* Placeholder for team member image */}
                <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-400"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Sarah Johnson</h3>
              <p className="text-pink-500 mb-4">Founder & CEO</p>
              <p className="text-gray-600">
                Fashion enthusiast with 10+ years in the industry, dedicated to bringing you the best styles.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-pink-200 overflow-hidden border-4 border-white shadow-lg">
                {/* Placeholder for team member image */}
                <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-400"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Emily Chen</h3>
              <p className="text-pink-500 mb-4">Lead Designer</p>
              <p className="text-gray-600">
                Creative visionary who ensures every dress in our collection meets our high standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-pink-200 overflow-hidden border-4 border-white shadow-lg">
                {/* Placeholder for team member image */}
                <div className="w-full h-full bg-gradient-to-br from-pink-300 to-pink-400"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Jessica Martinez</h3>
              <p className="text-pink-500 mb-4">Customer Experience</p>
              <p className="text-gray-600">
                Dedicated to making your shopping experience as delightful as our dresses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-400 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Fashion Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download our app now and discover the perfect dress that makes you feel like you're in paradise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-pink-400 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300">
              App Store
            </button>
            <button className="bg-gray-800 text-white font-semibold py-3 px-8 rounded-full hover:bg-gray-700 transition duration-300">
              Google Play
            </button>
          </div>
        </div>
      </section>

         </div>
  );
};

export default About;