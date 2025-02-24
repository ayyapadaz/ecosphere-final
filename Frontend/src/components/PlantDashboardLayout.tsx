import { useState } from 'react';
import { LayoutDashboard, Truck, Recycle, Settings } from 'lucide-react';

interface NavItem {
  name: string;
  icon: React.ReactNode;
  current: boolean;
}

interface Props {
  children: React.ReactNode;
  onNavigate: (view: string) => void;
}

export function PlantDashboardLayout({ children, onNavigate }: Props) {
  const [navigation, setNavigation] = useState<NavItem[]>([
    { name: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, current: true },
    { name: 'Route Optimization', icon: <Truck className="w-5 h-5" />, current: false },
    { name: 'Materials', icon: <Recycle className="w-5 h-5" />, current: false },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, current: false },
  ]);

  const handleNavClick = (clickedItem: string) => {
    setNavigation(navigation.map(item => ({
      ...item,
      current: item.name === clickedItem
    })));
    
    // Convert navigation item name to view identifier
    const view = clickedItem.toLowerCase().replace(' ', '-');
    onNavigate(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-xl font-bold text-gray-900">Plant Dashboard</h1>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.name)}
                  className={`${
                    item.current
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-6">
          <div className="mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 