import { FaFacebook, FaInstagram, FaTwitter, FaLeaf, FaPaperPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Reduced top/bottom padding
    <footer className="bg-organicGreen text-white pt-8 pb-4 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info (Span 4 columns) */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center text-2xl font-bold mb-3">
              <FaLeaf className="mr-2" /> Theorganic
            </Link>
            <p className="text-green-100 text-sm leading-relaxed mb-4 pr-4">
              Bringing the freshest organic produce directly from sustainable farms to your table. Eat healthy, live better.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-green-700 hover:bg-green-600 transition"><FaFacebook size={14} /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-green-700 hover:bg-green-600 transition"><FaInstagram size={14} /></a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-green-700 hover:bg-green-600 transition"><FaTwitter size={14} /></a>
            </div>
          </div>

          {/* Quick Links (Span 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-md font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-100">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Shop Now</Link></li>
              <li><Link to="#" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Compact Connect Form (Span 6 columns - wider) */}
          <div className="md:col-span-6 bg-green-800 p-5 rounded-xl shadow-inner">
            <h3 className="text-md font-bold mb-3 flex items-center"><FaPaperPlane className="mr-2" /> Connect With Us</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-800">
              {/* Inputs are now smaller and side-by-side on desktop */}
              <input type="text" placeholder="Name" className="col-span-1 w-full border-0 p-2 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none" />
              <input type="text" placeholder="Mobile" className="col-span-1 w-full border-0 p-2 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none" />
              <input type="email" placeholder="Email" className="md:col-span-2 w-full border-0 p-2 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none" />
              <textarea placeholder="Your Message..." rows="2" className="md:col-span-2 w-full border-0 p-2 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none resize-none"></textarea>
              <button className="md:col-span-2 w-full bg-earthyBrown text-white py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition">Send Message</button>
            </form>
          </div>
          
        </div>

        <div className="border-t border-green-700 mt-8 pt-4 text-center text-green-200 text-xs">
          <p>&copy; {new Date().getFullYear()} Theorganic. All rights reserved. | Designed for nature.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;