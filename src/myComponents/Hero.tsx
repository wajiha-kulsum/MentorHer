"use client";

import React from "react";
import { ArrowRight, Database, Code, Cpu, Lock, Share2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: <Database className="w-8 h-8" />,
    title: "Data Integration",
    description: "Seamlessly connect with all your data sources"
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Auto Generation",
    description: "Instant code generation from your data models"
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "AI Processing",
    description: "Smart algorithms optimize your solutions"
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption for all your data"
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: "Collaboration",
    description: "Real-time team collaboration features"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Performance",
    description: "Lightning fast execution speeds"
  }
];

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Expanded Background Tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20"></div>
      
      {/* Large Blurry Donut Base */}
      <div className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-[100px] opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Glassmorphic Container - Edge to Edge */}
      <div className="absolute w-full h-full px-2 sm:px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-[1800px] mx-auto">
          {/* Feature Cards Grid - Full Width */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-0">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:-translate-y-2 mx-1"
              >
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-10 px-4">
            <Button asChild className="rounded-full text-md py-6 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1">
              <Link href="/signup">
                <span className="flex items-center gap-2 font-semibold">
                  Get Started Now
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;