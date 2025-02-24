import { useState } from 'react';
import { Filter, Search, ShoppingBag, Leaf, Star, Heart, ShoppingCart, X, ArrowLeft } from 'lucide-react';
import { useShopping } from '../contexts/ShoppingContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  creator: string;
  category: string;
  rating: number;
  materials: string[];
  sustainabilityScore: number;
  longDescription?: string;
  specifications?: Record<string, string>;
  availableQuantity?: number;
  deliveryTime?: string;
}

export function Marketplace() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart, toggleFavorite, isInCart, isFavorite } = useShopping();

  const products: Product[] = [
    {
      id: 'p1',
      name: 'Eco-Friendly Furniture',
      description: 'Stylish coffee table made from recycled wood and plastic',
      longDescription: "This beautiful coffee table is handcrafted from 100% recycled materials. Each piece is unique, featuring a blend of reclaimed wood and recycled plastic. The sturdy construction ensures durability while the sleek design adds a modern touch to any living space. By choosing this product, you're not only getting a functional piece of furniture but also contributing to waste reduction and sustainable manufacturing practices.",
      price: 12999,
      image: '/images/eco-furniture.jpg',
      creator: 'GreenHome Designs',
      category: 'Home',
      rating: 4.8,
      materials: ['Recycled Wood', 'Recycled Plastic'],
      sustainabilityScore: 9.2,
      specifications: {
        'Dimensions': '120cm x 60cm x 45cm',
        'Weight': '15kg',
        'Material': 'Recycled Wood & Plastic',
        'Finish': 'Natural Eco-Friendly Varnish',
        'Assembly': 'Required, tools included'
      },
      availableQuantity: 15,
      deliveryTime: '7-10 days'
    },
    {
      id: 'p2',
      name: 'Recycled Glass Vase',
      description: 'Handcrafted decorative vase made from processed glass waste',
      longDescription: 'This elegant vase is crafted entirely from recycled glass collected from municipal waste. Each piece is carefully blown by skilled artisans, resulting in a unique item with subtle variations in color and texture. The vase features a contemporary design that complements any interior style while telling a powerful story of transformation and sustainability.',
      price: 1499,
      image: '/images/glass-vase.jpg',
      creator: 'ArtGlass Creations',
      category: 'Decor',
      rating: 4.5,
      materials: ['Recycled Glass'],
      sustainabilityScore: 8.7,
      specifications: {
        'Height': '25cm',
        'Diameter': '15cm',
        'Weight': '0.8kg',
        'Material': '100% Recycled Glass',
        'Care': 'Hand wash only'
      },
      availableQuantity: 28,
      deliveryTime: '3-5 days'
    },
    {
      id: 'p3',
      name: 'Upcycled Fabric Tote Bag',
      description: 'Durable and stylish tote bag made from recycled textile fibers',
      price: 899,
      image: '/images/tote-bag.jpg',
      creator: 'EcoFashion',
      category: 'Fashion',
      rating: 4.9,
      materials: ['Recycled Textiles'],
      sustainabilityScore: 9.5
    },
    {
      id: 'p4',
      name: 'Recycled Paper Notebook',
      description: 'Premium notebook with 100% recycled paper pages',
      price: 349,
      image: '/images/paper-notebook.jpg',
      creator: 'PaperWorks',
      category: 'Stationery',
      rating: 4.6,
      materials: ['Recycled Paper'],
      sustainabilityScore: 9.0
    },
    {
      id: 'p5',
      name: 'Metal Scrap Sculpture',
      description: 'Artistic sculpture crafted from recycled metal waste',
      price: 5999,
      image: '/images/metal-sculpture.jpg',
      creator: 'MetalArt Studios',
      category: 'Art',
      rating: 4.7,
      materials: ['Recycled Metal'],
      sustainabilityScore: 8.8
    },
    {
      id: 'p6',
      name: 'Eco-Packaging Solution',
      description: 'Biodegradable packaging made from recycled materials',
      price: 1299,
      image: '/images/eco-packaging.jpg',
      creator: 'GreenPack',
      category: 'Business',
      rating: 4.4,
      materials: ['Recycled Paper', 'Biodegradable Materials'],
      sustainabilityScore: 9.3
    }
  ];

  const categories = ['All', 'Home', 'Decor', 'Fashion', 'Stationery', 'Art', 'Business'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeFilter === 'All' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Recycled Products Marketplace</h1>
          <p className="text-xl">Discover sustainable products made from recycled materials by our verified creators.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {selectedProduct ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Product Detail View */}
            <div className="p-6">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex items-center text-gray-600 hover:text-green-600 mb-6"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Products
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative">
                  <div className="absolute top-3 right-3">
                    <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full flex items-center gap-1">
                      <Leaf className="h-4 w-4" />
                      <span>Eco Score: {selectedProduct.sustainabilityScore}</span>
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                      <p className="text-gray-500">By {selectedProduct.creator}</p>
                    </div>
                    <span className="text-2xl font-bold text-green-600">₹{selectedProduct.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-3">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{selectedProduct.rating} Rating</span>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedProduct.longDescription || selectedProduct.description}</p>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Materials Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.materials.map((material, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Available Quantity</p>
                      <p className="font-medium text-gray-900">{selectedProduct.availableQuantity || 'Limited stock'}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Delivery Time</p>
                      <p className="font-medium text-gray-900">{selectedProduct.deliveryTime || '5-7 days'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <button 
                      onClick={() => addToCart(selectedProduct)}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      {isInCart(selectedProduct.id) ? 'Add More to Cart' : 'Add to Cart'}
                    </button>
                    <button 
                      onClick={() => toggleFavorite(selectedProduct)}
                      className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Heart 
                        className={`h-5 w-5 ${isFavorite(selectedProduct.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Specifications */}
              {selectedProduct.specifications && (
                <div className="mt-12 border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex">
                        <p className="w-1/3 text-gray-500">{key}</p>
                        <p className="w-2/3 text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sustainability */}
              <div className="mt-12 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sustainability Impact</h3>
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-start gap-4">
                    <Leaf className="h-8 w-8 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-medium">By purchasing this product, you're contributing to:</p>
                      <ul className="mt-2 space-y-2 text-green-700">
                        <li>• Reduction in landfill waste</li>
                        <li>• Lower carbon emissions compared to virgin materials</li>
                        <li>• Supporting sustainable manufacturing practices</li>
                        <li>• Promoting circular economy principles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="relative w-full md:w-1/3">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2">
                <Filter className="h-5 w-5 text-gray-500" />
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      activeFilter === category
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    {/* Product Image */}
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button 
                          onClick={() => toggleFavorite(product)}
                          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                        >
                          <Heart 
                            className={`h-4 w-4 ${isFavorite(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                          />
                        </button>
                        <button 
                          onClick={() => addToCart(product)}
                          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100"
                        >
                          <ShoppingCart className={`h-4 w-4 ${isInCart(product.id) ? 'text-green-600' : 'text-gray-600'}`} />
                        </button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                          <Leaf className="h-3 w-3" />
                          <span>Eco Score: {product.sustainabilityScore}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <span className="font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Materials:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.materials.map((material, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">By {product.creator}</span>
                        <button 
                          onClick={() => handleViewDetails(product)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products available</h3>
                <p className="text-gray-600">
                  Check back later for new recycled products
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}