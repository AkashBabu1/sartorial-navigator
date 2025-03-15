
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqItems = [
    {
      question: "Is this application free to use?",
      answer: "Yes! The basic version is free with up to 30 clothing items. We also offer a Premium subscription with unlimited uploads and advanced features for $4.99/month."
    },
    {
      question: "What's the difference between free and Premium accounts?",
      answer: "Free accounts include 30 clothing items and 15 saved outfits. Premium users get unlimited uploads, priority processing, advanced color matching, and exclusive access to our virtual try-on feature."
    },
    {
      question: "How many clothing items can I upload?",
      answer: "Free users can upload up to 30 clothing items. Premium users enjoy unlimited wardrobe capacity."
    },
    {
      question: "What types of clothing can I upload?",
      answer: "You can upload tops, bottoms, dresses, outerwear, and accessories. Our AI recognizes and categorizes most common clothing items for optimal matching."
    },
    {
      question: "Is my body photo stored securely?",
      answer: "Absolutely. All photos are encrypted, stored securely, and never shared with third parties. You can delete your photos anytime from your account settings."
    },
    {
      question: "Is my data private?",
      answer: "Yes, we take privacy seriously. Your wardrobe data and preferences are only used to provide better recommendations and are never sold to third parties."
    }
  ];

  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-muted px-3 py-1 rounded-full text-xs font-medium mb-4">
            Support
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about OutfitAI
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
