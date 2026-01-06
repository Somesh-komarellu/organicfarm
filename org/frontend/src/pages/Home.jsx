import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Arrows

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
  {
    id: 1,
    image: "/hero1.jpg",
    title: "Pure. Organic. Natural.",
    subtitle: "Straight from the soil to your soul."
  },
  {
    id: 2,
    image: "/hero2.jpg",
    title: "Eat Clean, Live Healthy",
    subtitle: "Nourish your body with nature's best."
  },
  {
    id: 3,
    image: "/hero3.jpg",
    title: "Support Local Farmers",
    subtitle: "Sustainable practices for a better future."
  },
  {
    id: 4,
    image: "/hero4.jpg",
    title: "Freshness Delivered",
    subtitle: "Taste the difference of real food."
  },
  {
    id: 5,
    image: "/hero5.jpg",
    title: "Pesticide Free Promise",
    subtitle: "Only the good stuff for your family."
  },
  {
    id: 6,
    image: "/hero6.jpg",
    title: "Seasonal Harvests",
    subtitle: "Enjoy produce at its peak flavor."
  }
];


  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      {/* Hero Slider with Arrows */}
      <section className="relative h-[65vh] overflow-hidden group">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4 z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl">{slide.subtitle}</p>
              <Link to="/products" className="bg-organicGreen px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition shadow-lg active:scale-95">Shop Now</Link>
            </div>
          </div>
        ))}
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition z-20">
          <FaChevronLeft size={24} color="white" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition z-20">
          <FaChevronRight size={24} color="white" />
        </button>
      </section>

       {/* Middle Section: Image Left, Text Right */}
       <section className="py-12 px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1470" alt="Organic Farming" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-1/2">
              <h4 className="text-sm font-bold text-organicGreen uppercase tracking-wider mb-2">Our Promise</h4>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Organic?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Our products are grown using sustainable farming practices, entirely free from synthetic pesticides and harmful chemicals. We believe in preserving nature's integrity.
              </p>
            </div>
          </div>
        </section>

        {/* REVERSE Middle Section: Text Left, Image Right */}
        <section className="py-12 px-6 md:px-12 bg-gray-50 rounded-lg">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg h-64 md:h-80">
              <img src="/ab.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="md:w-1/2">
              <h4 className="text-sm font-bold text-organicGreen uppercase tracking-wider mb-2">Eat Smart</h4>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Healthier You, Healthier Planet</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Choosing organic isn't just about better food; it's about supporting a system that values animal welfare and ecological balance. Every bite counts towards a greener future.
              </p>
            </div>
          </div>
        </section>

      {/* Featured Products */}
      <section className="py-12 px-6 md:px-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Fresh Best Sellers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.length > 0 ? (
            products.map(p => <ProductCard key={p._id} product={p} />)
          ) : (
            <p className="text-center col-span-4 text-gray-500 py-10">Loading fresh produce...</p>
          )}
        </div>
      </section>

      {/* FOUNDERS SECTION (Restored) */}
      <section className="py-16 px-6 md:px-12 text-center bg-organicLight/30 rounded-lg mb-8">
         <h2 className="text-3xl font-bold mb-10 text-gray-800">Meet the Growers</h2>
         <div className="flex justify-center gap-12 flex-wrap">
            <div className="flex flex-col items-center group">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                    <img src="/ravitejaanna.jpg" alt="Founder" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-bold text-xl text-gray-800">RaviTeja Komarelli</h4>
                <span className="text-sm text-organicGreen font-semibold">Founder & Farmer</span>
            </div>
            <div className="flex flex-col items-center group">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Co-Founder" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <h4 className="font-bold text-xl text-gray-800">Jane Smith</h4>
                <span className="text-sm text-organicGreen font-semibold">Agricultural Expert</span>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;