import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wand2, Crown, User } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  const handleUpgradeClick = () => {
    navigate('/payment');
  };

  return (
    <nav className={`${isLandingPage ? 'bg-transparent' : 'bg-white shadow-lg'}`}>
      <div className="text-white sticky top-0 mx-[10px]">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Wand2 className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Synth AI Suite</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/models"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Models
            </Link>
            <Link
              to="/resume"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Check ATS Score
            </Link>
            <Link
              to="/payment"
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              Pricing
            </Link>
            {!isLandingPage && (
              <button
                onClick={handleUpgradeClick}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Crown className="h-4 w-4 mr-2" />
                <span>Upgrade to Pro</span>
              </button>
            )}
            <button className="p-2 rounded-full bg-gray-100">
              <User className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;