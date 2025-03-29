"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // For current path
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Users, MessageSquare, Bell, Search } from "lucide-react";

interface NavbarProps {
  user?: {
    id: string;
    fullName: string;
    profilePhoto?: string;
  } | null;
}

// A simple modal component to display registered events
function NotificationsModal({ onClose }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/auth/Events");
        const data = await res.json();
        // Ensure we get an array of events
        const eventsArray = Array.isArray(data)
          ? data
          : data.events
          ? data.events
          : [];
        setEvents(eventsArray);
      } catch (error) {
        console.error("Error fetching registered events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Registered Events</h2>
        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p>No registered events.</p>
        ) : (
          <ul className="space-y-3">
            {events.map((event) => (
              <li key={event._id || event.id} className="border p-3 rounded">
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm">
                  {event.date} - {event.time}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/network", icon: Users, label: "My Network" },
    { href: "/messages", icon: MessageSquare, label: "Messaging" },
    // Instead of linking to /notifications, we'll open our modal on click.
    { href: "#", icon: Bell, label: "Notifications", action: () => setShowNotifications(true) },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          {/* Left Section: Logo + Search */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* Logo */}
            <h1 className="text-2xl font-semibold px-8">
              <span className="text-gray-800">Mentor</span>
              <span className="text-purple-500">Her</span>
            </h1>

            {/* Search (hidden on smaller screens) */}
            <div className="hidden md:flex md:w-60">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8 rounded-full bg-muted"
                />
              </div>
            </div>
          </div>

          {/* Middle Section: Nav Items */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex space-x-2 md:space-x-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                if (item.href === "#" && item.action) {
                  return (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className={`flex flex-col items-center px-3 py-1.5 text-xs md:text-sm rounded-md transition-colors ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                      >
                        <item.icon className="h-5 w-5 mb-1" />
                        <span className="hidden md:inline">{item.label}</span>
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`flex flex-col items-center px-3 py-1.5 text-xs md:text-sm rounded-md transition-colors ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <item.icon className="h-5 w-5 mb-1" />
                      <span className="hidden md:inline">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Section: User Avatar or Login/Become a Mentor */}
          <div className="flex items-center gap-4 mr-8">
            {user ? (
              <Link href={`/profile/${user.id}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.profilePhoto} alt={user.fullName} />
                  <AvatarFallback>
                    {user.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/become-mentor">
                  <Button size="sm">Become a Mentor</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Render Notifications Modal when active */}
      {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
      )}
    </>
  );
}
