import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().email().max(255);
const passwordSchema = z.string().min(6).max(128);

const Auth = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLogin(searchParams.get("mode") !== "signup");
  }, [searchParams]);

  const getErrorMessage = (error: Error) => {
    const message = error.message.toLowerCase();
    
    if (message.includes("user already registered")) {
      return language === "da" 
        ? "Denne email er allerede registreret. Prøv at logge ind i stedet."
        : "This email is already registered. Try logging in instead.";
    }
    if (message.includes("invalid login credentials")) {
      return language === "da"
        ? "Forkert email eller adgangskode."
        : "Invalid email or password.";
    }
    if (message.includes("email not confirmed")) {
      return language === "da"
        ? "Bekræft venligst din email før du logger ind."
        : "Please confirm your email before logging in.";
    }
    
    return language === "da" ? "Der opstod en fejl. Prøv igen." : "An error occurred. Please try again.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      toast({
        title: language === "da" ? "Fejl" : "Error",
        description: language === "da" ? "Ugyldig email adresse" : "Invalid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Validate password
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      toast({
        title: language === "da" ? "Fejl" : "Error",
        description: language === "da" 
          ? "Adgangskoden skal være mindst 6 tegn" 
          : "Password must be at least 6 characters",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check password confirmation for signup
    if (!isLogin && password !== confirmPassword) {
      toast({
        title: language === "da" ? "Fejl" : "Error",
        description: language === "da" ? "Adgangskoderne matcher ikke" : "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: language === "da" ? "Fejl" : "Error",
            description: getErrorMessage(error),
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        toast({
          title: language === "da" ? "Logget ind!" : "Logged in!",
          description: language === "da" ? "Omdirigerer til oversigt..." : "Redirecting to dashboard...",
        });
        navigate("/dashboard");
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          toast({
            title: language === "da" ? "Fejl" : "Error",
            description: getErrorMessage(error),
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        toast({
          title: language === "da" ? "Konto oprettet!" : "Account created!",
          description: language === "da" ? "Omdirigerer til oversigt..." : "Redirecting to dashboard...",
        });
        navigate("/dashboard");
      }
    } catch {
      toast({
        title: language === "da" ? "Fejl" : "Error",
        description: language === "da" ? "Der opstod en fejl. Prøv igen." : "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Bot className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">RobotTrader</span>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-xl border border-border bg-card p-8 card-shadow">
            <h1 className="text-2xl font-bold text-center text-foreground mb-2">
              {isLogin ? t.auth.loginTitle : t.auth.signupTitle}
            </h1>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.auth.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.auth.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder={t.auth.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={t.auth.passwordPlaceholder}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading ? (
                  t.common.loading
                ) : (
                  <>
                    {isLogin ? t.auth.loginButton : t.auth.signupButton}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              {isLogin ? (
                <p className="text-muted-foreground">
                  {t.auth.noAccount}{" "}
                  <Link
                    to="/auth?mode=signup"
                    className="font-medium text-primary hover:underline"
                  >
                    {t.nav.signup}
                  </Link>
                </p>
              ) : (
                <p className="text-muted-foreground">
                  {t.auth.hasAccount}{" "}
                  <Link
                    to="/auth"
                    className="font-medium text-primary hover:underline"
                  >
                    {t.nav.login}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
