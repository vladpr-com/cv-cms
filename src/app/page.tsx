import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  Target,
  Zap,
  Clock,
  Shield,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle,
  Layers,
  Repeat,
  Search,
  Sparkles,
  Heart,
  Eye,
  Coffee,
  ChevronDown,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'CV CMS - Build Tailored Resumes in Minutes, Not Hours',
  description:
    'A headless CMS for your career data. Store your experience as atomic blocks and generate ATS-optimized resumes tailored to each job posting in 5 minutes.',
};

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          CV CMS
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/app">Try Free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Section({
  children,
  muted = false,
  className = '',
}: {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <section className={`py-24 sm:py-32 ${muted ? 'bg-muted/50' : 'bg-background'} ${className}`}>
      <div className="max-w-5xl mx-auto px-6">{children}</div>
    </section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-bold tracking-tight mb-12">{children}</h2>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative py-28 sm:py-36 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
          Open Source &middot; Free to Use
        </Badge>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 max-w-4xl mx-auto">
          A headless CMS for your career data.
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent">
            Build a tailored resume in 5 minutes, not an hour.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Store your entire career as atomic blocks — achievements, projects,
          metrics — and reassemble them into ATS-optimized resumes tailored to
          each job posting.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
            <Link href="/app">
              Try Free — No Sign-Up Required
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Features ─────────────────────────────────────────────────────

const features = [
  {
    icon: Upload,
    title: 'Load once, reuse forever',
    description:
      'Import from LinkedIn, a PDF, or fill in manually. Every project, metric, and achievement becomes a separate atom with rich metadata.',
  },
  {
    icon: Target,
    title: 'See how your experience maps',
    description:
      'Paste a job link — the system breaks it down into must-haves and nice-to-haves, then shows which of your atoms match and where the gaps are.',
  },
  {
    icon: Zap,
    title: 'Generate in 5 minutes',
    description:
      'Pick the relevant blocks, get bullet points in the language of the job posting, download a clean PDF.',
  },
];

function Features() {
  return (
    <Section muted>
      <SectionHeading>
        Apply to 10 jobs a week — each time with a resume that actually hits the mark
      </SectionHeading>
      <p className="text-muted-foreground mb-10 max-w-3xl">
        CV CMS stores your entire career as atomic blocks and reassembles them
        into a resume tailored to each specific role. ATS-optimized,
        keyword-aligned, professional PDF output.
      </p>
      <div className="grid sm:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <Card key={f.title} className="border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300">
            <CardHeader>
              <p className="text-xs text-muted-foreground mb-3 font-medium tracking-wider">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div className="rounded-xl bg-primary/10 p-3 w-fit mb-3">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-base">{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ─── Section 3: CTA ──────────────────────────────────────────────────────────

function CtaTryNow() {
  return (
    <Section>
      <div className="relative rounded-2xl p-px bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 max-w-3xl mx-auto">
        <div className="rounded-2xl bg-background px-8 py-12 sm:px-12 text-center">
          <SectionHeading>Try it now — no sign-up required</SectionHeading>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Paste your LinkedIn URL or upload a PDF. We&apos;ll break it into
            atomic blocks in under 3 minutes. You&apos;ll see your career the way
            you&apos;ve never seen it before: structured, tagged, ready to
            reassemble.
          </p>
          <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
            <Link href="/app">
              Try Free — No Sign-Up Required
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

// ─── Section 4: Aha Moments ──────────────────────────────────────────────────

function AhaMoments() {
  return (
    <Section muted>
      <SectionHeading>
        Two moments after which you&apos;ll never go back to manual editing
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-primary border-border/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-4 right-6 text-8xl font-bold text-primary/5 leading-none select-none">1</div>
          <CardHeader className="relative">
            <div className="rounded-xl bg-primary/10 p-3 w-fit mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-base">
              &quot;I actually have 47 significant achievements&quot;
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-sm text-muted-foreground">
              After import, you&apos;ll see your experience decomposed into atoms
              — each with metrics, domains, tech stack, and role context. Most
              people are surprised: turns out 7-10 years of work add up to far
              more than fits on a single page.
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-primary border-border/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-4 right-6 text-8xl font-bold text-primary/5 leading-none select-none">2</div>
          <CardHeader className="relative">
            <div className="rounded-xl bg-primary/10 p-3 w-fit mb-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-base">
              &quot;This resume — for this job — in 4 minutes?&quot;
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-sm text-muted-foreground">
              Paste a job link, select the highlighted atoms, hit
              &quot;Generate.&quot; The PDF is ready. No copy-pasting between
              documents, no &quot;fine, I&apos;ll just send the generic
              version.&quot;
            </p>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}

// ─── Section 5: Value Propositions ───────────────────────────────────────────

const values = [
  {
    icon: Search,
    title: 'Matching instead of guessing',
    description:
      'The system maps your atoms to job requirements and shows coverage percentage, missing keywords, and recommendations.',
  },
  {
    icon: Shield,
    title: 'Bullet points that sound like you',
    description:
      'AI suggests formulations in "action - result - metric" format using the job\'s terminology. Every bullet is grounded in your real data.',
  },
  {
    icon: Clock,
    title: '5 minutes instead of an hour',
    description:
      'At 10 applications per week, you save 8-9 hours. A full workday for interview prep, networking, or recovering.',
  },
  {
    icon: Layers,
    title: 'Versions don\'t get lost',
    description:
      'Every version is linked to a job: company, role, date, status. When the recruiter calls, you find what you sent in 10 seconds.',
  },
];

function ValuePropositions() {
  return (
    <Section>
      <SectionHeading>
        What changes when your experience is data, not a document
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-6">
        {values.map((v) => (
          <Card key={v.title} className="group border-border/50 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="rounded-xl bg-primary/10 p-3 w-fit mb-3">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-base">{v.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{v.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ─── Section 6: "That's Me" ──────────────────────────────────────────────────

const painPoints = [
  'You got laid off, burned out, or want to level up — and you\'ve started actively searching.',
  'You sent a "universal" CV and got rejected at screening — even though you know you have the experience.',
  '"I have 8 years in product management, but the recruiter didn\'t even open my resume."',
  '"I\'ve been applying for three weeks and my pipeline is empty — is it me?"',
  'You spend Sunday evening reworking the same document for each of five job posts — and by the end you just send "good enough."',
  'Your desktop has "CV_final_v3_avito_2_NEW.pdf" and you no longer remember which version went where.',
];

function ThatsMe() {
  return (
    <Section muted>
      <SectionHeading>Sound familiar?</SectionHeading>
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l-4 border-primary pl-6 mb-10">
          <p className="text-muted-foreground italic text-lg leading-relaxed">
            You want to land an offer as fast as possible — at a company where your
            experience actually matters? Or at least stop feeling like 10 years of
            career equals &quot;not what we&apos;re looking for&quot;?
          </p>
        </div>
        <p className="font-semibold mb-6 text-lg">This is about you if:</p>
        <ul className="space-y-3">
          {painPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 rounded-lg bg-background/60 px-4 py-3 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ─── Section 7: How It Works ─────────────────────────────────────────────────

interface Step {
  step: string;
  youDo: string;
  youGet: string;
}

function StepRows({ steps }: { steps: Step[] }) {
  return (
    <div className="relative ml-6 border-l-2 border-border pl-8 space-y-4">
      {steps.map((s) => (
        <div key={s.step} className="relative">
          <div className="absolute -left-[calc(2rem+5px)] top-3 h-3 w-3 rounded-full bg-primary border-2 border-background" />
          <div className="rounded-lg border border-border/50 bg-card p-5 hover:shadow-md transition-all duration-300">
            <p className="text-sm font-semibold text-primary mb-2">{s.step}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">What you do</p>
                <p className="text-sm text-foreground">{s.youDo}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">What you get</p>
                <p className="text-sm text-foreground">{s.youGet}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const coreJob1: Step[] = [
  { step: '1. Inventory', youDo: 'Upload LinkedIn, PDF, or fill in manually', youGet: 'A unified atom base: 30-80 achievements, projects, roles — with metrics, stack, domains' },
  { step: '2. Job analysis', youDo: 'Paste a job link or description', youGet: 'Breakdown into must-have / nice-to-have, keywords, and the "language" of the posting' },
  { step: '3. Match & assemble', youDo: 'Select atoms from highlighted recommendations', youGet: 'A tailored resume: right emphasis, terminology, block order' },
  { step: '4. PDF & send', youDo: 'Hit "Download"', youGet: 'ATS-friendly PDF, clean typography, < 300 KB. Version saved automatically' },
];

const coreJob2: Step[] = [
  { step: 'Retrospective', youDo: 'Mark the application status (rejected / ghosted)', youGet: 'Comparison of the sent version vs. job requirements: missed keywords, achievements buried on page two' },
  { step: 'Iteration', youDo: 'Apply recommendations to the next application', youGet: 'Each next application is more precise — the system learns from your data' },
];

const coreJob3: Step[] = [
  { step: 'Reuse', youDo: 'Clone a successful version for a similar role', youGet: '80% of the work is already done — just adjust the emphasis' },
  { step: 'Parallel versions', youDo: 'Manage all applications in one place', youGet: 'Dashboard: job, CV version, status, date. No file chaos' },
];

function HowItWorks() {
  return (
    <Section>
      <SectionHeading>
        How it works: from chaos to a targeted resume in 4 steps
      </SectionHeading>

      <div className="space-y-14">
        <div>
          <h3 className="font-semibold mb-6 flex items-center gap-3 text-lg">
            <div className="rounded-lg bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            &quot;I need to quickly build a resume tailored to this specific role&quot;
          </h3>
          <StepRows steps={coreJob1} />
        </div>

        <div>
          <h3 className="font-semibold mb-6 flex items-center gap-3 text-lg">
            <div className="rounded-lg bg-primary/10 p-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            &quot;I need to understand why I got rejected and fix it&quot;
          </h3>
          <StepRows steps={coreJob2} />
        </div>

        <div>
          <h3 className="font-semibold mb-6 flex items-center gap-3 text-lg">
            <div className="rounded-lg bg-primary/10 p-2">
              <Repeat className="h-5 w-5 text-primary" />
            </div>
            &quot;I can&apos;t spend hours rewriting for 5-10 applications a week&quot;
          </h3>
          <StepRows steps={coreJob3} />
        </div>
      </div>
    </Section>
  );
}

// ─── Section 8: Emotions / Results ───────────────────────────────────────────

function Emotions() {
  return (
    <Section muted>
      <div className="grid sm:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            How you&apos;ll feel
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-4 rounded-lg bg-background/60 p-4">
              <div className="rounded-full bg-primary/10 p-2 mt-0.5 flex-shrink-0">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Confidence</p>
                <p className="text-sm text-muted-foreground">
                  You know every application goes out with a resume that speaks
                  the language of the job.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-lg bg-background/60 p-4">
              <div className="rounded-full bg-primary/10 p-2 mt-0.5 flex-shrink-0">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Control</p>
                <p className="text-sm text-muted-foreground">
                  You see your entire pipeline: how many applications, which
                  versions, where you got a response. Job search becomes a
                  managed process, not chaos.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-lg bg-background/60 p-4">
              <div className="rounded-full bg-primary/10 p-2 mt-0.5 flex-shrink-0">
                <Coffee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Calm</p>
                <p className="text-sm text-muted-foreground">
                  You&apos;re not burning weekends on manual document surgery.
                  There&apos;s time to prep for interviews, rest, recharge.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            What the result looks like
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-4 rounded-lg bg-background/60 p-4">
              <div className="rounded-full bg-green-500/10 p-2 mt-0.5 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">You land an offer faster</p>
                <p className="text-sm text-muted-foreground">
                  Your screening conversion rate goes up when the resume
                  actually hits the mark.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-lg bg-background/60 p-4">
              <div className="rounded-full bg-green-500/10 p-2 mt-0.5 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">
                  You rebuild professional confidence
                </p>
                <p className="text-sm text-muted-foreground">
                  You see your full experience: 47 achievements, 12 domains, 8
                  years of growth. It&apos;s not &quot;I don&apos;t qualify&quot;
                  — it&apos;s &quot;I didn&apos;t highlight the right
                  things.&quot;
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4 rounded-lg bg-background/60 p-4">
              <div className="rounded-full bg-green-500/10 p-2 mt-0.5 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">
                  You spend energy on what matters
                </p>
                <p className="text-sm text-muted-foreground">
                  Interview prep, networking, growth — not fighting with Word and
                  copy-paste.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

// ─── Section 9: FAQ / Lowering Barriers ──────────────────────────────────────

const faqs = [
  {
    question: '"I don\'t have time to fill in yet another tool"',
    answer:
      'Upload your LinkedIn profile or existing PDF — we decompose it into atoms automatically. Initial inventory takes 10-15 minutes. After that, you just pick blocks.',
  },
  {
    question: '"AI-generated text is obvious and generic"',
    answer:
      'We don\'t generate text from thin air. Every bullet is grounded in your real data — metrics, projects, outcomes. AI helps with structure and terminology, but the content is yours.',
  },
  {
    question: '"I need both English and Russian versions"',
    answer:
      'Atoms are stored with multilingual metadata. Generate a version in Russian for hh.ru and in English for LinkedIn Jobs — from the same base.',
  },
];

function LoweringBarriers() {
  return (
    <Section>
      <SectionHeading>&quot;But...&quot;</SectionHeading>
      <div className="space-y-3 max-w-3xl">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300"
          >
            <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-medium text-sm">
              {faq.question}
              <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-4 text-sm text-muted-foreground border-l-4 border-primary ml-5 pl-4">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}

// ─── Section 10: Competition ─────────────────────────────────────────────────

const competitors = [
  {
    label: 'Google Docs',
    quote: '"I already tailor my resume in Google Docs"',
    answer:
      'Manual editing works for 2-3 applications. By the 10th, you\'re exhausted — you start sending the generic version and get rejected. CV CMS makes the 10th iteration as fast as the first.',
  },
  {
    label: 'Teal / Jobscan / Kickresume',
    quote: '"There\'s Teal / Jobscan / Kickresume"',
    answer:
      'They polish an existing PDF — highlight keywords, check ATS compatibility. But they don\'t store your experience as structured data. You can\'t reassemble a document from atoms, can\'t track versions, can\'t run a retrospective. It\'s cosmetics, not architecture.',
  },
  {
    label: 'ChatGPT',
    quote: '"ChatGPT will rewrite my resume for free"',
    answer:
      'An LLM doesn\'t know your real experience — it hallucinates metrics and embellishes. After 3 iterations you\'ll have text you can\'t defend in an interview. CV CMS generates only from your verified data — not a single made-up number.',
  },
];

function Competition() {
  return (
    <Section muted>
      <SectionHeading>Why not [alternative]?</SectionHeading>
      <div className="grid sm:grid-cols-3 gap-6">
        {competitors.map((c) => (
          <Card key={c.label} className="border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-3">{c.label}</Badge>
              <CardTitle className="text-base">{c.quote}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{c.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ─── Section 11: Final CTA ──────────────────────────────────────────────────

function FinalCta() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-background via-muted/30 to-muted/50">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Your next application can be different
        </h2>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">
          No account. No credit card. No friction. Paste your LinkedIn or upload
          a PDF, see your atoms, generate your first tailored resume. 5 minutes
          to your first PDF.
        </p>
        <Button size="lg" className="shadow-lg shadow-primary/25" asChild>
          <Link href="/app">
            Try Free — No Sign-Up Required
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <CtaTryNow />
      <AhaMoments />
      <ValuePropositions />
      <ThatsMe />
      <HowItWorks />
      <Emotions />
      <LoweringBarriers />
      <Competition />
      <FinalCta />
    </>
  );
}
