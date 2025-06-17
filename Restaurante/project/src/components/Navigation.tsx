import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, Calendar, MessageSquare, Settings, LogOut, Menu } from 'react-feather';
import { useUser } from '../context/UserContext';


export const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Redireciona para a página inicial após o logout
  };

  const navItems = [
    { path: '/', label: 'Menu', icon: Home },
    { path: '/order', label: 'Order', icon: ShoppingCart },
    { path: '/reservations', label: 'Reservations', icon: Calendar },
    { path: '/chat', label: 'Chat', icon: MessageSquare },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', label: 'Admin', icon: Settings });
  }

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-serif text-amber-800">
            Restaurant Name
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 ${
                    location.pathname === item.path
                      ? 'text-amber-600'
                      : 'text-gray-600 hover:text-amber-600'
                  } transition-colors`}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 ${
                    location.pathname === item.path
                      ? 'text-amber-600'
                      : 'text-gray-600 hover:text-amber-600'
                  } transition-colors`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
            {user && (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};