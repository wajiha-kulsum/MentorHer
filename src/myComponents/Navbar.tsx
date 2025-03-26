import { Home, BookOpen, Users, Calendar, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-7xl px-8">
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-full px-8 py-3 shadow-xl flex items-center justify-between">
        {/* Logo with increased spacing */}
        <a href="#" className="flex items-center gap-2 mr-16"> {/* Increased right margin */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <Users size={18} />
          </div>
          <span className="text-xl font-bold text-gray-800">MentorHer</span>
        </a>

        {/* Main Navigation Links with adjusted spacing */}
        <div className="flex items-center space-x-10 flex-1 pl-8"> {/* Added left padding and increased gap */}
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 text-base font-medium">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 text-base font-medium">
            <BookOpen size={20} />
            <span>Services</span>
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 text-base font-medium">
            <Users size={20} />
            <span>Community</span>
          </a>
          <a href="" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 text-base font-medium">
            <Calendar size={20} />
            <span>Events</span>
          </a>
        </div>

        {/* Auth Buttons with increased spacing */}
        <div className="flex items-center space-x-8 ml-12"> {/* Increased left margin and gap */}
          <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 text-base font-medium">
            <LogIn size={20} />
            <span>Login</span>
          </a>
          <a href="#" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full text-base font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
            <UserPlus size={20} />
            <span>Register</span>
          </a>
        </div>
      </div>
    </nav>
  );
}