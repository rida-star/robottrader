import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, HelpCircle, Bot, Code, Calendar, ArrowRight } from "lucide-react";
import { toast } from "sonner";

// Mock data - will be replaced with Supabase
const mockRobots = [
  {
    id: "1",
    name: "Trend Follower EA",
    platform: "MT4",
    strategy: "trend_following",
    createdAt: "2024-01-15",
  },
  {
    id: "2", 
    name: "Breakout Bot",
    platform: "MT5",
    strategy: "breakout",
    createdAt: "2024-01-10",
  },
];

const Dashboard = () => {
  const { t, language } = useLanguage();

  // Mock user - will be replaced with auth
  const userName = "Trader";

  const strategyLabels: Record<string, string> = {
    trend_following: language === "da" ? "Trend-følgende" : "Trend following",
    breakout: language === "da" ? "Breakout" : "Breakout",
    range: language === "da" ? "Range trading" : "Range trading",
    custom: language === "da" ? "Tilpasset" : "Custom",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated onLogout={() => window.location.href = "/"} />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">
              {t.dashboard.welcome}, {userName} 👋
            </h1>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <Link
              to="/builder"
              className="group relative overflow-hidden rounded-xl bg-primary p-6 text-primary-foreground transition-all hover:shadow-lg animate-fade-in"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Plus className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-semibold">{t.dashboard.startNewRobot}</h3>
                </div>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/learn"
              className="group rounded-xl border border-border bg-card p-6 card-shadow transition-all hover:card-shadow-hover animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <BookOpen className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{t.dashboard.goToLearn}</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              to="/support"
              className="group rounded-xl border border-border bg-card p-6 card-shadow transition-all hover:card-shadow-hover animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <HelpCircle className="h-8 w-8 mb-2 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">{t.dashboard.goToSupport}</h3>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>

          {/* Robots List */}
          <div className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">{t.dashboard.recentRobots}</h2>
            </div>

            {mockRobots.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">{t.dashboard.noRobots}</h3>
                <Button asChild>
                  <Link to="/builder">{t.dashboard.createFirst}</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {mockRobots.map((robot) => (
                  <div
                    key={robot.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 card-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                        <Bot className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{robot.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="inline-flex items-center gap-1">
                            <Code className="h-3 w-3" />
                            {robot.platform}
                          </span>
                          <span>{strategyLabels[robot.strategy]}</span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {robot.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info(
                          language === "da" 
                            ? "Dette er en eksempel-robot. Opret din egen robot for at se og redigere kode." 
                            : "This is an example robot. Create your own robot to view and edit code."
                        )}
                      >
                        {t.dashboard.viewCode}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info(
                          language === "da" 
                            ? "Dette er en eksempel-robot. Opret din egen robot for at redigere den." 
                            : "This is an example robot. Create your own robot to edit it."
                        )}
                      >
                        {t.dashboard.editRobot}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
