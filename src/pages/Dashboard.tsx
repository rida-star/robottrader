import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, HelpCircle, Bot, Code, Calendar, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Robot {
  id: string;
  name: string;
  platform: string;
  strategy_type: string;
  generated_code: string | null;
  created_at: string;
}

const Dashboard = () => {
  const { t, language } = useLanguage();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [robots, setRobots] = useState<Robot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRobot, setSelectedRobot] = useState<Robot | null>(null);

  useEffect(() => {
    fetchRobots();
  }, []);

  const fetchRobots = async () => {
    try {
      const { data, error } = await supabase
        .from("robots")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRobots(data || []);
    } catch (error) {
      console.error("Error fetching robots:", error);
      toast.error(language === "da" ? "Kunne ikke hente robotter" : "Failed to fetch robots");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteRobot = async (robotId: string) => {
    try {
      const { error } = await supabase
        .from("robots")
        .delete()
        .eq("id", robotId);

      if (error) throw error;
      
      setRobots(robots.filter(r => r.id !== robotId));
      toast.success(language === "da" ? "Robot slettet" : "Robot deleted");
    } catch (error) {
      console.error("Error deleting robot:", error);
      toast.error(language === "da" ? "Kunne ikke slette robot" : "Failed to delete robot");
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const strategyLabels: Record<string, string> = {
    trend_following: language === "da" ? "Trend-følgende" : "Trend following",
    breakout: language === "da" ? "Breakout" : "Breakout",
    range: language === "da" ? "Range trading" : "Range trading",
    custom: language === "da" ? "Tilpasset" : "Custom",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "da" ? "da-DK" : "en-US");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated onLogout={handleLogout} />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Welcome */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground">
              {t.dashboard.welcome}, {user?.email?.split("@")[0] || "Trader"} 👋
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

            {isLoading ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : robots.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
                <Bot className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">{t.dashboard.noRobots}</h3>
                <Button asChild>
                  <Link to="/builder">{t.dashboard.createFirst}</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {robots.map((robot) => (
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
                          <span>{strategyLabels[robot.strategy_type] || robot.strategy_type}</span>
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(robot.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRobot(robot)}
                      >
                        {t.dashboard.viewCode}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteRobot(robot.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Code Modal */}
      <Dialog open={!!selectedRobot} onOpenChange={() => setSelectedRobot(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRobot?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <pre className="rounded-lg bg-muted p-4 text-xs overflow-x-auto">
              <code>{selectedRobot?.generated_code || (language === "da" ? "Ingen kode genereret" : "No code generated")}</code>
            </pre>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                if (selectedRobot?.generated_code) {
                  navigator.clipboard.writeText(selectedRobot.generated_code);
                  toast.success(language === "da" ? "Kode kopieret!" : "Code copied!");
                }
              }}
            >
              {language === "da" ? "Kopier kode" : "Copy code"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Dashboard;
