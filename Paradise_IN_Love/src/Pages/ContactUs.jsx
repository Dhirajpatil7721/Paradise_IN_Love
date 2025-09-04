import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTelegram } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-pink-100">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-pink-100 opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-600">Paradise IN Love</h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-6">
            We'd <span className="text-pink-500">Love</span> to Hear From You
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Have questions, feedback, or just want to say hello? Our team is always here to help you with your fashion journey.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-10 xl:gap-16">

          {/* Contact Info */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-pink-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Our Location</h4>
                    <a
                      href="https://www.google.com/maps?q=123+Fashion+Avenue,+Suite+456,+New+York,+NY+10001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:underline"
                    >
                      1154/55 Kasba peth behind Sattoti Police station near laxmi journal store
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Phone Number</h4>
                    <p className="text-gray-600">
                      <a href="tel:+919595455123" className="text-pink-500 hover:underline">+919595455123</a><br />

                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1">Email Address</h4>
                    <p className="text-gray-600">
                      <a href="mailto:customerserviceparadiseinlove@gmail.com" className="text-pink-500 hover:underline">customerserviceparadiseinlove@gmail.com</a><br />
                      <a href="mailto:support@paradiseinlove.com" className="text-pink-500 hover:underline">support@paradiseinlove.com</a>
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[
                      { icon: <FaFacebook className="text-blue-600 text-lg" />, label: "Facebook" },
                      { icon: <FaInstagram className="text-[#E1306C] text-lg" />, label: "Instagram" },
                      { icon: <FaYoutube className="text-red-600 text-lg" />, label: "YouTube" },
                      { icon: <FaTelegram className="text-blue-500 text-lg" />, label: "Telegram" }
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
            </div>
          </div>

          {/* Map Section */}
        <div className="w-full lg:w-1/2">
  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
    <div className="h-96 w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15132.721537903484!2d73.8400500078125!3d18.520748900000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06505698a57%3A0xef12c620226c2205!2sKasba%20Peth%20Police%20Station!5e0!3m2!1sen!2sin!4v1756123339663!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div className="p-6 text-center">
      <p className="mt-2 text-gray-600">
        123 Fashion Avenue, New York, NY 10001
      </p>
      <p className="text-sm text-gray-500 mt-1">Find us on Google Maps</p>
    </div>
  </div>
</div>


        </div>
      </section>
    </div>
  );
};

export default ContactUs;