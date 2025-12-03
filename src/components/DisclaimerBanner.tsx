import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function DisclaimerBanner() {
  const { t } = useLanguage();

  return (
    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-foreground mb-1">{t.landing.disclaimer}</h4>
          <p className="text-sm text-muted-foreground">{t.landing.disclaimerText}</p>
        </div>
      </div>
    </div>
  );
}
