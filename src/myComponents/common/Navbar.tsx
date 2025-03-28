"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // For current path
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

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/network", icon: Users, label: "My Network" },
    { href: "/messages", icon: MessageSquare, label: "Messaging" },
    { href: "/notifications", icon: Bell, label: "Notifications" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Left Section: Logo + Search */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-semibold">WomenTech</span>
            <span className="text-primary">Mentor</span>
          </Link>

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
        <div className="flex items-center gap-4">
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
  );
}
