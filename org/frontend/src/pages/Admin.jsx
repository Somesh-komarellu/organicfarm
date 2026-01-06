import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    discount: 0
  });
  const [imageFile, setImageFile] = useState(null); // State for the file

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Get the first file selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to send text + file
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("discount", formData.discount);
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const config = { 
        headers: { 
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data" // Required for files
        } 
      };
      
      await axios.post('http://localhost:5000/api/products', data, config);
      alert("Product Added Successfully!");
      // Reset Form
      setFormData({ name: "", price: "", category: "", discount: 0 });
      setImageFile(null);
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  if (!user || !user.isAdmin) return <div className="text-center mt-20 text-red-500 font-bold">Access Denied. Admins Only.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-organicGreen mb-6 text-center">Admin Dashboard</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Product Name</label>
            <input name="name" type="text" placeholder="e.g. Organic Avocados" className="w-full border p-2 rounded focus:outline-none focus:border-organicGreen" onChange={handleChange} value={formData.name} required />
          </div>

          {/* Price & Discount Row */}
          <div className="flex gap-4">
            <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Price (₹)</label>
                <input name="price" type="number" placeholder="0.00" className="w-full border p-2 rounded focus:outline-none focus:border-organicGreen" onChange={handleChange} value={formData.price} required />
            </div>
            <div className="w-1/2">
                <label className="block text-sm font-semibold text-gray-600 mb-1">Discount (%)</label>
                <input name="discount" type="number" placeholder="0" className="w-full border p-2 rounded focus:outline-none focus:border-organicGreen" onChange={handleChange} value={formData.discount} />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Category</label>
            <select name="category" className="w-full border p-2 rounded focus:outline-none focus:border-organicGreen" onChange={handleChange} value={formData.category}>
                <option value="">Select Category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Seeds">Seeds</option>
            </select>
          </div>

          {/* Image Upload Button */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Product Image</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" required />
                <div className="flex flex-col items-center">
                    <FaCloudUploadAlt className="text-4xl text-gray-400 mb-2" />
                    <span className="text-gray-500 text-sm">{imageFile ? imageFile.name : "Click to Upload Image"}</span>
                </div>
            </div>
          </div>

          <button className="w-full bg-organicGreen text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg mt-4">
            Add Product to Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;