"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MenteeForm from "../../myComponents/MenteeForm";

const BecomeMentor = () => {
  const router= useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form data submitted:", data);
    toast.success("Application submitted", {
      description: "Your mentor profile has been created!",
    });
    setIsSubmitting(false);
    // Redirect to mentor dashboard
    router.push("/mentor-dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-lg font-medium">Become a Mentor</h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  Mentor Application
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-3">
                  Share Your Expertise
                </h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Help shape the future of women in technology by becoming a mentor.
                  Fill out the form below to begin your mentorship journey.
                </p>
              </div>

              <MenteeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BecomeMentor;