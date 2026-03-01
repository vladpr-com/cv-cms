'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, FileText, Loader2, Printer, Settings, X } from 'lucide-react';
import type { ResumeData, ResumeContacts } from '@/app/actions/optimize';
import { useDataLayer } from '@/contexts/data-context';

const authEnabled = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true';

// ─── Resume Preview Component ────────────────────────────────────────────────

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex-shrink-0"
      title="Remove"
    >
      <X className="h-3.5 w-3.5" />
    </button>
  );
}

function ResumePreview({
  data,
  onRemoveExperience,
  onRemoveEducation,
}: {
  data: ResumeData;
  onRemoveExperience: (index: number) => void;
  onRemoveEducation: (index: number) => void;
}) {
  return (
    <div id="resume-preview" className="resume-preview">
      <h1
        contentEditable
        suppressContentEditableWarning
        className="text-2xl font-bold text-foreground outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
      >
        {data.name}
      </h1>

      {data.contacts && Object.values(data.contacts).some(Boolean) && (
        <div className="mt-1 text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
          {Object.entries(data.contacts).map(([key, value]) =>
            value ? (
              <span
                key={key}
                contentEditable
                suppressContentEditableWarning
                className="outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
              >
                {value}
              </span>
            ) : null
          )}
        </div>
      )}

      {data.summary && (
        <section className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1 mb-2">
            Summary
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            className="text-sm text-foreground leading-relaxed outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
          >
            {data.summary}
          </p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {data.experience.map((exp, i) => (
              <div key={i} className="group relative">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-1.5">
                    <RemoveButton onClick={() => onRemoveExperience(i)} />
                    <div>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        className="font-semibold text-sm text-foreground outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
                      >
                        {exp.role}
                      </span>
                      <span className="text-muted-foreground text-sm"> at </span>
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        className="text-sm text-foreground outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
                      >
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="text-xs text-muted-foreground whitespace-nowrap outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
                  >
                    {exp.period}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="mt-1 space-y-0.5 list-disc list-outside ml-4">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        contentEditable
                        suppressContentEditableWarning
                        className="text-sm text-foreground leading-snug outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1 mb-2">
            Skills
          </h2>
          <p
            contentEditable
            suppressContentEditableWarning
            className="text-sm text-foreground outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
          >
            {data.skills.join(' \u00B7 ')}
          </p>
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {data.education.map((edu, i) => (
              <div key={i} className="group flex items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-1.5">
                  <RemoveButton onClick={() => onRemoveEducation(i)} />
                  <div>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="font-semibold text-sm text-foreground outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
                    >
                      {edu.degree}
                    </span>
                    <span className="text-muted-foreground text-sm"> - </span>
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="text-sm text-foreground outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
                    >
                      {edu.institution}
                    </span>
                  </div>
                </div>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="text-xs text-muted-foreground whitespace-nowrap outline-none focus:ring-1 focus:ring-ring rounded px-1 -mx-1"
                >
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ─── Print Styles ────────────────────────────────────────────────────────────

const PRINT_STYLES = `
  @page { size: A4; margin: 15mm 20mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    font-size: 11pt;
    color: #333;
    line-height: 1.4;
  }
  h1 { font-size: 18pt; font-weight: 700; margin: 0 0 2pt; color: #111; }
  .contacts { font-size: 9pt; color: #666; margin-bottom: 10pt; }
  .contacts span { margin-right: 12pt; }
  h2 {
    font-size: 10pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    color: #666;
    border-bottom: 1px solid #ccc;
    padding-bottom: 2pt;
    margin: 10pt 0 6pt;
  }
  .summary { font-size: 10pt; line-height: 1.5; color: #333; }
  .experience-item { margin-bottom: 8pt; }
  .experience-header { display: flex; justify-content: space-between; align-items: baseline; }
  .role { font-weight: 600; font-size: 10.5pt; color: #111; }
  .company { font-size: 10.5pt; color: #333; }
  .period { font-size: 9pt; color: #666; white-space: nowrap; }
  ul { margin: 3pt 0 0 16pt; padding: 0; }
  li { font-size: 10pt; line-height: 1.45; margin-bottom: 1pt; color: #333; }
  .skills { font-size: 10pt; color: #333; }
  .education-item { display: flex; justify-content: space-between; align-items: baseline; }
  .degree { font-weight: 600; font-size: 10.5pt; color: #111; }
  .institution { font-size: 10.5pt; color: #333; }
`;

// ─── Client-side resume generation (for anonymous/local mode) ────────────────

async function generateResumeLocal(
  vacancyText: string,
  webhookUrl: string,
  dataLayer: import('@/lib/data-layer/types').DataLayer,
): Promise<{ data?: ResumeData; error?: string }> {
  if (!vacancyText || vacancyText.length < 50) {
    return { error: 'Job description must be at least 50 characters' };
  }

  try {
    new URL(webhookUrl);
  } catch {
    return { error: 'Invalid webhook URL' };
  }

  try {
    const [profileData, jobsList, highlightsWithJobs] = await Promise.all([
      dataLayer.getProfile(),
      dataLayer.getJobs(),
      dataLayer.getAllHighlightsWithJobs(),
    ]);

    const highlightsData = {
      profile: { fullName: profileData?.fullName || '' },
      jobs: jobsList.map(j => ({
        id: j.id,
        company: j.company,
        role: j.role,
        start_date: j.startDate,
        end_date: j.endDate,
      })),
      highlights: highlightsWithJobs.map(h => ({
        id: h.id,
        title: h.title,
        content: h.content,
        type: h.type,
        company: h.job?.company || '',
        role: h.job?.role || '',
        period: (h.job?.startDate || '') + ' - ' + (h.job?.endDate || 'present'),
        start_date: h.startDate,
        end_date: h.endDate,
        domains: h.domains,
        skills: h.skills,
        keywords: h.keywords,
        metrics: h.metrics,
      })),
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vacancyText, highlightsData }),
    });

    if (!response.ok) {
      return { error: 'Failed to generate resume. Please try again.' };
    }

    const result = await response.json();

    let resumeData: ResumeData;
    if (typeof result.resume === 'string') {
      let cleaned = result.resume.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
      }
      resumeData = JSON.parse(cleaned);
    } else if (result.resume && typeof result.resume === 'object') {
      resumeData = result.resume;
    } else if (result.data) {
      resumeData = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
    } else {
      resumeData = result;
    }

    if (!resumeData.name || !resumeData.experience) {
      return { error: 'Invalid resume data received from AI agent' };
    }

    // Inject contacts from local profile
    if (profileData) {
      const contacts: ResumeContacts = {};
      if (profileData.email) contacts.email = profileData.email;
      if (profileData.phone) contacts.phone = profileData.phone;
      if (profileData.location) contacts.location = profileData.location;
      if (profileData.linkedin) contacts.linkedin = profileData.linkedin;
      if (profileData.github) contacts.github = profileData.github;
      if (profileData.website) contacts.website = profileData.website;
      if (profileData.telegram) contacts.telegram = profileData.telegram;
      resumeData.contacts = contacts;
      if (profileData.fullName) resumeData.name = profileData.fullName;
    }

    return { data: resumeData };
  } catch (err) {
    console.error('Resume generation error:', err);
    return { error: 'Failed to generate resume. Please try again.' };
  }
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export function OptimizeClient() {
  const { dataLayer, mode, isReady } = useDataLayer();

  const [vacancyText, setVacancyText] = useState('');
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  const webhookUrl = typeof window !== 'undefined' ? localStorage.getItem('n8n-webhook-url') : null;

  // Warn before leaving if resume has been generated
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (resumeData) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [resumeData]);

  async function handleGenerate() {
    if (!webhookUrl) {
      setError('No webhook URL configured. Please set it in Settings.');
      return;
    }

    if (!vacancyText || vacancyText.length < 50) {
      setError('Job description must be at least 50 characters');
      return;
    }

    setIsGenerating(true);
    setError(null);

    let result: { data?: ResumeData; error?: string };

    if (mode === 'authenticated' && authEnabled) {
      // Use server action for authenticated mode
      const { generateResume } = await import('@/app/actions/optimize');
      result = await generateResume(vacancyText, webhookUrl);
    } else {
      // Use client-side generation for anonymous/local mode
      result = await generateResumeLocal(vacancyText, webhookUrl, dataLayer);
    }

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setResumeData(result.data);
    }

    setIsGenerating(false);
  }

  function handleRemoveExperience(index: number) {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((_, i) => i !== index),
    });
  }

  function handleRemoveEducation(index: number) {
    if (!resumeData) return;
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((_, i) => i !== index),
    });
  }

  function handlePrint() {
    const resumeEl = resumeRef.current?.querySelector('#resume-preview');
    if (!resumeEl) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const el = resumeEl as HTMLElement;

    // Build print HTML from the contentEditable DOM
    let html = `<h1>${el.querySelector('h1')?.textContent || ''}</h1>`;

    // Contacts
    const contactsEl = el.querySelector('.mt-1.text-sm');
    if (contactsEl) {
      const spans = contactsEl.querySelectorAll('span[contenteditable]');
      html += '<div class="contacts">';
      spans.forEach((s) => {
        html += `<span>${s.textContent}</span>`;
      });
      html += '</div>';
    }

    // Sections
    const sections = el.querySelectorAll('section');
    sections.forEach((section) => {
      const heading = section.querySelector('h2');
      if (!heading) return;
      const title = heading.textContent || '';
      html += `<h2>${title}</h2>`;

      if (title.toLowerCase() === 'summary') {
        const p = section.querySelector('p');
        html += `<p class="summary">${p?.textContent || ''}</p>`;
      } else if (title.toLowerCase() === 'experience') {
        const items = section.querySelectorAll(':scope > div > div.group');
        items.forEach((item) => {
          html += '<div class="experience-item">';
          const allEditable = item.querySelectorAll('span[contenteditable]');
          // Order: role, company, period
          const role = allEditable[0]?.textContent || '';
          const company = allEditable[1]?.textContent || '';
          const period = allEditable[2]?.textContent || '';
          html += '<div class="experience-header"><div>';
          html += `<span class="role">${role}</span>`;
          html += ' at ';
          html += `<span class="company">${company}</span>`;
          html += '</div>';
          html += `<span class="period">${period}</span>`;
          html += '</div>';
          const bullets = item.querySelectorAll('li');
          if (bullets.length > 0) {
            html += '<ul>';
            bullets.forEach((li) => {
              html += `<li>${li.textContent}</li>`;
            });
            html += '</ul>';
          }
          html += '</div>';
        });
      } else if (title.toLowerCase() === 'skills') {
        const p = section.querySelector('p');
        html += `<p class="skills">${p?.textContent || ''}</p>`;
      } else if (title.toLowerCase() === 'education') {
        const items = section.querySelectorAll(':scope > div > div.group');
        items.forEach((item) => {
          const spans = item.querySelectorAll('span[contenteditable]');
          html += '<div class="education-item"><div>';
          html += `<span class="degree">${spans[0]?.textContent || ''}</span>`;
          html += ' - ';
          html += `<span class="institution">${spans[1]?.textContent || ''}</span>`;
          html += '</div>';
          html += `<span class="period">${spans[2]?.textContent || ''}</span>`;
          html += '</div>';
        });
      }
    });

    printWindow.document.write(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Resume</title><style>${PRINT_STYLES}</style></head><body>${html}</body></html>`,
    );
    printWindow.document.close();
    printWindow.print();
  }

  if (!isReady) {
    return (
      <div className="flex-1 bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/app"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <h1 className="text-2xl font-bold">Optimize Resume</h1>
          </div>
          {resumeData && (
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input */}
          <div className="space-y-4">
            {!webhookUrl && (
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  No n8n webhook URL configured.{' '}
                  <Link href="/settings" className="underline font-medium">
                    Set it in Settings
                  </Link>{' '}
                  to enable resume generation.
                </AlertDescription>
              </Alert>
            )}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-4 w-4" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the full job description here (minimum 50 characters)..."
                  value={vacancyText}
                  onChange={(e) => setVacancyText(e.target.value)}
                  className="min-h-[300px] resize-y"
                  disabled={isGenerating}
                />
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {vacancyText.length} characters
                  </span>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || vacancyText.length < 50}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Resume'
                    )}
                  </Button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-destructive">{error}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Resume Preview */}
          <div ref={resumeRef}>
            {isGenerating ? (
              <Card>
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mb-4" />
                  <p className="text-sm">Analyzing job posting and generating your tailored resume...</p>
                  <p className="text-xs mt-1">This may take 30-60 seconds</p>
                </CardContent>
              </Card>
            ) : resumeData ? (
              <Card>
                <CardContent className="pt-6">
                  <ResumePreview
                    data={resumeData}
                    onRemoveExperience={handleRemoveExperience}
                    onRemoveEducation={handleRemoveEducation}
                  />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[400px] text-muted-foreground">
                  <FileText className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-sm">Paste a job description and click &quot;Generate Resume&quot;</p>
                  <p className="text-xs mt-1">Your career data will be used to create a tailored resume</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
