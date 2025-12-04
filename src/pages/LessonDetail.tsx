import { useParams, Link, Navigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

import lessonBasics1 from "@/assets/lessons/lesson-basics1.jpg";
import lessonBasics2 from "@/assets/lessons/lesson-basics2.jpg";
import lessonBasics3 from "@/assets/lessons/lesson-basics3.jpg";
import lessonStrategy1 from "@/assets/lessons/lesson-strategy1.jpg";
import lessonStrategy2 from "@/assets/lessons/lesson-strategy2.jpg";
import lessonStrategy3 from "@/assets/lessons/lesson-strategy3.jpg";
import lessonRisk1 from "@/assets/lessons/lesson-risk1.jpg";
import lessonRisk2 from "@/assets/lessons/lesson-risk2.jpg";
import lessonRisk3 from "@/assets/lessons/lesson-risk3.jpg";

interface LessonContent {
  id: string;
  slug: string;
  level: 1 | 2 | 3;
  image: string;
  relatedStep?: number;
  nextSlug?: string;
  prevSlug?: string;
}

const lessonData: LessonContent[] = [
  { id: "basics1", slug: "what-is-trading-robot", level: 1, image: lessonBasics1, nextSlug: "mt4-vs-mt5" },
  { id: "basics2", slug: "mt4-vs-mt5", level: 1, image: lessonBasics2, relatedStep: 1, prevSlug: "what-is-trading-robot", nextSlug: "install-robot-mt4" },
  { id: "basics3", slug: "install-robot-mt4", level: 1, image: lessonBasics3, prevSlug: "mt4-vs-mt5", nextSlug: "first-strategy" },
  { id: "strategy1", slug: "first-strategy", level: 2, image: lessonStrategy1, relatedStep: 2, prevSlug: "install-robot-mt4", nextSlug: "indicators-explained" },
  { id: "strategy2", slug: "indicators-explained", level: 2, image: lessonStrategy2, relatedStep: 3, prevSlug: "first-strategy", nextSlug: "backtesting-basics" },
  { id: "strategy3", slug: "backtesting-basics", level: 2, image: lessonStrategy3, prevSlug: "indicators-explained", nextSlug: "risk-management-basics" },
  { id: "risk1", slug: "risk-management-basics", level: 3, image: lessonRisk1, relatedStep: 4, prevSlug: "backtesting-basics", nextSlug: "common-mistakes" },
  { id: "risk2", slug: "common-mistakes", level: 3, image: lessonRisk2, prevSlug: "risk-management-basics", nextSlug: "position-sizing" },
  { id: "risk3", slug: "position-sizing", level: 3, image: lessonRisk3, prevSlug: "common-mistakes" },
];

const LessonDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  const lesson = lessonData.find((l) => l.slug === slug);

  if (!lesson) {
    return <Navigate to="/learn" replace />;
  }

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

  const getLessonMeta = (id: string) => {
    const key = id as keyof typeof t.learn.lessons;
    return t.learn.lessons[key];
  };

  const getLessonContent = (id: string): { title: string; sections: { heading: string; content: string }[] } => {
    const contents: Record<string, { da: { title: string; sections: { heading: string; content: string }[] }; en: { title: string; sections: { heading: string; content: string }[] } }> = {
      basics1: {
        da: {
          title: "Hvad er en handelsrobot?",
          sections: [
            {
              heading: "Introduktion til handelsrobotter",
              content: "En handelsrobot, også kaldet Expert Advisor (EA) i MetaTrader, er et automatiseret program der kan åbne og lukke handler på dine vegne baseret på foruddefinerede regler. I stedet for at sidde foran skærmen hele dagen, kan robotten overvåge markedet 24/7 og handle når dine kriterier er opfyldt."
            },
            {
              heading: "Fordele ved automatiseret trading",
              content: "Handelsrobotter fjerner den emotionelle faktor fra trading. De følger reglerne konsekvent uden at lade sig påvirke af frygt eller grådighed. De kan også reagere hurtigere end mennesker og handle på flere markeder samtidigt. Derudover kan de teste strategier på historiske data (backtesting) for at se hvordan de ville have klaret sig."
            },
            {
              heading: "Begrænsninger at være opmærksom på",
              content: "Robotter er kun så gode som de regler, de er programmeret med. De kan ikke tilpasse sig til uventede markedsforhold som nyhedsbegivenheder. Der er ingen garanti for profit, og dårligt designede robotter kan tabe penge hurtigt. Derfor er det vigtigt at teste grundigt på demo-konti først."
            },
            {
              heading: "Hvad du lærer i denne app",
              content: "I denne app lærer du at omsætte dine trading-idéer til klare regler, som kan bruges til at bygge en simpel handelsrobot. Du behøver ikke at kunne programmere – vi hjælper dig med at generere koden baseret på dine valg."
            }
          ]
        },
        en: {
          title: "What is a trading robot?",
          sections: [
            {
              heading: "Introduction to trading robots",
              content: "A trading robot, also called Expert Advisor (EA) in MetaTrader, is an automated program that can open and close trades on your behalf based on predefined rules. Instead of sitting in front of the screen all day, the robot can monitor the market 24/7 and trade when your criteria are met."
            },
            {
              heading: "Advantages of automated trading",
              content: "Trading robots remove the emotional factor from trading. They follow rules consistently without being influenced by fear or greed. They can also react faster than humans and trade multiple markets simultaneously. Additionally, they can test strategies on historical data (backtesting) to see how they would have performed."
            },
            {
              heading: "Limitations to be aware of",
              content: "Robots are only as good as the rules they are programmed with. They cannot adapt to unexpected market conditions like news events. There is no guarantee of profit, and poorly designed robots can lose money quickly. That's why it's important to test thoroughly on demo accounts first."
            },
            {
              heading: "What you'll learn in this app",
              content: "In this app, you'll learn to turn your trading ideas into clear rules that can be used to build a simple trading robot. You don't need to know how to code – we'll help you generate the code based on your choices."
            }
          ]
        }
      },
      basics2: {
        da: {
          title: "MT4 vs MT5 - Hvad skal jeg vælge?",
          sections: [
            {
              heading: "MetaTrader 4 (MT4)",
              content: "MT4 er den mest udbredte handelsplatform i verden og har eksisteret siden 2005. Den er kendt for sin enkelhed og stabilitet. Mange brokere tilbyder stadig MT4, og der findes et enormt bibliotek af eksisterende robotter og indikatorer. Programmeringssproget hedder MQL4 og er relativt nemt at lære."
            },
            {
              heading: "MetaTrader 5 (MT5)",
              content: "MT5 er den nyere version fra 2010 med flere avancerede funktioner. Den tilbyder bedre backtesting-værktøjer, flere tidsrammer og mulighed for at handle flere aktivklasser (aktier, futures). Programmeringssproget MQL5 er mere kraftfuldt men også lidt mere komplekst."
            },
            {
              heading: "Hvilken skal du vælge?",
              content: "Hvis du er helt ny til trading og robotter, anbefaler vi at starte med MT4. Det er enklere at lære, og der findes mere læringsmateriale online. Hvis din broker kun tilbyder MT5, eller du vil have de nyeste funktioner, er MT5 også et godt valg. Begge platforme kan bruges til at køre de robotter du bygger i denne app."
            },
            {
              heading: "Download og installation",
              content: "Du kan downloade MT4 eller MT5 gratis fra din brokers hjemmeside. De fleste brokere tilbyder også demo-konti hvor du kan teste robotter med virtuelle penge. Vi anbefaler altid at starte med en demo-konto."
            }
          ]
        },
        en: {
          title: "MT4 vs MT5 - What should I choose?",
          sections: [
            {
              heading: "MetaTrader 4 (MT4)",
              content: "MT4 is the most widely used trading platform in the world and has been around since 2005. It's known for its simplicity and stability. Many brokers still offer MT4, and there's a huge library of existing robots and indicators. The programming language is called MQL4 and is relatively easy to learn."
            },
            {
              heading: "MetaTrader 5 (MT5)",
              content: "MT5 is the newer version from 2010 with more advanced features. It offers better backtesting tools, more timeframes, and the ability to trade multiple asset classes (stocks, futures). The programming language MQL5 is more powerful but also slightly more complex."
            },
            {
              heading: "Which one should you choose?",
              content: "If you're completely new to trading and robots, we recommend starting with MT4. It's simpler to learn, and there's more learning material available online. If your broker only offers MT5, or you want the latest features, MT5 is also a good choice. Both platforms can run the robots you build in this app."
            },
            {
              heading: "Download and installation",
              content: "You can download MT4 or MT5 for free from your broker's website. Most brokers also offer demo accounts where you can test robots with virtual money. We always recommend starting with a demo account."
            }
          ]
        }
      },
      basics3: {
        da: {
          title: "Sådan installerer du din robot i MT4/MT5",
          sections: [
            {
              heading: "Trin 1: Find din fil",
              content: "Når du har genereret din robot i Robot Builder, downloader du en .mq4 fil (for MT4) eller .mq5 fil (for MT5). Gem filen et sted du kan finde den igen, f.eks. på skrivebordet."
            },
            {
              heading: "Trin 2: Åbn data-mappen i MetaTrader",
              content: "Åbn MetaTrader og gå til Fil → Åbn datakatalog (File → Open Data Folder). Dette åbner en mappe på din computer. Naviger til MQL4 → Experts (eller MQL5 → Experts for MT5). Kopier din robot-fil hertil."
            },
            {
              heading: "Trin 3: Kompiler robotten",
              content: "I MetaTrader, gå til Værktøjer → MetaEditor (Tools → MetaEditor). Find din fil i navigator-vinduet til venstre under Expert Advisors. Dobbeltklik på filen for at åbne den. Tryk på Kompiler (Compile) knappen eller F7. Hvis der ikke er fejl, er din robot klar til brug."
            },
            {
              heading: "Trin 4: Aktiver robotten",
              content: "Genstart MetaTrader eller højreklik på Expert Advisors i Navigator og vælg Refresh. Træk din robot fra Navigator over på det chart du vil handle på. I popup-vinduet, sørg for at 'Allow live trading' er slået til. Klik OK. Du skulle nu se et smiley-ansigt i øverste højre hjørne af chartet – det betyder robotten er aktiv."
            },
            {
              heading: "Vigtige indstillinger",
              content: "Gå til Værktøjer → Indstillinger → Expert Advisors (Tools → Options → Expert Advisors). Sørg for at 'Allow automated trading' er slået til. VIGTIGT: Test ALTID på en demo-konto først, før du bruger rigtige penge!"
            }
          ]
        },
        en: {
          title: "How to install your robot in MT4/MT5",
          sections: [
            {
              heading: "Step 1: Find your file",
              content: "When you've generated your robot in Robot Builder, you download a .mq4 file (for MT4) or .mq5 file (for MT5). Save the file somewhere you can find it again, such as your desktop."
            },
            {
              heading: "Step 2: Open the data folder in MetaTrader",
              content: "Open MetaTrader and go to File → Open Data Folder. This opens a folder on your computer. Navigate to MQL4 → Experts (or MQL5 → Experts for MT5). Copy your robot file here."
            },
            {
              heading: "Step 3: Compile the robot",
              content: "In MetaTrader, go to Tools → MetaEditor. Find your file in the navigator window on the left under Expert Advisors. Double-click the file to open it. Press the Compile button or F7. If there are no errors, your robot is ready to use."
            },
            {
              heading: "Step 4: Activate the robot",
              content: "Restart MetaTrader or right-click on Expert Advisors in Navigator and select Refresh. Drag your robot from Navigator onto the chart you want to trade. In the popup window, make sure 'Allow live trading' is enabled. Click OK. You should now see a smiley face in the top right corner of the chart – this means the robot is active."
            },
            {
              heading: "Important settings",
              content: "Go to Tools → Options → Expert Advisors. Make sure 'Allow automated trading' is enabled. IMPORTANT: ALWAYS test on a demo account first before using real money!"
            }
          ]
        }
      },
      strategy1: {
        da: {
          title: "Din første strategi",
          sections: [
            {
              heading: "Hvad er en handelsstrategi?",
              content: "En handelsstrategi er et sæt klare regler der fortæller dig præcis hvornår du skal købe, hvornår du skal sælge, og hvor meget du skal risikere. Uden en strategi handler du på mavefornemmelse, hvilket sjældent giver gode resultater på lang sigt."
            },
            {
              heading: "Grundelementer i en strategi",
              content: "Enhver strategi har fire hovedelementer: 1) Entry-signal (hvornår køber/sælger du?), 2) Exit-signal (hvornår lukker du handlen?), 3) Stop-loss (hvor meget er du villig til at tabe?), og 4) Position-størrelse (hvor meget investerer du per handel?)."
            },
            {
              heading: "Et simpelt eksempel",
              content: "Her er en enkel strategi: 'Køb når den korte moving average (20 perioder) krydser over den lange moving average (50 perioder). Sælg når det modsatte sker. Sæt stop-loss 50 pips under entry-prisen.' Dette er en trend-følgende strategi der forsøger at fange større prisbevægelser."
            },
            {
              heading: "Fra idé til robot",
              content: "I Robot Builder hjælper vi dig med at strukturere din strategi ved at stille de rigtige spørgsmål. Du vælger din indikator-type, definerer dine betingelser, og vi genererer koden for dig. Start simpelt og tilføj kompleksitet efterhånden som du lærer mere."
            }
          ]
        },
        en: {
          title: "Your first strategy",
          sections: [
            {
              heading: "What is a trading strategy?",
              content: "A trading strategy is a set of clear rules that tell you exactly when to buy, when to sell, and how much to risk. Without a strategy, you're trading on gut feeling, which rarely produces good results in the long run."
            },
            {
              heading: "Basic elements of a strategy",
              content: "Every strategy has four main elements: 1) Entry signal (when do you buy/sell?), 2) Exit signal (when do you close the trade?), 3) Stop-loss (how much are you willing to lose?), and 4) Position size (how much do you invest per trade?)."
            },
            {
              heading: "A simple example",
              content: "Here's a simple strategy: 'Buy when the short moving average (20 periods) crosses above the long moving average (50 periods). Sell when the opposite happens. Set stop-loss 50 pips below the entry price.' This is a trend-following strategy that tries to capture larger price movements."
            },
            {
              heading: "From idea to robot",
              content: "In Robot Builder, we help you structure your strategy by asking the right questions. You choose your indicator type, define your conditions, and we generate the code for you. Start simple and add complexity as you learn more."
            }
          ]
        }
      },
      strategy2: {
        da: {
          title: "Indikatorer forklaret",
          sections: [
            {
              heading: "Hvad er en teknisk indikator?",
              content: "En teknisk indikator er en matematisk beregning baseret på pris og/eller volumen der hjælper tradere med at identificere trends, momentum og potentielle vendepunkter. Indikatorer vises typisk som linjer eller histogrammer på eller under prischarten."
            },
            {
              heading: "Moving Averages (MA)",
              content: "Moving averages er den mest basale indikator. Den beregner gennemsnitsprisen over et bestemt antal perioder. En 20-perioders MA viser gennemsnittet af de sidste 20 lyses lukkepriser. Når prisen er over MA, er trenden ofte opadgående. Moving averages bruges ofte til at generere signaler når to MAs krydser hinanden."
            },
            {
              heading: "RSI (Relative Strength Index)",
              content: "RSI måler hastigheden og styrken af prisbevægelser på en skala fra 0 til 100. Værdier over 70 indikerer at markedet kan være overkøbt (og muligvis vil falde). Værdier under 30 indikerer at markedet kan være oversolgt (og muligvis vil stige). RSI er nyttig til at spotte potentielle vendepunkter."
            },
            {
              heading: "MACD (Moving Average Convergence Divergence)",
              content: "MACD består af to linjer der viser forskellen mellem kortsigtede og langsigtede moving averages. Når MACD-linjen krydser signal-linjen opadgående, kan det være et købssignal. Omvendt kan et kryds nedad være et salgssignal. MACD er populær fordi den kombinerer trend og momentum."
            },
            {
              heading: "Sådan bruger du indikatorer",
              content: "Indikatorer er værktøjer, ikke krystalkugler. Brug dem til at bekræfte din analyse, ikke som eneste beslutningsgrundlag. De fleste erfarne tradere bruger 2-3 indikatorer sammen. For mange indikatorer kan føre til 'analysis paralysis'. Start med én eller to og lær dem godt."
            }
          ]
        },
        en: {
          title: "Indicators explained",
          sections: [
            {
              heading: "What is a technical indicator?",
              content: "A technical indicator is a mathematical calculation based on price and/or volume that helps traders identify trends, momentum, and potential reversal points. Indicators are typically displayed as lines or histograms on or below the price chart."
            },
            {
              heading: "Moving Averages (MA)",
              content: "Moving averages are the most basic indicator. It calculates the average price over a certain number of periods. A 20-period MA shows the average of the last 20 candle closing prices. When the price is above the MA, the trend is often upward. Moving averages are often used to generate signals when two MAs cross each other."
            },
            {
              heading: "RSI (Relative Strength Index)",
              content: "RSI measures the speed and strength of price movements on a scale from 0 to 100. Values above 70 indicate that the market may be overbought (and might fall). Values below 30 indicate that the market may be oversold (and might rise). RSI is useful for spotting potential reversal points."
            },
            {
              heading: "MACD (Moving Average Convergence Divergence)",
              content: "MACD consists of two lines showing the difference between short-term and long-term moving averages. When the MACD line crosses the signal line upward, it can be a buy signal. Conversely, a downward cross can be a sell signal. MACD is popular because it combines trend and momentum."
            },
            {
              heading: "How to use indicators",
              content: "Indicators are tools, not crystal balls. Use them to confirm your analysis, not as the sole basis for decisions. Most experienced traders use 2-3 indicators together. Too many indicators can lead to 'analysis paralysis'. Start with one or two and learn them well."
            }
          ]
        }
      },
      strategy3: {
        da: {
          title: "Grundlæggende backtesting",
          sections: [
            {
              heading: "Hvad er backtesting?",
              content: "Backtesting er processen med at teste din handelsstrategi på historiske data for at se, hvordan den ville have klaret sig i fortiden. Det er som en tidsmaskine for din robot – du kan se hvad der ville være sket hvis du havde kørt strategien for måneder eller år siden."
            },
            {
              heading: "Hvorfor er backtesting vigtigt?",
              content: "Backtesting hjælper dig med at opdage fejl i din strategi før du risikerer rigtige penge. Du kan se om strategien er profitabel, hvor store tab du kan forvente, og om den fungerer på forskellige markedsforhold. Uden backtesting handler du i blinde."
            },
            {
              heading: "Sådan backtest i MetaTrader",
              content: "I MetaTrader finder du Strategy Tester under Vis → Strategy Tester (View → Strategy Tester). Vælg din robot, vælg valutapar og tidsperiode. Klik på Start. Efter testen kan du se resultaterne inklusiv total profit, antal handler, og en graf over kontoens udvikling."
            },
            {
              heading: "Vigtige begrænsninger",
              content: "Husk at fortiden ikke garanterer fremtiden. En strategi der virkede godt historisk kan fejle i fremtiden. Pas på 'curve fitting' – at optimere strategien så meget til historiske data at den mister sin evne til at fungere på nye data. Brug altid en periode til test som ikke blev brugt til optimering."
            }
          ]
        },
        en: {
          title: "Backtesting basics",
          sections: [
            {
              heading: "What is backtesting?",
              content: "Backtesting is the process of testing your trading strategy on historical data to see how it would have performed in the past. It's like a time machine for your robot – you can see what would have happened if you had run the strategy months or years ago."
            },
            {
              heading: "Why is backtesting important?",
              content: "Backtesting helps you discover flaws in your strategy before risking real money. You can see if the strategy is profitable, how large losses you can expect, and whether it works in different market conditions. Without backtesting, you're trading blind."
            },
            {
              heading: "How to backtest in MetaTrader",
              content: "In MetaTrader, find Strategy Tester under View → Strategy Tester. Select your robot, choose currency pair and time period. Click Start. After the test, you can see results including total profit, number of trades, and a graph of account development."
            },
            {
              heading: "Important limitations",
              content: "Remember that the past doesn't guarantee the future. A strategy that worked well historically can fail in the future. Watch out for 'curve fitting' – optimizing the strategy so much to historical data that it loses its ability to work on new data. Always use a test period that wasn't used for optimization."
            }
          ]
        }
      },
      risk1: {
        da: {
          title: "Grundlæggende risikostyring",
          sections: [
            {
              heading: "Hvorfor risikostyring er afgørende",
              content: "Selv den bedste strategi vil have tabende handler. Risikostyring sikrer at du overlever de dårlige perioder så du kan nyde de gode. Uden risikostyring kan en enkelt dårlig handel eller serie af tab udslette din konto."
            },
            {
              heading: "Stop-loss: Din sikkerhedsventil",
              content: "Et stop-loss lukker automatisk din handel hvis markedet bevæger sig imod dig. Det begrænser dit tab til et forudbestemt beløb. ALDRIG handle uden stop-loss! Bestem dit stop-loss niveau FØR du åbner handlen, og flyt det aldrig længere væk for at 'give handlen mere plads'."
            },
            {
              heading: "Position sizing: Hvor meget per handel?",
              content: "En tommelfingerregel er at risikere maksimalt 1-2% af din konto per handel. Hvis du har 10.000 kr og risikerer 1%, er dit maksimale tab per handel 100 kr. Dette betyder at du kan tabe 50 handler i træk før kontoen er tom (usandsynligt med en fornuftig strategi)."
            },
            {
              heading: "Diversificering",
              content: "Læg ikke alle æg i én kurv. Handle flere valutapar eller markeder for at sprede risikoen. Undgå at have mange handler åbne i korrelerede par (f.eks. EUR/USD og GBP/USD bevæger sig ofte sammen). En god robot kan stadig tabe hvis hele markedet går imod dig."
            },
            {
              heading: "Psykologisk risikostyring",
              content: "Definer på forhånd hvor meget du er villig til at tabe totalt – og stop når du når den grænse. Tag pauser efter store tab. Lad aldrig én dårlig handel føre til 'revenge trading' hvor du forsøger at vinde det tabte tilbage med større handler."
            }
          ]
        },
        en: {
          title: "Basic risk management",
          sections: [
            {
              heading: "Why risk management is crucial",
              content: "Even the best strategy will have losing trades. Risk management ensures you survive the bad periods so you can enjoy the good ones. Without risk management, a single bad trade or series of losses can wipe out your account."
            },
            {
              heading: "Stop-loss: Your safety valve",
              content: "A stop-loss automatically closes your trade if the market moves against you. It limits your loss to a predetermined amount. NEVER trade without a stop-loss! Determine your stop-loss level BEFORE you open the trade, and never move it further away to 'give the trade more room'."
            },
            {
              heading: "Position sizing: How much per trade?",
              content: "A rule of thumb is to risk a maximum of 1-2% of your account per trade. If you have $10,000 and risk 1%, your maximum loss per trade is $100. This means you can lose 50 trades in a row before the account is empty (unlikely with a reasonable strategy)."
            },
            {
              heading: "Diversification",
              content: "Don't put all eggs in one basket. Trade multiple currency pairs or markets to spread risk. Avoid having many trades open in correlated pairs (e.g., EUR/USD and GBP/USD often move together). A good robot can still lose if the entire market goes against you."
            },
            {
              heading: "Psychological risk management",
              content: "Define in advance how much you're willing to lose in total – and stop when you reach that limit. Take breaks after large losses. Never let one bad trade lead to 'revenge trading' where you try to win back losses with larger trades."
            }
          ]
        }
      },
      risk2: {
        da: {
          title: "Almindelige fejl at undgå",
          sections: [
            {
              heading: "Fejl 1: Overoptimering (Curve Fitting)",
              content: "At tilpasse din strategi perfekt til historiske data så den ser fantastisk ud på backtest, men fejler på live markedet. Løsning: Test på data som ikke blev brugt til at bygge strategien (out-of-sample testing)."
            },
            {
              heading: "Fejl 2: Ingen stop-loss",
              content: "At håbe på at markedet vender tilbage i stedet for at acceptere et lille tab. Dette kan forvandle et lille tab til et katastrofalt tab. Løsning: ALTID brug stop-loss, og sæt det FØR du åbner handlen."
            },
            {
              heading: "Fejl 3: For stor position",
              content: "At risikere for meget per handel i håb om hurtig profit. Selv en god strategi vil have tabsperioder, og for store positioner kan tømme kontoen. Løsning: Risiker aldrig mere end 1-2% af kontoen per handel."
            },
            {
              heading: "Fejl 4: Ændre robotten under live trading",
              content: "At ændre indstillinger eller slå robotten fra/til baseret på de seneste resultater. Dette ødelægger strategiens statistiske fordel. Løsning: Lad robotten køre som planlagt, og evaluer kun efter en betydelig periode (mindst 100 handler)."
            },
            {
              heading: "Fejl 5: Skippe demo-test",
              content: "At gå direkte til live trading med rigtige penge. Selv robotter der virker perfekt på backtest kan opføre sig anderledes live. Løsning: Test ALTID på demo-konto i mindst 1-3 måneder før du bruger rigtige penge."
            }
          ]
        },
        en: {
          title: "Common mistakes to avoid",
          sections: [
            {
              heading: "Mistake 1: Over-optimization (Curve Fitting)",
              content: "Tailoring your strategy perfectly to historical data so it looks fantastic on backtest but fails in live markets. Solution: Test on data that wasn't used to build the strategy (out-of-sample testing)."
            },
            {
              heading: "Mistake 2: No stop-loss",
              content: "Hoping the market will turn back instead of accepting a small loss. This can turn a small loss into a catastrophic one. Solution: ALWAYS use stop-loss, and set it BEFORE you open the trade."
            },
            {
              heading: "Mistake 3: Position too large",
              content: "Risking too much per trade hoping for quick profit. Even a good strategy will have losing periods, and too large positions can empty the account. Solution: Never risk more than 1-2% of the account per trade."
            },
            {
              heading: "Mistake 4: Changing the robot during live trading",
              content: "Changing settings or turning the robot on/off based on recent results. This destroys the strategy's statistical edge. Solution: Let the robot run as planned, and only evaluate after a significant period (at least 100 trades)."
            },
            {
              heading: "Mistake 5: Skipping demo testing",
              content: "Going directly to live trading with real money. Even robots that work perfectly on backtest can behave differently live. Solution: ALWAYS test on a demo account for at least 1-3 months before using real money."
            }
          ]
        }
      },
      risk3: {
        da: {
          title: "Position sizing i praksis",
          sections: [
            {
              heading: "Hvad er position sizing?",
              content: "Position sizing handler om at bestemme hvor stor hver handel skal være. Det er måske den vigtigste del af risikostyring. Selv med en vinder-strategi kan forkert position sizing føre til store tab eller mangel på profit."
            },
            {
              heading: "Fixed lot size metoden",
              content: "Den enkleste metode: handel altid med samme lot størrelse (f.eks. 0.1 lot). Fordel: Enkelt at implementere. Ulempe: Tager ikke højde for kontostørrelse eller risiko per handel. Velegnet til begyndere og demo-test."
            },
            {
              heading: "Procent risiko metoden",
              content: "Beregn lot størrelsen så du altid risikerer den samme procentdel af kontoen (f.eks. 1%). Formlen: Lot størrelse = (Konto balance × Risiko %) / (Stop loss i pips × Pip værdi). Denne metode tilpasser sig automatisk til din kontostørrelse og beskytter mod store tab."
            },
            {
              heading: "Et praktisk eksempel",
              content: "Du har 10.000 USD og vil risikere 1% per handel (= 100 USD). Dit stop loss er 50 pips, og pip værdien for EUR/USD er 10 USD per pip ved 1 lot. Beregning: 100 / (50 × 10) = 0.2 lot. Med denne position taber du præcis 100 USD hvis stop loss rammes."
            },
            {
              heading: "Vigtige overvejelser",
              content: "Start konservativt med 0.5-1% risiko. Undlad at øge risikoen efter vinder-perioder. Reducer risikoen under tabsperioder. Husk at beregne position størrelsen FØR hver handel, ikke bare brug samme størrelse hver gang."
            }
          ]
        },
        en: {
          title: "Position sizing in practice",
          sections: [
            {
              heading: "What is position sizing?",
              content: "Position sizing is about determining how large each trade should be. It's perhaps the most important part of risk management. Even with a winning strategy, incorrect position sizing can lead to large losses or lack of profit."
            },
            {
              heading: "Fixed lot size method",
              content: "The simplest method: always trade with the same lot size (e.g., 0.1 lot). Advantage: Simple to implement. Disadvantage: Doesn't account for account size or risk per trade. Suitable for beginners and demo testing."
            },
            {
              heading: "Percent risk method",
              content: "Calculate lot size so you always risk the same percentage of the account (e.g., 1%). Formula: Lot size = (Account balance × Risk %) / (Stop loss in pips × Pip value). This method automatically adapts to your account size and protects against large losses."
            },
            {
              heading: "A practical example",
              content: "You have $10,000 and want to risk 1% per trade (= $100). Your stop loss is 50 pips, and the pip value for EUR/USD is $10 per pip at 1 lot. Calculation: 100 / (50 × 10) = 0.2 lot. With this position, you lose exactly $100 if stop loss is hit."
            },
            {
              heading: "Important considerations",
              content: "Start conservatively with 0.5-1% risk. Don't increase risk after winning periods. Reduce risk during losing periods. Remember to calculate position size BEFORE each trade, don't just use the same size every time."
            }
          ]
        }
      }
    };

    const content = contents[id];
    if (!content) {
      return { title: "", sections: [] };
    }
    return content[language];
  };

  const lessonMeta = getLessonMeta(lesson.id);
  const lessonContent = getLessonContent(lesson.id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar isAuthenticated onLogout={() => window.location.href = "/"} />

      <main className="flex-1 py-8">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "da" ? "Tilbage til læringscenter" : "Back to learning center"}
          </Link>

          {/* Header image */}
          <div className="rounded-xl overflow-hidden mb-8 animate-fade-in">
            <img 
              src={lesson.image} 
              alt={lessonContent.title || lessonMeta?.title}
              className="w-full h-48 sm:h-64 object-cover"
            />
          </div>

          {/* Header */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: "50ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className={getLevelColor(lesson.level)}>
                {t.learn.level} {lesson.level}: {getLevelLabel(lesson.level)}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {lessonContent.title || lessonMeta?.title}
            </h1>
            <p className="text-muted-foreground">
              {lessonMeta?.desc}
            </p>
          </div>

          {/* Content sections */}
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            {lessonContent.sections.map((section, index) => (
              <section key={index} className="prose prose-slate dark:prose-invert max-w-none">
                <div className="rounded-xl border border-border bg-card p-6 card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-3 mt-0">
                        {section.heading}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-0">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 rounded-lg bg-muted/50 border border-border p-4 text-sm text-muted-foreground">
            <BookOpen className="h-4 w-4 inline-block mr-2" />
            {language === "da" 
              ? "Dette er kun til uddannelsesmæssige formål. Vi giver ikke investeringsrådgivning. Al trading indebærer risiko."
              : "This is for educational purposes only. We do not provide investment advice. All trading involves risk."}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {lesson.prevSlug ? (
              <Button asChild variant="outline" className="gap-2">
                <Link to={`/learn/${lesson.prevSlug}`}>
                  <ArrowLeft className="h-4 w-4" />
                  {language === "da" ? "Forrige lektion" : "Previous lesson"}
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {lesson.nextSlug ? (
              <Button asChild className="gap-2">
                <Link to={`/learn/${lesson.nextSlug}`}>
                  {language === "da" ? "Næste lektion" : "Next lesson"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button asChild className="gap-2">
                <Link to="/builder">
                  {language === "da" ? "Start Robot Builder" : "Start Robot Builder"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LessonDetail;
