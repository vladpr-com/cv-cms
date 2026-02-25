'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const PROMPT_TEMPLATE = `I need you to create a JSON file with my professional career data. I'll answer your questions, and you'll generate a JSON file I can import into my CV manager.

Ask me about:
1. My name and contact info (email, phone, location, LinkedIn, GitHub, website, Telegram — all optional)
2. My work history (company, role, start/end dates)
3. For each job, my key achievements, projects, and responsibilities — with specific metrics where possible

Then generate a JSON file in this exact format:

\`\`\`json
{
  "profile": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "location": "San Francisco, CA",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  },
  "jobs": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD"
    }
  ],
  "highlights": [
    {
      "title": "Short title of achievement",
      "content": "Detailed description with context and impact",
      "type": "achievement",
      "job": "Company Name",
      "startDate": "YYYY-MM-DD",
      "skills": ["Skill1", "Skill2"],
      "domains": ["Domain1"],
      "metrics": [
        { "label": "Revenue increase", "value": 25, "unit": "%" }
      ]
    }
  ]
}
\`\`\`

Rules:
- Dates must be "YYYY-MM-DD" format. Use "01" for day if unknown.
- "job" field must match the exact company name from the jobs array
- "type" can be: achievement, project, responsibility, education, course, teaching
- "metrics" are optional but encouraged — use them for quantifiable results
- "domains" = business areas (e.g., "Fintech", "E-commerce")
- "skills" = technologies/tools (e.g., "React", "Python", "Kubernetes")
- Omit endDate for current positions
- Profile fields are all optional except fullName

Please start by asking me about my career!`;

export function GenerateWithAIDialog() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PROMPT_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors">
          <Sparkles className="h-4 w-4" />
          Generate with AI
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate CV Data with AI</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Use Claude or ChatGPT to create your career data through a guided conversation.
          </p>

          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">1.</span>
              <span>Copy the prompt below</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">2.</span>
              <span>
                Paste it into{' '}
                <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Claude
                </a>{' '}
                or{' '}
                <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  ChatGPT
                </a>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">3.</span>
              <span>Answer its questions about your career</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">4.</span>
              <span>Save the generated JSON as a <code className="text-xs bg-muted px-1 py-0.5 rounded">.json</code> file</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">5.</span>
              <span>Import it using the &ldquo;Import Backup&rdquo; button</span>
            </li>
          </ol>

          <div className="relative">
            <pre className="bg-muted rounded-md p-3 text-xs leading-relaxed overflow-x-auto max-h-48 whitespace-pre-wrap break-words">
              {PROMPT_TEMPLATE}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-background border border-input rounded-md hover:bg-accent transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
