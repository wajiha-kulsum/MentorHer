// components/faq-accordion.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function FAQAccordion() {
  const faqItems: FAQItem[] = [
    {
      id: "item-1",
      question: "How does the mentorship matching work?",
      answer: "Our AI-powered matching system analyzes your skills, goals, and preferences to connect you with the most compatible mentors. You'll receive 3-5 curated matches within 48 hours of signing up.",
    },
    {
      id: "item-2",
      question: "What's the time commitment for mentors?",
      answer: "We recommend 1-2 hours per month minimum, but you can set your own availability. Most mentors find the experience so rewarding they end up dedicating more time!",
    },
    {
      id: "item-3",
      question: "Is there a cost to join the platform?",
      answer: "Basic membership is free! Premium features like 1-on-1 coaching sessions and specialized workshops are available through our affordable subscription plans.",
    },
    {
      id: "item-4",
      question: "How do I know my data is secure?",
      answer: "We use enterprise-grade encryption and never share your data with third parties. Our platform is GDPR compliant and undergoes regular security audits.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      
      <Accordion 
        type="single" 
        collapsible 
        className="w-full space-y-4"
      >
        {faqItems.map((item) => (
          <AccordionItem 
            key={item.id}
            value={item.id} 
            className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline group">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
                  <ChevronDown className="w-5 h-5 text-white transform transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </div>
                <span className="text-lg font-medium text-gray-800 group-hover:text-purple-600">
                  {item.question}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-600">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}