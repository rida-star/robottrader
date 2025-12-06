import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const pricingLabel = { da: "Priser", en: "Pricing" };

export default function Pricing() {
  const { t, language } = useLanguage();
  const { user, signOut } = useAuth();

  const plans = [
    {
      name: language === "da" ? "Gratis" : "Free",
      price: "0",
      description: language === "da" 
        ? "Perfekt til at komme i gang og lære grundlæggende"
        : "Perfect for getting started and learning the basics",
      features: language === "da" 
        ? [
            "Adgang til Robot Builder",
            "Op til 2 gemte robotter",
            "Grundlæggende lektioner",
            "Support via e-mail",
            "Eksport af kode (MQ4/MQ5)",
          ]
        : [
            "Access to Robot Builder",
            "Up to 2 saved robots",
            "Basic lessons",
            "Email support",
            "Code export (MQ4/MQ5)",
          ],
      cta: language === "da" ? "Kom i gang gratis" : "Get started free",
      highlighted: false,
      current: true,
    },
    {
      name: "Pro",
      price: "99",
      description: language === "da" 
        ? "For seriøse tradere der vil have mere"
        : "For serious traders who want more",
      features: language === "da" 
        ? [
            "Alt i Gratis, plus:",
            "Ubegrænset gemte robotter",
            "Avancerede strategier",
            "Alle lektioner låst op",
            "Prioriteret support",
            "Eksklusive guides",
          ]
        : [
            "Everything in Free, plus:",
            "Unlimited saved robots",
            "Advanced strategies",
            "All lessons unlocked",
            "Priority support",
            "Exclusive guides",
          ],
      cta: language === "da" ? "Opgrader til Pro" : "Upgrade to Pro",
      highlighted: true,
      current: false,
    },
    {
      name: "Business",
      price: "249",
      description: language === "da" 
        ? "For teams og professionelle tradere"
        : "For teams and professional traders",
      features: language === "da" 
        ? [
            "Alt i Pro, plus:",
            "Team adgang (op til 5)",
            "Dedikeret support",
            "Custom strategier",
            "API adgang",
            "Onboarding session",
          ]
        : [
            "Everything in Pro, plus:",
            "Team access (up to 5)",
            "Dedicated support",
            "Custom strategies",
            "API access",
            "Onboarding session",
          ],
      cta: language === "da" ? "Kontakt os" : "Contact us",
      highlighted: false,
      current: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated={!!user} onLogout={signOut} />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {language === "da" ? "Vælg den rigtige plan" : "Choose the right plan"}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {language === "da" 
                ? "Start gratis og opgrader når du er klar. Ingen skjulte gebyrer."
                : "Start free and upgrade when you're ready. No hidden fees."}
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="pb-20 px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative rounded-2xl border p-8 flex flex-col",
                    plan.highlighted 
                      ? "border-primary bg-primary/5 shadow-lg" 
                      : "border-border bg-card"
                  )}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                        {language === "da" ? "Populær" : "Popular"}
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price === "0" ? (language === "da" ? "Gratis" : "Free") : `€${plan.price}`}
                    </span>
                    {plan.price !== "0" && (
                      <span className="text-muted-foreground ml-1">
                        / {language === "da" ? "måned" : "month"}
                      </span>
                    )}
                  </div>

                  <Button 
                    variant={plan.highlighted ? "default" : "outline"} 
                    className="mb-6 w-full"
                    asChild={plan.current}
                  >
                    {plan.current ? (
                      <Link to="/auth">{plan.cta}</Link>
                    ) : (
                      <span>{plan.cta}</span>
                    )}
                  </Button>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-20 px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-center text-foreground mb-8">
              {language === "da" ? "Ofte stillede spørgsmål" : "Frequently asked questions"}
            </h2>
            
            <div className="space-y-6">
              <div className="border border-border rounded-lg p-6 bg-card">
                <h3 className="font-semibold text-foreground">
                  {language === "da" ? "Kan jeg skifte plan senere?" : "Can I change plans later?"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {language === "da" 
                    ? "Ja, du kan opgradere eller nedgradere din plan når som helst. Ændringen træder i kraft med det samme."
                    : "Yes, you can upgrade or downgrade your plan at any time. The change takes effect immediately."}
                </p>
              </div>
              
              <div className="border border-border rounded-lg p-6 bg-card">
                <h3 className="font-semibold text-foreground">
                  {language === "da" ? "Er der bindingsperiode?" : "Is there a commitment period?"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {language === "da" 
                    ? "Nej, alle planer er måned-til-måned. Du kan annullere når som helst."
                    : "No, all plans are month-to-month. You can cancel anytime."}
                </p>
              </div>
              
              <div className="border border-border rounded-lg p-6 bg-card">
                <h3 className="font-semibold text-foreground">
                  {language === "da" ? "Hvad sker der med mine robotter hvis jeg nedgraderer?" : "What happens to my robots if I downgrade?"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {language === "da" 
                    ? "Dine robotter forbliver gemt, men du kan kun redigere de nyeste op til grænsen for din plan."
                    : "Your robots remain saved, but you can only edit the most recent ones up to your plan's limit."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <DisclaimerBanner />
      <Footer />
    </div>
  );
}
