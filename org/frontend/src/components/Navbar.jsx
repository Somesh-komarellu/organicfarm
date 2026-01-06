import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext"; // Import CartContext
import { FaUserCircle, FaLeaf, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext); // Get cart
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center text-organicGreen text-2xl font-bold">
          <FaLeaf className="mr-2" /> Theorganic
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-organicGreen">Home</Link>
          <Link to="/products" className="hover:text-organicGreen">Products</Link>
          
          {/* Cart Icon */}
          <Link to="/cart" className="relative text-gray-700 hover:text-organicGreen">
            <FaShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          
          {user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center text-gray-700 hover:text-organicGreen focus:outline-none">
                <FaUserCircle size={28} />
              </button>
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2">
                   <div className="px-4 py-2 text-sm text-gray-500 border-b">Hello, {user.name}</div>
                   <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowProfileMenu(false)}>My Profile</Link>
                   {user.isAdmin && <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setShowProfileMenu(false)}>Admin Dashboard</Link>}
                   <button onClick={() => { logout(); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-organicGreen text-white px-4 py-2 rounded-full hover:bg-green-700">Login</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu (Simplified) */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 space-y-3 shadow-lg">
          <Link to="/" className="block">Home</Link>
          <Link to="/products" className="block">Products</Link>
          <Link to="/cart" className="block">Cart ({cart.length})</Link>
          {user ? (
             <>
               <Link to="/profile" className="block">My Profile</Link>
               <button onClick={logout} className="text-red-500 w-full text-left">Logout</button>
             </>
          ) : (
            <Link to="/login" className="block bg-organicGreen text-white text-center py-2 rounded">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;