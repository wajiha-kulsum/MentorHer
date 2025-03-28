"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, BookOpen, Users, LogIn, UserPlus, ChevronDown, Calendar } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount.
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/user", { cache: "no-store" });
        const data = await res.json();
        console.log("Fetched auth data:", data); // Debug log

        if (res.ok) {
          // Adjust according to the API response structure.
          // If the API returns { user: { ... } }:
          if (data.user !== undefined) {
            setUser(data.user);
          } else {
            // Otherwise, if it returns the user object directly:
            setUser(data);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-6xl px-8">
      <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-full px-12 py-3 shadow-xl flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <Home size={20} />
            <span>Home</span>
          </Link>

          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium"
            >
              <BookOpen size={20} />
              <span>Services</span>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                <Link
                  href="/Become-mentee"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Find a Mentor
                </Link>
                <Link
                  href="/BecomeMentor"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Become a Mentor
                </Link>
              </div>
            )}
          </div>

          <Link href="/create-group" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <Users size={20} />
            <span>Community</span>
          </Link>

          <Link href="/events" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
            <Calendar size={20} />
            <span>Events</span>
          </Link>
        </div>

        {/* Auth Options */}
        <div className="flex items-center space-x-10">
          {/* Show nothing until the auth check is complete */}
          {!isLoading &&
            (user ? (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium"
              >
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 text-base font-medium">
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-base font-medium hover:opacity-90 transition-opacity flex items-center gap-3"
                >
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </>
            ))}
        </div>
      </div>
    </nav>
  );
}
