import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-pastel-purple via-pastel-pink to-pastel-blue overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-pastel-pink/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-pastel-blue/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-pastel-purple/40 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="animate-fade-in max-w-2xl">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-purple-dark bg-pastel-purple rounded-full">
              Find your tech mentor today
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connect with Women <br />
              <span className="text-primary">Leading in Tech</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground max-w-xl">
              Mentorship designed to empower women in technology. Access personalized guidance, 
              schedule sessions, and accelerate your career journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white button-hover">
                {/* <Link to="/#" className="flex items-center">
                  Find a Mentor
                  <ArrowRight size={18} className="ml-2" />
                </Link> */}
                Find a Mentor
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 button-hover">
                Become a Mentor
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-pastel-pink" />
                <div className="w-8 h-8 rounded-full bg-pastel-blue" />
                <div className="w-8 h-8 rounded-full bg-pastel-purple" />
                <div className="w-8 h-8 rounded-full bg-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Join 1,000+ women already growing their careers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

