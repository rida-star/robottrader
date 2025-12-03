import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { HelpCircle, Send, MessageSquare } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  subject: z.string().min(1).max(200),
  category: z.string().min(1),
  message: z.string().min(1).max(2000),
});

const Support = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({
        title: language === "da" ? "Fejl" : "Error",
        description: language === "da" ? "Udfyld venligst alle felter korrekt" : "Please fill in all fields correctly",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("support_tickets")
        .insert({
          user_id: user?.id || null,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          category: formData.category,
          message: formData.message,
        });

      if (error) throw error;

      toast({
        title: t.support.messageSent,
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting support ticket:", error);
      toast({
        title: language === "da" ? "Fejl" : "Error",
        description: language === "da" ? "Kunne ikke sende besked. Prøv igen." : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const faqItems = [
    { q: t.support.faq.q1, a: t.support.faq.a1 },
    { q: t.support.faq.q2, a: t.support.faq.a2 },
    { q: t.support.faq.q3, a: t.support.faq.a3 },
    { q: t.support.faq.q4, a: t.support.faq.a4 },
    { q: t.support.faq.q5, a: t.support.faq.a5 },
  ];

  const categories = [
    { value: "question", label: t.support.categories.question },
    { value: "bug", label: t.support.categories.bug },
    { value: "feedback", label: t.support.categories.feedback },
    { value: "other", label: t.support.categories.other },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated={!!user} onLogout={handleLogout} />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <HelpCircle className="h-4 w-4" />
              {t.support.title}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.support.subtitle}
            </h1>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* FAQ */}
            <section className="animate-fade-in">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                {t.support.faqTitle}
              </h2>
              
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Contact Form */}
            <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                {t.support.contactTitle}
              </h2>
              
              <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6 card-shadow space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.support.name}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.support.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="subject">{t.support.subject}</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">{t.support.category}</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.support.message}</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? t.common.loading : (
                    <>
                      <Send className="h-4 w-4" />
                      {t.support.send}
                    </>
                  )}
                </Button>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
