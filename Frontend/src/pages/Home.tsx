import { ArrowRight, Factory, Package, Truck, Users, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { materials } from '../data/materials';

export function Home() {
  const products = [
    {
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
      title: "Recycled Wood Coffee Table",
      creator: "EcoFurnish",
      price: "₹8,999",
      materials: "Recycled Wood, Metal",
      location: "Bengaluru, Karnataka"
    },
    {
      image: "https://images.unsplash.com/photo-1595500381751-d940898d13a0",
      title: "Eco-Friendly Plant Pots",
      creator: "GreenThumb Creations",
      price: "₹499",
      materials: "Recycled Plastic",
      location: "Mumbai, Maharashtra"
    },
    {
      image: "https://images.unsplash.com/photo-1491926626787-62db157af940",
      title: "Recycled Glass Vase Set",
      creator: "ArtisanCraft",
      price: "₹1,299",
      materials: "Processed Glass",
      location: "Chennai, Tamil Nadu"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Waste into Valuable Resources
          </h1>
          <p className="text-xl mb-8">
            Connect waste treatment facilities with innovative creators and eco-conscious buyers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/marketplace"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 flex items-center"
            >
              Browse Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Raw Materials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Available Raw Materials</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            High-quality processed materials from verified treatment plants
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={material.image} 
                    alt={material.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {material.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{material.title}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <Factory className="h-4 w-4 mr-2" />
                      {material.plant}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      {material.type}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      {material.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/creators"
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
            >
              View All Materials <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Finished Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Products</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Sustainable products crafted by our innovative creators
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {product.creator}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      {product.materials}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      {product.location}
                    </p>
                  </div>
                  <button className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/marketplace"
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-700"
            >
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <Truck className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">5,000+</h3>
              <p>Tons of Materials Listed</p>
            </div>
            <div>
              <Users className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">1,200+</h3>
              <p>Active Partners</p>
            </div>
            <div>
              <Leaf className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">3,500+</h3>
              <p>Successful Transactions</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}