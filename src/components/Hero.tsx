
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-pet-dark min-h-[70vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop')" }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pet-dark via-pet-dark/90 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Find Your <span className="text-pet-purple">Perfect</span> Furry Friend
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Discover adorable companions waiting for their forever homes.
            From playful pups to cuddly kittens, we have the perfect pet for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop">
              <Button className="bg-pet-purple hover:bg-pet-purple-dark text-white border-0 rounded-full py-6 px-8 text-lg">
                Browse Pets
              </Button>
            </Link>
            <Link to="/favorites">
              <Button variant="outline" className="text-pet-purple border-pet-purple hover:bg-pet-purple/10 rounded-full py-6 px-8 text-lg">
                View Favorites
              </Button>
            </Link>
          </div>
          
          {/* Paw prints decoration */}
          <div className="absolute bottom-8 left-1/4 opacity-20">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10C12.2 10 14 8.2 14 6C14 3.8 12.2 2 10 2C7.8 2 6 3.8 6 6C6 8.2 7.8 10 10 10Z" fill="#9b87f5"/>
              <path d="M3 18C5.2 18 7 16.2 7 14C7 11.8 5.2 10 3 10C0.8 10 -1 11.8 -1 14C-1 16.2 0.8 18 3 18Z" fill="#9b87f5"/>
              <path d="M17 18C19.2 18 21 16.2 21 14C21 11.8 19.2 10 17 10C14.8 10 13 11.8 13 14C13 16.2 14.8 18 17 18Z" fill="#9b87f5"/>
              <path d="M10 28C14.4 28 18 24.4 18 20C18 15.6 14.4 12 10 12C5.6 12 2 15.6 2 20C2 24.4 5.6 28 10 28Z" fill="#9b87f5"/>
              <path d="M50 5C52.2 5 54 3.2 54 1C54 -1.2 52.2 -3 50 -3C47.8 -3 46 -1.2 46 1C46 3.2 47.8 5 50 5Z" fill="#9b87f5"/>
              <path d="M43 13C45.2 13 47 11.2 47 9C47 6.8 45.2 5 43 5C40.8 5 39 6.8 39 9C39 11.2 40.8 13 43 13Z" fill="#9b87f5"/>
              <path d="M57 13C59.2 13 61 11.2 61 9C61 6.8 59.2 5 57 5C54.8 5 53 6.8 53 9C53 11.2 54.8 13 57 13Z" fill="#9b87f5"/>
              <path d="M50 23C54.4 23 58 19.4 58 15C58 10.6 54.4 7 50 7C45.6 7 42 10.6 42 15C42 19.4 45.6 23 50 23Z" fill="#9b87f5"/>
              <path d="M90 15C92.2 15 94 13.2 94 11C94 8.8 92.2 7 90 7C87.8 7 86 8.8 86 11C86 13.2 87.8 15 90 15Z" fill="#9b87f5"/>
              <path d="M83 23C85.2 23 87 21.2 87 19C87 16.8 85.2 15 83 15C80.8 15 79 16.8 79 19C79 21.2 80.8 23 83 23Z" fill="#9b87f5"/>
              <path d="M97 23C99.2 23 101 21.2 101 19C101 16.8 99.2 15 97 15C94.8 15 93 16.8 93 19C93 21.2 94.8 23 97 23Z" fill="#9b87f5"/>
              <path d="M90 33C94.4 33 98 29.4 98 25C98 20.6 94.4 17 90 17C85.6 17 82 20.6 82 25C82 29.4 85.6 33 90 33Z" fill="#9b87f5"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
