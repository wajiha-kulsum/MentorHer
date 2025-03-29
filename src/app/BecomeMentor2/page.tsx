"use client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-accent to-background p-6">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-slide-in">
          Women in Tech Mentorship Platform
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Empowering Women in Technology
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connect with experienced mentors who can guide you through your tech career journey
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button 
            className="group px-6 py-6 text-lg transition-all duration-300 hover:shadow-md"
            onClick={() => navigate("/become-mentor")}
          >
            Become a Mentor
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="outline" 
            className="px-6 py-6 text-lg transition-all duration-300 hover:shadow-md"
          >
            Find a Mentor
          </Button>
        </div>
      </div>
      
      <div className="mt-24 text-center">
        <p className="text-muted-foreground">
          Join our community of tech professionals making a difference
        </p>
      </div>
    </div>
  );
};

export default Index;
