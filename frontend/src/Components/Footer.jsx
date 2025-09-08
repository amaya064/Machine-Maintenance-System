import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-gray-200">
      {/* Main Footer Content */}
      <footer className="py-12 px-4">
        <div className="container mx-auto">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center">
                <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
                PM System
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional preventive maintenance management system for efficient machine maintenance and team coordination.
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-all duration-300 transform hover:scale-110">
                  <FaFacebook size={20} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-all duration-300 transform hover:scale-110">
                  <FaTwitter size={20} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-all duration-300 transform hover:scale-110">
                  <FaInstagram size={20} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-all duration-300 transform hover:scale-110">
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about_Us" className="text-gray-400 hover:text-teal-400 transition-all duration-200 flex items-center group">
                    <span className="w-1 h-1 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-teal-400 transition-all duration-200 flex items-center group">
                    <span className="w-1 h-1 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-all duration-200 flex items-center group">
                    <span className="w-1 h-1 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-teal-400 transition-all duration-200 flex items-center group">
                    <span className="w-1 h-1 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-teal-400 transition-all duration-200 flex items-center group">
                    <span className="w-1 h-1 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-teal-400 transition-all duration-200 flex items-center group">
                    <span className="w-1 h-1 bg-teal-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-700">Contact Us</h4>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-start">
                  <span className="text-teal-400 mr-2">📍</span>
                   Kurunegala Rd, Thulhiriya
                </p>
                <p className="flex items-center">
                  <span className="text-teal-400 mr-2">📞</span>
                  0354 761 515
                </p>
                <p className="flex items-center">
                  <span className="text-teal-400 mr-2">✉️</span>
                  support@pmsystem.com
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-gray-500 text-sm">
                <p className="flex items-center">
                  © 2025 PM System. All rights reserved. Made with <FaHeart className="text-red-500 mx-1" /> for better maintenance management.
                </p>
              </div>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}