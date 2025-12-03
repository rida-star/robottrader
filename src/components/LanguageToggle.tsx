import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      <Button
        variant={language === "da" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("da")}
        className="h-7 px-3 text-xs font-medium"
      >
        DA
      </Button>
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className="h-7 px-3 text-xs font-medium"
      >
        EN
      </Button>
    </div>
  );
}
