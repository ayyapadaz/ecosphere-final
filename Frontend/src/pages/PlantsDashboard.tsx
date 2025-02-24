import { useState } from 'react';
import { Package, Users, Truck, AlertCircle } from 'lucide-react';
import { RouteOptimization } from '../components/RouteOptimization';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PlantDashboardLayout } from '../components/PlantDashboardLayout';
import { MaterialsManagement } from '../components/MaterialsManagement';
import { PlantSettings } from '../components/PlantSettings';

function Overview() {
  const recentActivities = [
    {
      type: 'material_update',
      message: 'Stock updated for Processed Glass Material',
      quantity: '+1000kg',
      timestamp: '2 hours ago',
      status: 'success'
    },
    {
      type: 'route_completed',
      message: 'Route #123 completed successfully',
      details: '4 collection points • 850kg collected',
      timestamp: '3 hours ago',
      status: 'success'
    },
    {
      type: 'creator_request',
      message: 'New material request from EcoCreations',
      details: 'Recycled Plastic Pellets - 200kg',
      timestamp: '5 hours ago',
      status: 'pending'
    },
    {
      type: 'route_started',
      message: 'Route #124 started',
      details: '6 collection points • Est. completion 2:30 PM',
      timestamp: '6 hours ago',
      status: 'active'
    },
    {
      type: 'material_low',
      message: 'Low stock alert: Metal Scrap',
      details: 'Current stock: 200kg',
      timestamp: '1 day ago',
      status: 'warning'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Materials
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">12,345</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Active Routes
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">23</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Connected Creators
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">89</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Activity
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* Activity Icon */}
                <div className={`mt-1 rounded-full p-2 ${
                  activity.status === 'success' ? 'bg-green-100' :
                  activity.status === 'pending' ? 'bg-yellow-100' :
                  activity.status === 'active' ? 'bg-blue-100' :
                  'bg-red-100'
                }`}>
                  {activity.type === 'material_update' && (
                    <Package className={`h-4 w-4 ${
                      activity.status === 'success' ? 'text-green-600' :
                      activity.status === 'pending' ? 'text-yellow-600' :
                      activity.status === 'active' ? 'text-blue-600' :
                      'text-red-600'
                    }`} />
                  )}
                  {activity.type === 'route_completed' && (
                    <Truck className="h-4 w-4 text-green-600" />
                  )}
                  {activity.type === 'creator_request' && (
                    <Users className="h-4 w-4 text-yellow-600" />
                  )}
                  {activity.type === 'route_started' && (
                    <Truck className="h-4 w-4 text-blue-600" />
                  )}
                  {activity.type === 'material_low' && (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>

                {/* Activity Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <span className="text-xs text-gray-500">
                      {activity.timestamp}
                    </span>
                  </div>
                  {activity.details && (
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.details}
                    </p>
                  )}
                  {activity.quantity && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                      {activity.quantity}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PlantsDashboard() {
  const [currentView, setCurrentView] = useState('overview');

  return (
    <PlantDashboardLayout onNavigate={setCurrentView}>
      {currentView === 'overview' && <Overview />}
      {currentView === 'route-optimization' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Route Optimization</h2>
          <ErrorBoundary>
            <RouteOptimization />
          </ErrorBoundary>
        </div>
      )}
      {currentView === 'materials' && <MaterialsManagement />}
      {currentView === 'settings' && <PlantSettings />}
    </PlantDashboardLayout>
  );
}