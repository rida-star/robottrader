import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlayCircle, Clock, ArrowRight } from "lucide-react";

interface Lesson {
  id: string;
  slug: string;
  level: 1 | 2 | 3;
  duration: number;
  relatedStep?: number;
}

const lessons: Lesson[] = [
  { id: "basics1", slug: "what-is-trading-robot", level: 1, duration: 10 },
  { id: "basics2", slug: "mt4-vs-mt5", level: 1, duration: 8, relatedStep: 1 },
  { id: "strategy1", slug: "first-strategy", level: 2, duration: 15, relatedStep: 2 },
  { id: "strategy2", slug: "indicators-explained", level: 2, duration: 12, relatedStep: 3 },
  { id: "risk1", slug: "risk-management-basics", level: 3, duration: 10, relatedStep: 4 },
  { id: "risk2", slug: "common-mistakes", level: 3, duration: 8 },
];

const Learn = () => {
  const { t, language } = useLanguage();

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return t.learn.level1;
      case 2: return t.learn.level2;
      case 3: return t.learn.level3;
      default: return "";
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-success/10 text-success border-success/20";
      case 2: return "bg-warning/10 text-warning border-warning/20";
      case 3: return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "";
    }
  };

  const getLesson = (id: string) => {
    const key = id as keyof typeof t.learn.lessons;
    return t.learn.lessons[key];
  };

  const groupedLessons = {
    1: lessons.filter(l => l.level === 1),
    2: lessons.filter(l => l.level === 2),
    3: lessons.filter(l => l.level === 3),
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated onLogout={() => window.location.href = "/"} />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <BookOpen className="h-4 w-4" />
              {t.learn.title}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t.learn.subtitle}
            </h1>
          </div>

          {/* Levels */}
          <div className="space-y-12">
            {([1, 2, 3] as const).map((level, levelIndex) => (
              <section 
                key={level} 
                className="animate-fade-in"
                style={{ animationDelay: `${levelIndex * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="outline" className={getLevelColor(level)}>
                    {t.learn.level} {level}
                  </Badge>
                  <h2 className="text-xl font-semibold text-foreground">
                    {getLevelLabel(level)}
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupedLessons[level].map((lesson, index) => {
                    const lessonData = getLesson(lesson.id);
                    return (
                      <Link
                        key={lesson.id}
                        to={`/learn/${lesson.slug}`}
                        className="group rounded-xl border border-border bg-card p-6 card-shadow transition-all hover:card-shadow-hover hover:border-primary/30"
                        style={{ animationDelay: `${(levelIndex * 100) + (index * 50)}ms` }}
                      >
                        {/* Video placeholder */}
                        <div className="relative aspect-video rounded-lg bg-muted mb-4 overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PlayCircle className="h-12 w-12 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                          </div>
                        </div>

                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {lessonData.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {lessonData.desc}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {lesson.duration} {t.learn.minutes}
                          </div>
                          {lesson.relatedStep && (
                            <span className="text-xs text-primary">
                              {t.learn.relatedStep}: {lesson.relatedStep}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center animate-fade-in">
            <div className="rounded-xl bg-muted/50 p-8 sm:p-12">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {language === "da" 
                  ? "Klar til at bygge din første robot?"
                  : "Ready to build your first robot?"}
              </h3>
              <Button asChild size="lg" className="gap-2">
                <Link to="/builder">
                  {language === "da" ? "Start Robot Builder" : "Start Robot Builder"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
