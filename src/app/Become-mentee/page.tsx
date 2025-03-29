"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MenteeForm from "../../myComponents/MenteeForm"; // Ensure your MentorForm collects the correct fields

const BecomeMentor: React.FC = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [menteeData, setMenteeData] = useState<any>(null);
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Call the API endpoint that creates a mentor (using the Mentee model)
      const res = await fetch("/api/mentee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || "Submission failed");
        return;
      }
      toast.success("Application submitted", {
        description: "Thank you for applying to be a mentor!",
      });
      // Optionally navigate to a dashboard or success page
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    async function fetchMenteeData() {
      try {
        const res = await fetch('/api/auth/menteedata');
  
        // If the response is unauthorized, redirect to login
        if (res.status === 401) {
          router.push('/auth/login');
          return; // Stop further processing
        }
  
        const json = await res.json();
  
        // Check if mentee data exists
        if (json.success && json.data) {
          setMenteeData(json.data);
          router.push('/mentee-dashboard');
        } else {
          router.push('/Become-mentee');
        }
      } catch (error) {
        console.error("Error fetching mentee data:", error);
        router.push('/Become-mentee');
      } finally {
        setLoading(false);
      }
    }
    fetchMenteeData();
  }, [router]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
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
              {/* MentorForm collects data matching the Mentee model */}
              <MenteeForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BecomeMentor;
