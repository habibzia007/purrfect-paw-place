
import { Link } from "react-router-dom";
import { Cat } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-pet-dark/90 backdrop-blur-sm sticky top-0 z-50 shadow-md border-b border-pet-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 paw-cursor">
            <Cat className="text-pet-purple h-8 w-8" />
            <span className="text-white font-bold text-xl">Purrfect Paw Place</span>
          </Link>
          
          <div className="hidden md:flex space-x-2">
            <Link to="/" className="nav-link paw-cursor">Home</Link>
            <Link to="/shop" className="nav-link paw-cursor">Shop</Link>
            <Link to="/favorites" className="nav-link paw-cursor">Favorites</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
