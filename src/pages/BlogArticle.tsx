import { useParams, Link, Navigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";

import blogAutomation from "@/assets/blog/blog-automation.jpg";
import blogRisks from "@/assets/blog/blog-risks.jpg";
import blogBenefits from "@/assets/blog/blog-benefits.jpg";
import blogMistakes from "@/assets/blog/blog-mistakes.jpg";
import blogFuture from "@/assets/blog/blog-future.jpg";
import blogDemoAccount from "@/assets/blog/blog-demo-account.jpg";

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const articleImages: Record<string, string> = {
    "what-is-algorithmic-trading": blogAutomation,
    "risks-of-robot-trading": blogRisks,
    "benefits-of-automated-trading": blogBenefits,
    "common-robot-trading-mistakes": blogMistakes,
    "future-of-trading-robots": blogFuture,
    "importance-of-demo-testing": blogDemoAccount,
  };

  const articleMeta: Record<string, { category: string; date: string }> = {
    "what-is-algorithmic-trading": { category: t.blog.categoryBasics, date: "2024-01-15" },
    "risks-of-robot-trading": { category: t.blog.categoryRisk, date: "2024-01-20" },
    "benefits-of-automated-trading": { category: t.blog.categoryBasics, date: "2024-01-25" },
    "common-robot-trading-mistakes": { category: t.blog.categoryRisk, date: "2024-02-01" },
    "future-of-trading-robots": { category: t.blog.categoryTrends, date: "2024-02-10" },
    "importance-of-demo-testing": { category: t.blog.categoryTips, date: "2024-02-15" },
  };

  if (!slug || !articleImages[slug]) {
    return <Navigate to="/blog" replace />;
  }

  const articleData = t.blog.articles[slug as keyof typeof t.blog.articles];
  const meta = articleMeta[slug];
  const image = articleImages[slug];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={!!user} onLogout={signOut} />
      <DisclaimerBanner />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.blog.backToBlog}
          </Link>
        </Button>

        <article>
          <div className="mb-6 flex items-center gap-3">
            <Badge variant="secondary">{meta.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(meta.date).toLocaleDateString()}
            </span>
          </div>

          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {articleData.title}
          </h1>

          <div className="mb-8 aspect-video overflow-hidden rounded-lg">
            <img
              src={image}
              alt={articleData.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            {articleData.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
            <p className="text-sm text-muted-foreground">
              <strong>{t.blog.disclaimer}:</strong> {t.blog.disclaimerText}
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
