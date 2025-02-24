import { useState, useEffect, useRef } from 'react';
import { Truck, MapPin, RotateCw, AlertCircle, Circle } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { mapStyles } from '../utils/mapStyles';
import { icons } from '../assets/icons';
import { api } from '../api/routes';

interface Bin {
  id: string;
  binLocation: {
    lat: number;
    lon: number;
    fotmattedAddress: string;
  };
  binFillLevel: number;
}

interface TruckRoute {
  route: Bin[];
  truck_id: number;
  distance: number;
  load: number;
}

interface OptimizationResponse {
  total_distance: number;
  total_garbage_picked: number;
  truck_routes: TruckRoute[];
}

const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '0.5rem'
};

const colors = ['#2563eb', '#059669', '#dc2626', '#d97706'];

const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ["places"];

const depotLocation = {
  lat: 18.525003,
  lng: 73.855504,
  name: "Pune Garbage Depot",
  address: "Shivajinagar, Pune"
};

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: true,
  fullscreenControl: true,
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
      {status}
    </span>
  );
};

export function RouteOptimization() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [directions, setDirections] = useState<google.maps.DirectionsResult[]>([]);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [selectedRoute, setSelectedRoute] = useState<TruckRoute | null>(null);
  
  const mapRef = useRef<google.maps.Map>();
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const data = await api.getBins();
      setBins(data);
    } catch (err) {
      console.error('Error fetching bins:', err);
      setError('Failed to load bins');
    }
  };

  const optimizeRoutes = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.optimizeRoutes(bins);
      setOptimizationResult(result);
      
      if (result.truck_routes) {
        const directionsPromises = result.truck_routes.map(async (route: TruckRoute) => {
          const waypoints = route.route.map(bin => ({
            location: { lat: bin.binLocation.lat, lng: bin.binLocation.lon },
            stopover: true
          }));

          const directionsService = new google.maps.DirectionsService();
          try {
            const result = await directionsService.route({
              origin: depotLocation,
              destination: depotLocation,
              waypoints,
              optimizeWaypoints: true,
              travelMode: google.maps.TravelMode.DRIVING,
            });
            return result;
          } catch (error) {
            console.error('Directions service error:', error);
            return null;
          }
        });

        const directionsResults = await Promise.all(directionsPromises);
        setDirections(directionsResults.filter(Boolean));
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to optimize routes');
    } finally {
      setLoading(false);
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header Section */}
      <div className="border-b border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Route Optimization</h2>
              <p className="mt-1 text-sm text-gray-500">
                Optimize garbage collection routes for maximum efficiency
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last Optimized</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <button
                onClick={optimizeRoutes}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {loading ? <RotateCw className="animate-spin h-5 w-5" /> : <Truck className="h-5 w-5" />}
                Optimize Routes
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          {optimizationResult && (
            <div className="mt-6 grid grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-600">Total Distance</p>
                <p className="mt-1 text-2xl font-semibold text-blue-900">
                  {(optimizationResult.total_distance / 1000).toFixed(2)} km
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-600">Garbage Collected</p>
                <p className="mt-1 text-2xl font-semibold text-green-900">
                  {optimizationResult.total_garbage_picked} units
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-600">Active Trucks</p>
                <p className="mt-1 text-2xl font-semibold text-purple-900">
                  {optimizationResult.truck_routes.length}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm font-medium text-orange-600">Collection Points</p>
                <p className="mt-1 text-2xl font-semibold text-orange-900">
                  {bins.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mx-6 mt-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Map Section */}
        <div className="lg:w-2/3 p-6">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="bg-white rounded-lg shadow-sm" style={{ height: '600px' }}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={depotLocation}
                zoom={13}
                options={mapOptions}
                onLoad={map => {
                  mapRef.current = map;
                }}
              >
                <Marker
                  position={depotLocation}
                  icon={icons.depot()}
                  onClick={() => setSelectedMarker({
                    ...depotLocation,
                    info: `${depotLocation.name}\n${depotLocation.address}`
                  })}
                />

                {bins.map((bin) => (
                  <Marker
                    key={bin.id}
                    position={{
                      lat: bin.binLocation.lat,
                      lng: bin.binLocation.lon
                    }}
                    icon={icons.bin()}
                    onClick={() => setSelectedMarker({
                      lat: bin.binLocation.lat,
                      lng: bin.binLocation.lon,
                      info: `Fill Level: ${bin.binFillLevel}%\n${bin.binLocation.fotmattedAddress}`
                    })}
                  />
                ))}

                {directions.map((direction, index) => (
                  <DirectionsRenderer
                    key={index}
                    directions={direction}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: {
                        strokeColor: colors[index % colors.length],
                        strokeWeight: 4,
                        strokeOpacity: 0.8
                      }
                    }}
                  />
                ))}

                {selectedMarker && (
                  <InfoWindow
                    position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="p-2">
                      <p className="whitespace-pre-line">{selectedMarker.info}</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </div>
        </div>

        {/* Route Details Section */}
        <div className="lg:w-1/3 border-l border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Route Details</h3>
              <select className="text-sm border-gray-300 rounded-md">
                <option>All Routes</option>
                <option>Active Routes</option>
                <option>Completed Routes</option>
              </select>
            </div>

            <div className="space-y-4">
              {optimizationResult?.truck_routes.map((route: TruckRoute, routeIndex: number) => (
                <div 
                  key={routeIndex}
                  className={`border border-gray-200 rounded-lg transition-all ${
                    selectedRoute?.truck_id === route.truck_id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div 
                    className="p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedRoute(selectedRoute?.truck_id === route.truck_id ? null : route)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: colors[routeIndex % colors.length] }} 
                        />
                        <h4 className="font-medium text-gray-900">Truck #{route.truck_id}</h4>
                      </div>
                      <StatusBadge status="active" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="text-sm font-medium text-gray-900">
                          {(route.distance / 1000).toFixed(2)} km
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Load</p>
                        <p className="text-sm font-medium text-gray-900">
                          {route.load} units
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedRoute?.truck_id === route.truck_id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="space-y-4">
                        {/* Route Timeline */}
                        <div className="relative">
                          {/* Depot Start */}
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Truck className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="w-0.5 h-full bg-gray-200 mt-2" />
                            </div>
                            <div className="pt-1">
                              <p className="font-medium text-gray-900">Pune Garbage Depot</p>
                              <p className="text-sm text-gray-500">{depotLocation.address}</p>
                              <p className="text-xs text-gray-400 mt-1">Starting Point • 8:00 AM</p>
                            </div>
                          </div>

                          {/* Collection Points */}
                          {route.route.map((stop, stopIndex) => (
                            <div key={stopIndex} className="flex items-start gap-3 mt-4">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                  <MapPin className="w-5 h-5 text-green-600" />
                                </div>
                                {stopIndex < route.route.length - 1 && (
                                  <div className="w-0.5 h-full bg-gray-200 mt-2" />
                                )}
                              </div>
                              <div className="pt-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900">Collection Point {stopIndex + 1}</p>
                                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs">
                                    {stop.binFillLevel}% Full
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">{stop.binLocation.fotmattedAddress}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  Estimated arrival • {new Date(Date.now() + (stopIndex + 1) * 30 * 60000).toLocaleTimeString()}
                                </p>
                              </div>
                            </div>
                          ))}

                          {/* Depot End */}
                          <div className="flex items-start gap-3 mt-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <Circle className="w-5 h-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="font-medium text-gray-900">Return to Depot</p>
                              <p className="text-sm text-gray-500">{depotLocation.address}</p>
                              <p className="text-xs text-gray-400 mt-1">End Point • 5:00 PM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 