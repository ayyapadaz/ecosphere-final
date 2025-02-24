import { Package, Users, Clock, Info, Truck, Recycle, AlertCircle, ChevronDown } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  stock: number;
  price: number;
  interestedCreators: number;
  pendingOrders: number;
  image: string;
  description: string;
  specifications: {
    type: string;
    quality: string;
    processMethod: string;
    origin: string;
    certification: string[];
    minOrderQuantity: number;
  };
  sustainability: {
    carbonFootprint: string;
    recyclability: string;
    environmentalImpact: string;
  };
}

export function MaterialsManagement() {
  const materials: Material[] = [
    {
      id: "PGM001",
      name: "Processed Glass Material",
      stock: 5000,
      price: 245,
      interestedCreators: 12,
      pendingOrders: 3,
      image: "/images/recycled-glass.jpg",
      description: "High-quality recycled glass material, processed and cleaned for various applications. Ideal for manufacturing new glass products, construction materials, and artistic creations.",
      specifications: {
        type: "Mixed Color Glass Cullet",
        quality: "Grade A (99.9% pure)",
        processMethod: "Crush & Clean Technology",
        origin: "Municipal Waste Collection",
        certification: ["ISO 9001", "Green Glass Certified", "ECO-Mark"],
        minOrderQuantity: 100
      },
      sustainability: {
        carbonFootprint: "70% lower than virgin glass",
        recyclability: "100% recyclable",
        environmentalImpact: "Reduces landfill waste by 80%"
      }
    },
    {
      id: "RPP002",
      name: "Recycled Plastic Pellets",
      stock: 3000,
      price: 180,
      interestedCreators: 8,
      pendingOrders: 5,
      image: "/images/plastic-pellets.jpg",
      description: "Premium quality recycled HDPE pellets, perfect for manufacturing new plastic products. Thoroughly cleaned and processed for consistent quality.",
      specifications: {
        type: "HDPE Recycled Pellets",
        quality: "Grade B+ (98% pure)",
        processMethod: "Wash & Pelletize",
        origin: "Post-Consumer Waste",
        certification: ["REACH Compliant", "FDA Approved", "RCS Certified"],
        minOrderQuantity: 500
      },
      sustainability: {
        carbonFootprint: "85% lower than virgin plastic",
        recyclability: "Multiple cycles possible",
        environmentalImpact: "Reduces plastic waste"
      }
    },
    {
      id: "MS003",
      name: "Metal Scrap",
      stock: 2000,
      price: 320,
      interestedCreators: 15,
      pendingOrders: 4,
      image: "/images/metal-scrap.jpg",
      description: "High-quality metal scrap, suitable for recycling and reusing in various industries.",
      specifications: {
        type: "Metal Scrap",
        quality: "Grade A",
        processMethod: "Recycling Process",
        origin: "Industrial Waste",
        certification: ["ISO 14001"],
        minOrderQuantity: 500
      },
      sustainability: {
        carbonFootprint: "30% lower than virgin metal",
        recyclability: "100% recyclable",
        environmentalImpact: "Reduces mining and processing waste"
      }
    },
    {
      id: "PP004",
      name: "Paper Pulp",
      stock: 4000,
      price: 120,
      interestedCreators: 6,
      pendingOrders: 2,
      image: "/images/paper-pulp.jpg",
      description: "High-quality paper pulp, ideal for manufacturing new paper products and composting.",
      specifications: {
        type: "Paper Pulp",
        quality: "Grade A",
        processMethod: "Recycling Process",
        origin: "Post-Consumer Waste",
        certification: ["FSC Certified"],
        minOrderQuantity: 1000
      },
      sustainability: {
        carbonFootprint: "70% lower than virgin paper",
        recyclability: "100% recyclable",
        environmentalImpact: "Reduces deforestation and water usage"
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Materials</h2>
          <p className="text-gray-600 mt-1">Manage your processed recycled materials</p>
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
          <Package className="h-5 w-5" />
          Add New Material
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {materials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{material.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">ID: {material.id}</p>
                </div>
                <div className="bg-green-50 px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-green-700">₹{material.price}/{material.specifications.type.includes('Plastic') ? 'kg' : 'kg'}</p>
                  <p className="text-xs text-green-600">In Stock: {material.stock}kg</p>
                </div>
              </div>

              <p className="text-gray-600 mt-4">{material.description}</p>

              <div className="mt-6">
                <button className="flex items-center gap-2 text-green-600 font-medium">
                  <ChevronDown className="h-5 w-5" />
                  <span>View Details</span>
                </button>
              </div>

              {/* Material Details */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Specifications</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Material Type</p>
                    <p className="text-sm font-medium text-gray-900">{material.specifications.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Quality Grade</p>
                    <p className="text-sm font-medium text-gray-900">{material.specifications.quality}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Process Method</p>
                    <p className="text-sm font-medium text-gray-900">{material.specifications.processMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Minimum Order</p>
                    <p className="text-sm font-medium text-gray-900">{material.specifications.minOrderQuantity}kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Certifications</p>
                    <div className="flex gap-2 flex-wrap mt-1">
                      {material.specifications.certification.map((cert) => (
                        <span key={cert} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sustainability Info */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Sustainability Impact</h4>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Carbon Footprint</p>
                    <p className="text-sm text-green-600 mt-1">{material.sustainability.carbonFootprint}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Recyclability</p>
                    <p className="text-sm text-green-600 mt-1">{material.sustainability.recyclability}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Environmental Impact</p>
                    <p className="text-sm text-green-600 mt-1">{material.sustainability.environmentalImpact}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{material.interestedCreators} interested creators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{material.pendingOrders} pending orders</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Update Stock
                    </button>
                    <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                      View Requests
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 