import { Home, BookOpen, Users, MessageSquare, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-6xl px-8">
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-full px-12 py-3 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-12"> {/* Increased spacing */}
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <BookOpen size={20} />
            <span>Services</span>
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <Users size={20} />
            <span>About Us</span>
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <MessageSquare size={20} />
            <span>Contact</span>
          </a>
        </div>
        <div className="flex items-center space-x-10"> {/* Increased spacing */}
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <LogIn size={20} />
            <span>Login</span>
          </a>
          <a href="#" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-base font-medium hover:opacity-90 transition-opacity flex items-center gap-3">
            <UserPlus size={20} />
            <span>Register</span>
          </a>
        </div>
      </div>
    </nav>
  );
}