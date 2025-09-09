import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaReceipt
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-pink-50 pt-10 pb-6 px-4 sm:px-6 border-t border-pink-200 font-sans text-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-8 mb-10 sm:mb-14">

          {/* Logo + Contact */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2 tracking-tight">
              Paradise IN Love
            </h2>
            <p className="text-sm italic mb-6 border-l-4 border-pink-400 pl-3 py-2 bg-pink-100/30 rounded-md">
              “ Kitna Bhi Try Karlo Humse Acha Collection Kahi Nahi Milenga”
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-pink-500 mt-1" />
                <span>1154/55 Kasba Peth, behind Sattoti Police Station, near Laxmi Journal Store</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-pink-500" />
                <a href="tel:+919730020567" className="hover:text-pink-600 font-medium transition">+91 9730020567</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-pink-500" />
                <a href="mailto:customerserviceparadiseinlove@gmail.com" className="hover:text-pink-600 font-medium transition">customerserviceparadiseinlove@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaReceipt className="text-pink-500" />
                <span className="font-medium">GST NO: 27AUPPT4984R1Z4</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block pb-1 border-b-2 border-pink-400">
              Quick Links
            </h3>
            <ul className="space-y-3 text-base">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact Us' }
              ].map(({ path, label }, i) => (
                <li key={i}>
                  <Link
                    to={path}
                    className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition group"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full group-hover:scale-125 transition-transform"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-pink-400 pb-1">Customer Service</h3>
            <ul className="space-y-3 text-base">
                {/* { label: 'FAQs', path: '/faq' }, */}
                {/* { label: 'Shipping & Delivery', path: '/shipping' }, */}
              {[
                { label: 'Returns & Exchanges', path: '/return-policy' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Refund Policy', path: '/refund-policy' },
                { label: 'Disclaimer ', path: '/disclaimer' },
                { label: 'Terms & Conditions ', path: '/terms-and-conditions' },
              ].map(({ label, path }, i) => (
                <li key={i}>
                  <Link to={path} className="hover:text-pink-600 transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-pink-400 pb-1">Follow Us</h3>
            <p className="text-sm mb-4">Stay connected with us on social media!</p>
            <div className="flex gap-3 flex-wrap">
              {[
                {
                  icon: <FaFacebook />,
                  label: 'Facebook',
                  url: 'https://www.facebook.com/profile.php?id=61577308750432',
                  color: 'bg-blue-600'
                },
                {
                  icon: <FaInstagram />,
                  label: 'Instagram',
                  url: 'https://www.instagram.com/paradise.in_love/profilecard/?igsh=Y2tpd29xamZxbjJp',
                  color: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
                },
                {
                  icon: <FaYoutube />,
                  label: 'YouTube',
                  url: 'https://youtube.com/@paradiseinlove?si=BRueNtKZBKnmkmBQ',
                  color: 'bg-red-600'
                },
                {
                  icon: <FaTelegram />,
                  label: 'Telegram',
                  url: 'https://t.me/ParadiseInLoveUpdates',
                  color: 'bg-blue-500'
                }
              ].map(({ icon, label, url, color }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 ${color}`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p className="mb-3 md:mb-0">© {new Date().getFullYear()} Saksham Softech. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link to="/privacy-policy" className="hover:text-pink-600">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-pink-600">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
