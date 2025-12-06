import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";

import blogAutomation from "@/assets/blog/blog-automation.jpg";
import blogRisks from "@/assets/blog/blog-risks.jpg";
import blogBenefits from "@/assets/blog/blog-benefits.jpg";
import blogMistakes from "@/assets/blog/blog-mistakes.jpg";
import blogFuture from "@/assets/blog/blog-future.jpg";
import blogDemoAccount from "@/assets/blog/blog-demo-account.jpg";

export default function Blog() {
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

  const articles = [
    {
      slug: "what-is-algorithmic-trading",
      image: blogAutomation,
      category: t.blog.categoryBasics,
      date: "2024-01-15",
    },
    {
      slug: "risks-of-robot-trading",
      image: blogRisks,
      category: t.blog.categoryRisk,
      date: "2024-01-20",
    },
    {
      slug: "benefits-of-automated-trading",
      image: blogBenefits,
      category: t.blog.categoryBasics,
      date: "2024-01-25",
    },
    {
      slug: "common-robot-trading-mistakes",
      image: blogMistakes,
      category: t.blog.categoryRisk,
      date: "2024-02-01",
    },
    {
      slug: "future-of-trading-robots",
      image: blogFuture,
      category: t.blog.categoryTrends,
      date: "2024-02-10",
    },
    {
      slug: "importance-of-demo-testing",
      image: blogDemoAccount,
      category: t.blog.categoryTips,
      date: "2024-02-15",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAuthenticated={!!user} onLogout={signOut} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {t.blog.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => {
            const articleData = t.blog.articles[article.slug as keyof typeof t.blog.articles];
            return (
              <Link key={article.slug} to={`/blog/${article.slug}`}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={articleData.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h2 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {articleData.title}
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {articleData.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {t.blog.readMore}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>

      <DisclaimerBanner />
      <Footer />
    </div>
  );
}
