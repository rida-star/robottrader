import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">RobotTrader</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/learn" className="hover:text-foreground transition-colors">
              {t.nav.learn}
            </Link>
            <Link to="/support" className="hover:text-foreground transition-colors">
              {t.nav.support}
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground max-w-md">
            {language === "da" 
              ? "Kun til uddannelsesmæssige formål. Ikke finansiel rådgivning."
              : "For educational purposes only. Not financial advice."}
          </p>
        </div>
      </div>
    </footer>
  );
}
