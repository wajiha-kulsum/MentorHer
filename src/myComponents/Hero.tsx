"use client"; // Keep this if `Button` or other imports require client-side execution

import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Donut */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 border-[100px] border-white/20"></div>

      {/* Glassmorphic Card */}
      <div className="absolute w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center">
          Where your{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            data
          </span>{" "}
          turns into{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            software
          </span>{" "}
          with a click
        </h1>
        <p className="text-lg md:text-xl text-gray-200 text-center mt-4">
          Your Journey, Her Guidance, Limitless Possibilities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          {/* Primary Button */}
          <Button asChild className="rounded-full text-md py-6 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 hover:-translate-y-1 transition duration-300">
            <Link href="/signup">
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </Button>

          {/* Outline Button */}
          <Button asChild variant="outline" className="rounded-full text-md py-6 px-8 border-blue-600 text-blue-600 hover:bg-blue-50/50 hover:-translate-y-1 transition duration-300">
            <Link href="/how-it-works">
              <span className="flex items-center gap-2">
                Watch Demo
                <span className="ml-1 text-xs bg-gray-100 px-2 py-1 rounded-full">3mins</span>
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
