import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { Button } from "@/components/ui/button";
import { Bot, Settings, Code, Target, Shield, Users, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center animate-fade-in">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Bot className="h-4 w-4" />
                MT4 & MT5 Robot Builder
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t.landing.heroTitle}
              </h1>
              
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                {t.landing.heroSubtitle}
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
                  <Link to="/auth?mode=signup">
                    {t.landing.ctaStart}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link to="/learn">{t.landing.ctaLearn}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-muted/30 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-foreground mb-12">
              {t.landing.howItWorks}
            </h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: Target, title: t.landing.step1Title, desc: t.landing.step1Desc, step: "01" },
                { icon: Settings, title: t.landing.step2Title, desc: t.landing.step2Desc, step: "02" },
                { icon: Code, title: t.landing.step3Title, desc: t.landing.step3Desc, step: "03" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative rounded-xl bg-card p-6 card-shadow transition-all hover:card-shadow-hover animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                    <item.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What you'll learn */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {t.landing.whatYouLearn}
                </h2>
                <ul className="space-y-4">
                  {[t.landing.learn1, t.landing.learn2, t.landing.learn3, t.landing.learn4].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 animate-slide-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="rounded-xl bg-gradient-to-br from-primary/5 to-accent p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t.landing.whoIsFor}
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Users, text: t.landing.forTraders },
                    { icon: Lightbulb, text: t.landing.forBeginners },
                    { icon: Bot, text: t.landing.forCurious },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-card">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="pb-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <DisclaimerBanner />
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t.landing.heroTitle}
            </h2>
            <Button size="lg" className="gap-2" asChild>
              <Link to="/auth?mode=signup">
                {t.landing.ctaStart}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
