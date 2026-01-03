import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useState, useRef, useEffect } from 'react';
import logo from '@/assets/icons/logo.png';
import userIcon from '@/assets/images/avatar.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-800">Quizzes</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to={ROUTES.HOME} className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to={ROUTES.QUIZZES} className="text-gray-700 hover:text-primary transition-colors">
              Quizzes
            </Link>
            <Link to={ROUTES.MANAGEMENT} className="text-gray-700 hover:text-primary transition-colors">
              Management
            </Link>
            <Link to={ROUTES.ABOUT} className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link to={ROUTES.CONTACT} className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* User Avatar with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <img src={userIcon} alt="User" className="w-6 h-6" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                {/* User Name */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-gray-800 font-medium">Cong Dinh</p>
                </div>

                {/* Menu Items */}
                <Link
                  to="/profile/change-password"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Change Password
                </Link>

                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // TODO: Implement logout logic
                    console.log('Logout clicked');
                  }}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
