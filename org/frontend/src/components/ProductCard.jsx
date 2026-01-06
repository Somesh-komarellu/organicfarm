import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="relative w-full h-40 bg-gray-100 overflow-hidden group">
         <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
         {product.discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{product.discount}% OFF</span>
         )}
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
            <span className="text-xs text-organicGreen font-semibold">{product.category}</span>
            <h3 className="text-md font-bold text-gray-800 truncate mt-1">{product.name}</h3>
        </div>
        
        <div className="mt-3">
          <div className="flex items-end gap-2">
            <span className="text-organicGreen text-lg font-bold">₹{product.price.toFixed(2)}</span>
            {product.discount > 0 && (
                 <span className="text-gray-400 line-through text-sm mb-1">₹{(product.price / (1 - product.discount / 100)).toFixed(2)}</span>
            )}
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            className="w-full mt-3 bg-organicGreen text-white text-sm py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition active:scale-95"
          >
            <FaShoppingCart size={14} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;