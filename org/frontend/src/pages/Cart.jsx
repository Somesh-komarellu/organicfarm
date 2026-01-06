import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart, total } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/products" className="bg-organicGreen text-white px-6 py-2 rounded">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-organicGreen mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cart Items List */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded shadow border">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 ml-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-500">${item.price} x {item.qty}</p>
              </div>
              <div className="font-bold text-lg mr-4">${(item.price * item.qty).toFixed(2)}</div>
              <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Checkout Summary */}
        <div className="bg-gray-50 p-6 rounded shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <hr className="mb-4" />
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button 
            className="w-full bg-organicGreen text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
            onClick={() => alert("Payment Gateway Integration would go here!")}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;