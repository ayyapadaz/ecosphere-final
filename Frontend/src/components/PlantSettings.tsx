import { Building2, Phone, Mail, Clock, MapPin, PenSquare } from 'lucide-react';

export function PlantSettings() {
  const plantDetails = {
    name: "GreenCycle Waste Management",
    address: "123 Green Industrial Area, Pune - 411001",
    phone: "+91 98765 43210",
    email: "info@greencycle.eco",
    operatingHours: "Mon-Sat: 9:00 AM - 6:00 PM"
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Plant Settings</h2>
        <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-2">
          <PenSquare className="h-5 w-5" />
          Edit Details
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Plant Contact Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{plantDetails.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{plantDetails.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{plantDetails.phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{plantDetails.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{plantDetails.operatingHours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
          {/* Add notification settings here */}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
          {/* Add account settings here */}
        </div>
      </div>
    </div>
  );
} 