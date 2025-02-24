import { useState } from 'react';

type UserRole = 'buyer' | 'creator' | 'plant';

type RoleSelectionModalProps = {
  onClose: () => void;
  onRoleSelect: (role: UserRole) => void;
};

export function RoleSelectionModal({ onClose, onRoleSelect }: RoleSelectionModalProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');

  const handleContinue = () => {
    onRoleSelect(selectedRole);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Welcome to Ecosphere</h2>
        <p className="text-gray-600 mb-6">Please select your role to continue:</p>
        
        <div className="space-y-4 mb-8">
          <button
            type="button"
            className={`w-full py-4 px-6 rounded-lg border ${
              selectedRole === 'buyer' 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('buyer')}
          >
            <div className="text-left">
              <div className="font-semibold">Buyer</div>
              <div className="text-sm opacity-80">Purchase sustainable materials and products</div>
            </div>
          </button>

          <button
            type="button"
            className={`w-full py-4 px-6 rounded-lg border ${
              selectedRole === 'creator' 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('creator')}
          >
            <div className="text-left">
              <div className="font-semibold">Creator</div>
              <div className="text-sm opacity-80">Create and sell sustainable products</div>
            </div>
          </button>

          <button
            type="button"
            className={`w-full py-4 px-6 rounded-lg border ${
              selectedRole === 'plant' 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRole('plant')}
          >
            <div className="text-left">
              <div className="font-semibold">Plant</div>
              <div className="text-sm opacity-80">Manage waste treatment facility</div>
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleContinue}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 