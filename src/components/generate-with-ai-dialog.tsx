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

const PROMPT_TEMPLATE = `Extract my professional experience from the attached materials and generate a structured JSON file for import into my CV manager.

I may attach:
- A transcript of a voice conversation about my career
- My existing CV/resume (PDF or text)
- Both — in that case, merge the information, preferring more detailed descriptions

Your goal: extract every distinct achievement, project, responsibility, education item, and course — and structure them as atomic "highlights" linked to jobs.

Guidelines for extraction:
- Split large responsibilities into separate highlights — one per distinct topic
- Write "content" in first person, professionally, with context and impact
- Infer metrics from the text where possible (e.g., "managed a team of 5" → metric)
- If dates are vague (e.g., "around 2019"), use your best estimate with "01" for unknown day/month
- Don't skip anything — it's better to have more highlights that can be filtered later

Output this exact JSON format:

\`\`\`json
{
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
- "job" field must exactly match a company name from the jobs array
- "type" can be: achievement, project, responsibility, education, course, teaching
- "metrics" are optional but encouraged — use them for quantifiable results
- "domains" = business areas (e.g., "Fintech", "E-commerce")
- "skills" = technologies/tools (e.g., "React", "Python", "Kubernetes")
- Omit endDate for current positions
- Output only the JSON, no commentary`;

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
            Turn a voice conversation transcript or your existing CV into structured career data using AI.
          </p>

          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">1.</span>
              <span>Record a voice conversation about your career (e.g. ChatGPT voice mode) and transcribe it, or grab your existing CV</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">2.</span>
              <span>Copy the prompt below</span>
            </li>
            <li className="flex gap-2">
              <span className="font-medium text-foreground shrink-0">3.</span>
              <span>
                Paste the prompt + your transcript/CV into{' '}
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
              <span className="font-medium text-foreground shrink-0">4.</span>
              <span>Save the generated JSON as a <code className="text-xs bg-muted px-1 py-0.5 rounded">.json</code> file and import it here</span>
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
