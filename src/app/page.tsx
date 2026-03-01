import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
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
  ChevronRight,
  ChevronDown,
  Check,
  Minus,
  Quote,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'CV CMS - Build Tailored Resumes in Minutes, Not Hours',
  description:
    'A headless CMS for your career data. Store your experience as atomic blocks and generate ATS-optimized resumes tailored to each job posting in 5 minutes.',
};

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/75 backdrop-blur-lg">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            CV CMS
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button size="sm" className="pr-1.5" asChild>
              <Link href="/app">
                <span>Try Free</span>
                <ChevronRight className="opacity-50" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="py-32 md:pt-44">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance font-serif text-4xl font-medium sm:text-5xl">
            A headless CMS for your career data.
          </h1>
          <p className="text-muted-foreground mt-4 text-balance text-lg">
            Store your entire career as atomic blocks — achievements, projects,
            metrics — and reassemble them into ATS-optimized resumes tailored to
            each job posting. 5 minutes, not an hour.
          </p>
          <Button asChild className="mt-8 pr-1.5">
            <Link href="/app">
              <span className="text-nowrap">Try Free — No Sign-Up Required</span>
              <ChevronRight className="opacity-50" />
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
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
            Apply to 10 jobs a week — each time with a resume that actually hits the mark
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            CV CMS stores your entire career as atomic blocks and reassembles them
            into a resume tailored to each specific role. ATS-optimized,
            keyword-aligned, professional PDF output.
          </p>
        </div>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border/50 shadow-none p-6">
              <div className="space-y-2">
                <f.icon className="text-foreground h-5 w-5 mb-3" />
                <h3 className="text-foreground font-medium">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Stats ────────────────────────────────────────────────────────

function Stats() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          <div className="border-y py-6">
            <p className="text-muted-foreground text-xl">
              <span className="text-foreground font-medium">5 min</span> per tailored resume.
            </p>
          </div>
          <div className="border-y py-6">
            <p className="text-muted-foreground text-xl">
              <span className="text-foreground font-medium">8-9 hrs</span> saved per week at 10 applications.
            </p>
          </div>
          <div className="border-y py-6">
            <p className="text-muted-foreground text-xl">
              <span className="text-foreground font-medium">30-80</span> career atoms from one import.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: CTA ──────────────────────────────────────────────────────────

function CtaTryNow() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Card className="border-border/50 shadow-none p-8 sm:p-12">
          <div className="text-center">
            <Sparkles className="mx-auto mb-4 h-5 w-5 text-muted-foreground" />
            <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
              Try it now — no sign-up required
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance">
              Paste your LinkedIn URL or upload a PDF. We&apos;ll break it into
              atomic blocks in under 3 minutes. You&apos;ll see your career the way
              you&apos;ve never seen it before.
            </p>
            <Button asChild className="mt-6 pr-1.5">
              <Link href="/app">
                <span>Start Building</span>
                <ChevronRight className="opacity-50" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── Section 5: Aha Moments ──────────────────────────────────────────────────

function AhaMoments() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
          Two moments after which you&apos;ll never go back
        </h2>
        <p className="text-muted-foreground mt-4 text-balance max-w-xl">
          These realizations change how you approach every job application.
        </p>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          <Card className="border-border/50 shadow-none p-6">
            <div className="space-y-4">
              <Quote className="text-foreground/15 h-8 w-8" />
              <div className="space-y-2">
                <h3 className="text-foreground font-medium text-lg">
                  &quot;I actually have 47 significant achievements&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  After import, you&apos;ll see your experience decomposed into atoms
                  — each with metrics, domains, tech stack, and role context. Most
                  people are surprised: turns out 7-10 years of work add up to far
                  more than fits on a single page.
                </p>
              </div>
            </div>
          </Card>
          <Card className="border-border/50 shadow-none p-6">
            <div className="space-y-4">
              <Quote className="text-foreground/15 h-8 w-8" />
              <div className="space-y-2">
                <h3 className="text-foreground font-medium text-lg">
                  &quot;This resume — for this job — in 4 minutes?&quot;
                </h3>
                <p className="text-muted-foreground text-sm">
                  Paste a job link, select the highlighted atoms, hit
                  &quot;Generate.&quot; The PDF is ready. No copy-pasting between
                  documents, no &quot;fine, I&apos;ll just send the generic
                  version.&quot;
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Value Propositions ───────────────────────────────────────────

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
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
          What changes when your experience is data, not a document
        </h2>
        <p className="text-muted-foreground mt-4 text-balance max-w-xl">
          Everything you need to build, send, and improve tailored resumes effortlessly.
        </p>
        <div className="mt-12 grid gap-3 sm:grid-cols-2">
          {values.map((v) => (
            <Card key={v.title} className="border-border/50 shadow-none p-6">
              <div className="space-y-2">
                <v.icon className="text-foreground h-5 w-5 mb-3" />
                <h3 className="text-foreground font-medium">{v.title}</h3>
                <p className="text-muted-foreground text-sm">{v.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: "That's Me" ──────────────────────────────────────────────────

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
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
            Sound familiar?
          </h2>
          <p className="text-muted-foreground mt-6 text-lg italic leading-relaxed">
            You want to land an offer as fast as possible — at a company where your
            experience actually matters? Or at least stop feeling like 10 years of
            career equals &quot;not what we&apos;re looking for&quot;?
          </p>
        </div>
        <div className="mt-12 max-w-2xl">
          <p className="text-foreground font-medium mb-6">This is about you if:</p>
          <div className="space-y-1">
            {painPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-border/50 py-3 last:border-0">
                <Check className="text-foreground h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 8: How It Works ─────────────────────────────────────────────────

interface Step {
  step: string;
  youDo: string;
  youGet: string;
}

function StepRows({ steps }: { steps: Step[] }) {
  return (
    <div className="space-y-3">
      {steps.map((s) => (
        <Card key={s.step} className="border-border/50 shadow-none p-5">
          <div className="grid gap-4 sm:grid-cols-[140px_1fr_1fr]">
            <p className="text-foreground text-sm font-medium">{s.step}</p>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">What you do</p>
              <p className="text-foreground text-sm">{s.youDo}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">What you get</p>
              <p className="text-foreground text-sm">{s.youGet}</p>
            </div>
          </div>
        </Card>
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
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
          How it works
        </h2>
        <p className="text-muted-foreground mt-4 text-balance max-w-xl">
          From chaos to a targeted resume in 4 steps.
        </p>

        <div className="mt-12 space-y-12">
          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              &quot;I need to quickly build a resume tailored to this specific role&quot;
            </h3>
            <StepRows steps={coreJob1} />
          </div>

          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              &quot;I need to understand why I got rejected and fix it&quot;
            </h3>
            <StepRows steps={coreJob2} />
          </div>

          <div>
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Repeat className="h-4 w-4" />
              &quot;I can&apos;t spend hours rewriting for 5-10 applications a week&quot;
            </h3>
            <StepRows steps={coreJob3} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 9: Emotions / Results ───────────────────────────────────────────

function Emotions() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-balance font-serif text-3xl font-medium">
              How you&apos;ll feel
            </h2>
            <div className="mt-8 space-y-6">
              {[
                { icon: Heart, label: 'Confidence', text: 'You know every application goes out with a resume that speaks the language of the job.' },
                { icon: Eye, label: 'Control', text: 'You see your entire pipeline: how many applications, which versions, where you got a response. Job search becomes a managed process, not chaos.' },
                { icon: Coffee, label: 'Calm', text: "You're not burning weekends on manual document surgery. There's time to prep for interviews, rest, recharge." },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="text-foreground h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium text-sm">{item.label}</p>
                    <p className="text-muted-foreground text-sm mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-balance font-serif text-3xl font-medium">
              What the result looks like
            </h2>
            <div className="mt-8 space-y-6">
              {[
                { label: 'You land an offer faster', text: 'Your screening conversion rate goes up when the resume actually hits the mark.' },
                { label: 'You rebuild professional confidence', text: 'You see your full experience: 47 achievements, 12 domains, 8 years of growth. It\'s not "I don\'t qualify" — it\'s "I didn\'t highlight the right things."' },
                { label: 'You spend energy on what matters', text: 'Interview prep, networking, growth — not fighting with Word and copy-paste.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <Check className="text-foreground h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium text-sm">{item.label}</p>
                    <p className="text-muted-foreground text-sm mt-1">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 10: FAQ ─────────────────────────────────────────────────────────

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
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
            &quot;But...&quot;
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Common concerns, honest answers.
          </p>
        </div>
        <div className="mt-12 max-w-2xl space-y-px">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group border-b border-border/50"
            >
              <summary className="flex cursor-pointer items-center justify-between py-5 font-medium text-sm">
                {faq.question}
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="pb-5 text-sm text-muted-foreground">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 11: Competition ─────────────────────────────────────────────────

const competitors = [
  {
    label: 'Google Docs',
    quote: '"I already tailor my resume in Google Docs"',
    answer:
      'Manual editing works for 2-3 applications. By the 10th, you\'re exhausted — you start sending the generic version and get rejected. CV CMS makes the 10th iteration as fast as the first.',
    has: ['Manual editing', 'Free', 'Familiar'],
    misses: ['No structured data', 'No version tracking', 'No job matching'],
  },
  {
    label: 'Teal / Jobscan / Kickresume',
    quote: '"There\'s Teal / Jobscan / Kickresume"',
    answer:
      'They polish an existing PDF — highlight keywords, check ATS compatibility. But they don\'t store your experience as structured data. You can\'t reassemble a document from atoms, can\'t track versions, can\'t run a retrospective. It\'s cosmetics, not architecture.',
    has: ['ATS check', 'Keyword scan', 'Templates'],
    misses: ['No atomic data', 'No reassembly', 'No retrospective'],
  },
  {
    label: 'ChatGPT',
    quote: '"ChatGPT will rewrite my resume for free"',
    answer:
      'An LLM doesn\'t know your real experience — it hallucinates metrics and embellishes. After 3 iterations you\'ll have text you can\'t defend in an interview. CV CMS generates only from your verified data — not a single made-up number.',
    has: ['Fast', 'Free', 'Flexible'],
    misses: ['Hallucinations', 'No real data', 'Not defensible'],
  },
];

function Competition() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
          Why not [alternative]?
        </h2>
        <p className="text-muted-foreground mt-4 text-balance max-w-xl">
          Find out how CV CMS compares.
        </p>
        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {competitors.map((c) => (
            <Card key={c.label} className="border-border/50 shadow-none p-6">
              <div className="space-y-4">
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{c.label}</p>
                <h3 className="text-foreground font-medium">{c.quote}</h3>
                <p className="text-muted-foreground text-sm">{c.answer}</p>
                <div className="space-y-2 pt-2 border-t border-border/50">
                  {c.has.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Check className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                  {c.misses.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <Minus className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 12: Final CTA ──────────────────────────────────────────────────

function FinalCta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance font-serif text-3xl font-medium sm:text-4xl">
            Your next application can be different
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-balance">
            No account. No credit card. No friction. Paste your LinkedIn or upload
            a PDF, see your atoms, generate your first tailored resume. 5 minutes
            to your first PDF.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="pr-1.5">
              <Link href="/app">
                <span>Try Free — No Sign-Up Required</span>
                <ChevronRight className="opacity-50" />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Background Blobs ─────────────────────────────────────────────────────────

function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hero area dot grid */}
      <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(circle_at_1px_1px,_var(--border)_1px,_transparent_0)] bg-[size:40px_40px] opacity-[0.15]" />

      {/* Hero blobs */}
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="absolute -top-[100px] -left-32 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[100px]" />
      <div className="absolute top-0 -right-32 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[100px]" />

      {/* Mid-upper blobs */}
      <div className="absolute top-[25%] right-[10%] h-[500px] w-[600px] rounded-full bg-amber-500/15 blur-[120px]" />
      <div className="absolute top-[35%] -left-32 h-[500px] w-[500px] rounded-full bg-rose-500/15 blur-[100px]" />

      {/* Mid blobs */}
      <div className="absolute top-[50%] -right-32 h-[500px] w-[500px] rounded-full bg-blue-500/12 blur-[100px]" />
      <div className="absolute top-[65%] -left-48 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[120px]" />

      {/* Lower blobs */}
      <div className="absolute top-[75%] -right-32 h-[400px] w-[400px] rounded-full bg-amber-500/12 blur-[100px]" />

      {/* Bottom blobs */}
      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 h-[800px] w-[600px] rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="absolute top-[90%] -left-32 h-[400px] w-[400px] rounded-full bg-blue-500/15 blur-[100px]" />
      <div className="absolute top-[92%] -right-32 h-[400px] w-[400px] rounded-full bg-rose-500/10 blur-[100px]" />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="relative">
      <BackgroundBlobs />
      <div className="relative">
        <Navbar />
        <Hero />
        <Features />
        <Stats />
        <CtaTryNow />
        <AhaMoments />
        <ValuePropositions />
        <ThatsMe />
        <HowItWorks />
        <Emotions />
        <LoweringBarriers />
        <Competition />
        <FinalCta />
      </div>
    </div>
  );
}
