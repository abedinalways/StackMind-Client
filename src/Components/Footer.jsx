import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-red-500 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-sm">
              Welcome to our blog! We share insights on technology, design, and
              lifestyle. Join us on this journey!
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li>
                <a href="#home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a href="#twitter" className="hover:text-gray-400">
                <FaTwitter size={20} />
              </a>
              <a href="#facebook" className="hover:text-gray-400">
                <FaFacebookF size={20} />
              </a>
              <a href="#instagram" className="hover:text-gray-400">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()} StackMind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
