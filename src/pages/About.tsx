import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Bot, TrendingUp, Shield, Users, Target, Award } from "lucide-react";

export default function About() {
  const { t, language } = useLanguage();
  const { user, signOut } = useAuth();

  const content = {
    da: {
      title: "Om os",
      subtitle: "Mød holdet bag RobotTrader",
      intro: "Vi er et dedikeret team af tradere og teknologi-entusiaster med en passion for at gøre algoritmisk trading tilgængelig for alle.",
      missionTitle: "Vores mission",
      missionText: "At demokratisere algoritmisk trading ved at give ikke-tekniske tradere de værktøjer og den viden, de har brug for til at bygge og forstå handelsrobotter – uden at skulle lære at kode.",
      experienceTitle: "Vores erfaring",
      experienceIntro: "Med over 10 års kombineret erfaring inden for trading og softwareudvikling har vi set både op- og nedture i markederne.",
      experience1Title: "Trading erfaring",
      experience1Text: "Vi har handlet aktivt på forex, aktier og krypto i mange år. Vi kender udfordringerne ved manuel trading – de sene nætter, de emotionelle beslutninger og behovet for konstant overvågning.",
      experience2Title: "Robot trading",
      experience2Text: "Vi har bygget, testet og optimeret handelsrobotter gennem årene. Vi har lært af vores fejl og succes'er, og vi deler denne viden med dig.",
      experience3Title: "Teknologi",
      experience3Text: "Vores team har stærke kompetencer inden for softwareudvikling, hvilket gør det muligt for os at skabe intuitive værktøjer, der gør komplekse koncepter enkle.",
      valuesTitle: "Vores værdier",
      value1Title: "Uddannelse først",
      value1Text: "Vi tror på, at viden er magt. Vores fokus er at lære dig at forstå trading, ikke at love hurtige penge.",
      value2Title: "Ærlighed om risiko",
      value2Text: "Vi skjuler ikke, at trading er risikabelt. Vi er åbne om de potentielle tab og opfordrer altid til demo-testing.",
      value3Title: "Tilgængelighed",
      value3Text: "Algoritmisk trading skal ikke være forbeholdt de få. Vores værktøjer er designet til alle uanset teknisk baggrund.",
      value4Title: "Kontinuerlig forbedring",
      value4Text: "Vi lytter til vores brugere og forbedrer konstant vores platform baseret på feedback.",
      disclaimerTitle: "Vigtig information",
      disclaimerText: "RobotTrader er et uddannelsesværktøj. Vi giver ikke finansiel rådgivning og garanterer ikke profit. Al trading indebærer risiko for tab. Du bør kun handle med penge, du har råd til at tabe.",
    },
    en: {
      title: "About Us",
      subtitle: "Meet the team behind RobotTrader",
      intro: "We are a dedicated team of traders and technology enthusiasts with a passion for making algorithmic trading accessible to everyone.",
      missionTitle: "Our Mission",
      missionText: "To democratize algorithmic trading by giving non-technical traders the tools and knowledge they need to build and understand trading robots – without having to learn to code.",
      experienceTitle: "Our Experience",
      experienceIntro: "With over 10 years of combined experience in trading and software development, we have seen both ups and downs in the markets.",
      experience1Title: "Trading Experience",
      experience1Text: "We have actively traded forex, stocks, and crypto for many years. We know the challenges of manual trading – the late nights, emotional decisions, and the need for constant monitoring.",
      experience2Title: "Robot Trading",
      experience2Text: "We have built, tested, and optimized trading robots over the years. We have learned from our mistakes and successes, and we share this knowledge with you.",
      experience3Title: "Technology",
      experience3Text: "Our team has strong competencies in software development, which enables us to create intuitive tools that make complex concepts simple.",
      valuesTitle: "Our Values",
      value1Title: "Education First",
      value1Text: "We believe knowledge is power. Our focus is to teach you to understand trading, not to promise quick money.",
      value2Title: "Honesty About Risk",
      value2Text: "We don't hide that trading is risky. We are open about potential losses and always encourage demo testing.",
      value3Title: "Accessibility",
      value3Text: "Algorithmic trading should not be reserved for the few. Our tools are designed for everyone regardless of technical background.",
      value4Title: "Continuous Improvement",
      value4Text: "We listen to our users and constantly improve our platform based on feedback.",
      disclaimerTitle: "Important Information",
      disclaimerText: "RobotTrader is an educational tool. We do not provide financial advice and do not guarantee profits. All trading involves risk of loss. You should only trade with money you can afford to lose.",
    },
  };

  const c = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated={!!user} onLogout={signOut} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
                <Bot className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {c.title}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {c.subtitle}
            </p>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {c.intro}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-4">
            <div className="text-center mb-12">
              <Target className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">{c.missionTitle}</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {c.missionText}
              </p>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <Award className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">{c.experienceTitle}</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                {c.experienceIntro}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-card p-6 border border-border">
                <TrendingUp className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{c.experience1Title}</h3>
                <p className="text-muted-foreground">{c.experience1Text}</p>
              </div>
              <div className="rounded-xl bg-card p-6 border border-border">
                <Bot className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{c.experience2Title}</h3>
                <p className="text-muted-foreground">{c.experience2Text}</p>
              </div>
              <div className="rounded-xl bg-card p-6 border border-border">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{c.experience3Title}</h3>
                <p className="text-muted-foreground">{c.experience3Text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center mb-12">
              <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground">{c.valuesTitle}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.value1Title}</h3>
                <p className="text-muted-foreground">{c.value1Text}</p>
              </div>
              <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.value2Title}</h3>
                <p className="text-muted-foreground">{c.value2Text}</p>
              </div>
              <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.value3Title}</h3>
                <p className="text-muted-foreground">{c.value3Text}</p>
              </div>
              <div className="rounded-xl bg-primary/5 p-6 border border-primary/10">
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.value4Title}</h3>
                <p className="text-muted-foreground">{c.value4Text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="py-12 bg-destructive/5 border-t border-destructive/10">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">{c.disclaimerTitle}</h3>
            <p className="text-muted-foreground">{c.disclaimerText}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
