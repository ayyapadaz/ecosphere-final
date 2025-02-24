import { Building2, Package, MapPin, Scale, Settings, User, Mail, Phone, Edit2, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

interface RawMaterial {
  id: string;
  name: string;
  supplier: string;
  location: string;
  available: string;
  price: number;
  unit: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  orders: number;
  price: number;
  materials: string[];
}

const rawMaterials: RawMaterial[] = [
  {
    id: 'RPP001',
    name: 'Recycled Plastic Pellets',
    supplier: 'GreenPlastic Corp',
    location: 'Pune, Maharashtra',
    available: '2000kg',
    price: 287,
    unit: 'kg'
  },
  {
    id: 'RG001',
    name: 'Processed Glass Cullet',
    supplier: 'EcoGlass Industries',
    location: 'Mumbai, Maharashtra',
    available: '5000kg',
    price: 145,
    unit: 'kg'
  },
  {
    id: 'RW001',
    name: 'Recycled Wood Fiber',
    supplier: 'WoodCycle Solutions',
    location: 'Bengaluru, Karnataka',
    available: '3500kg',
    price: 195,
    unit: 'kg'
  },
  {
    id: 'RM001',
    name: 'Metal Scrap Mix',
    supplier: 'MetalTech Recyclers',
    location: 'Chennai, Tamil Nadu',
    available: '1800kg',
    price: 420,
    unit: 'kg'
  },
  {
    id: 'RT001',
    name: 'Recycled Textile Fibers',
    supplier: 'FabricLoop Systems',
    location: 'Surat, Gujarat',
    available: '1200kg',
    price: 310,
    unit: 'kg'
  },
  {
    id: 'RP001',
    name: 'Recycled Paper Pulp',
    supplier: 'PaperCycle India',
    location: 'Delhi NCR',
    available: '4000kg',
    price: 175,
    unit: 'kg'
  }
];

const products: Product[] = [
  {
    id: 'EF001',
    name: 'Eco-Friendly Furniture',
    description: 'Made from recycled wood and plastic',
    stock: 15,
    orders: 8,
    price: 12999,
    materials: ['Recycled Wood Fiber', 'Recycled Plastic Pellets']
  },
  {
    id: 'RD001',
    name: 'Recycled Home Decor',
    description: 'Artistic pieces from recycled glass and metal',
    stock: 25,
    orders: 12,
    price: 4999,
    materials: ['Processed Glass Cullet', 'Metal Scrap Mix']
  },
  {
    id: 'SF001',
    name: 'Sustainable Fashion Items',
    description: 'Clothing made from recycled textiles',
    stock: 45,
    orders: 15,
    price: 2499,
    materials: ['Recycled Textile Fibers']
  },
  {
    id: 'EP001',
    name: 'Eco-Packaging Solutions',
    description: 'Custom packaging from recycled paper and plastics',
    stock: 1000,
    orders: 5,
    price: 599,
    materials: ['Recycled Paper Pulp', 'Recycled Plastic Pellets']
  }
];

interface CreatorProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  specialization: string[];
  joinedDate: string;
}

const creatorProfile: CreatorProfile = {
  name: "John Smith",
  email: "john.smith@ecosphere.com",
  phone: "+91 98765 43210",
  company: "EcoCreate Innovations",
  address: "123 Green Street, Mumbai, Maharashtra",
  specialization: ["Furniture", "Home Decor", "Sustainable Packaging"],
  joinedDate: "January 2024"
};

function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{products.length}</p>
          <p className="text-sm text-gray-500 mt-1">Active listings</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Pending Orders</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {products.reduce((sum, product) => sum + product.orders, 0)}
          </p>
          <p className="text-sm text-gray-500 mt-1">Across all products</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Material Requests</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">12</p>
          <p className="text-sm text-gray-500 mt-1">Active quotations</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="mt-4 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Products() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Add New Product
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              </div>
              <span className="text-green-600 font-semibold">₹{product.price}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span>Stock: {product.stock} units</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                <span>Orders: {product.orders} pending</span>
              </div>
              <div className="mt-2">
                <p className="text-xs text-gray-500">Materials used:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.materials.map((material, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                Edit
              </button>
              <button className="flex-1 border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-50">
                View Orders
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Materials() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Raw Materials</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          Request Material
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {rawMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-medium">{material.name}</h3>
              <span className="text-green-600 font-semibold">
                ₹{material.price}/{material.unit}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span>{material.supplier}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{material.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                <span>Available: {material.available}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Request Quote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const recentActivities = [
  {
    id: 1,
    type: 'order',
    icon: <Package className="h-5 w-5 text-green-600" />,
    message: 'New order received for Eco-Friendly Furniture',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'material',
    icon: <Scale className="h-5 w-5 text-blue-600" />,
    message: 'Quote approved for Recycled Wood Fiber - 500kg',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'product',
    icon: <Edit2 className="h-5 w-5 text-purple-600" />,
    message: 'Updated stock for Sustainable Fashion Items',
    time: '1 day ago'
  },
  {
    id: 4,
    type: 'order',
    icon: <Package className="h-5 w-5 text-green-600" />,
    message: 'Completed delivery of Eco-Packaging Solutions',
    time: '2 days ago'
  }
];

export function CreatorsDashboard() {
  const [currentView, setCurrentView] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(creatorProfile);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically make an API call to update the profile
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h2>
            <nav className="space-y-2">
              <button
                onClick={() => setCurrentView('overview')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentView === 'overview'
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setCurrentView('products')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentView === 'products'
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="h-5 w-5" />
                <span>Products</span>
              </button>
              <button
                onClick={() => setCurrentView('materials')}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentView === 'materials'
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Scale className="h-5 w-5" />
                <span>Materials</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentView === 'overview' && 'Dashboard Overview'}
              {currentView === 'products' && 'Product Management'}
              {currentView === 'materials' && 'Raw Materials'}
            </h1>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="col-span-3">
              <ErrorBoundary>
                {currentView === 'overview' && <Overview />}
                {currentView === 'products' && <Products />}
                {currentView === 'materials' && <Materials />}
              </ErrorBoundary>
            </div>

            {/* Recent Activity Sidebar */}
            <div className="col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4">
                      <div className="bg-gray-100 p-2 rounded-full">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Creator Profile</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({...profile, company: e.target.value})}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setProfile(creatorProfile); // Reset changes
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{profile.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{profile.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{profile.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{profile.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Specializations</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t pt-4 mt-6">
                  <p className="text-sm text-gray-500">
                    Member since {profile.joinedDate}
                  </p>
                </div>
              </div>
            )}

            {!isEditing && (
              <button
                onClick={() => setShowSettings(false)}
                className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}