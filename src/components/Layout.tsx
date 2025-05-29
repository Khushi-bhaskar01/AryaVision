import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Home, Calendar, BarChart2, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { isAuthenticated, username, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const authNavItems = [
    { path: '/dashboard', icon: <Home size={20} />, text: 'Dashboard' },
    { path: '/history', icon: <Calendar size={20} />, text: 'History' },
    { path: '/stats', icon: <BarChart2 size={20} />, text: 'Stats' },
  ];

  const publicNavItems = [
    { path: '/', icon: <Home size={20} />, text: 'Home' },
    { path: '/about', icon: <Calendar size={20} />, text: 'About' },
  ];

  const navItems = isAuthenticated ? authNavItems : publicNavItems;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold text-primary-600">
            <span className="flex items-center">
              MoodTrack
              <span className="ml-2 inline-block w-3 h-3 bg-primary-500 rounded-full animate-pulse-slow"></span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Hi, {username}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-primary-600"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="container mx-auto px-4 py-3">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-md ${
                        isActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </NavLink>
                </li>
              ))}
              {isAuthenticated ? (
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50 w-full"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center space-x-3 px-4 py-3 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-3 px-4 py-3 rounded-md bg-primary-500 text-white hover:bg-primary-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MoodTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;