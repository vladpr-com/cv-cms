/**
 * Normalizes relaxed JSON import data into strict BackupData format.
 *
 * Accepts simplified input (no IDs, no timestamps, job references by company name)
 * and fills in all required fields so it passes BackupData validation.
 */

import type { BackupData } from '@/lib/data-types';
import { slugify, ensureUniqueSlug } from '@/lib/slug';

interface RelaxedMetric {
  label: string;
  value: number;
  unit?: string;
  prefix?: string;
  description?: string;
}

interface RelaxedJob {
  id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string | null;
  logoUrl?: string | null;
  website?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

interface RelaxedHighlight {
  id?: string;
  jobId?: string | null;
  job?: string | null; // company name reference
  type?: string;
  title: string;
  content?: string;
  startDate?: string;
  endDate?: string | null;
  domains?: string[];
  skills?: string[];
  keywords?: string[];
  metrics?: RelaxedMetric[];
  isHidden?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface RelaxedProfile {
  fullName: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  linkedin?: string | null;
  github?: string | null;
  website?: string | null;
  telegram?: string | null;
}

interface RelaxedImportData {
  version?: string;
  exportedAt?: string;
  jobs?: RelaxedJob[];
  highlights?: RelaxedHighlight[];
  profile?: RelaxedProfile;
}

const VALID_TYPES = new Set([
  'achievement', 'project', 'responsibility', 'education', 'course', 'teaching',
]);

export function normalizeImportData(raw: unknown): BackupData {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Import data must be a JSON object');
  }

  const input = raw as RelaxedImportData;
  const now = new Date().toISOString();

  // Normalize jobs
  const usedJobSlugs = new Map<string, number>();
  const jobCompanyToSlug = new Map<string, string>(); // lowercase company → slug

  const normalizedJobs = (input.jobs ?? []).map((job) => {
    const startDate = job.startDate || now.slice(0, 10);
    const baseSlug = slugify(`${job.company}-${job.role}-${startDate}`, 'job');
    const slug = job.id || ensureUniqueSlug(baseSlug, usedJobSlugs);

    // Track by company name (lowercase) for highlight resolution
    // If multiple jobs at same company, last one wins — but we also try company+role
    const companyKey = job.company.toLowerCase();
    jobCompanyToSlug.set(companyKey, slug);
    // Also index by "company role" for more precise matching
    const companyRoleKey = `${job.company} ${job.role}`.toLowerCase();
    jobCompanyToSlug.set(companyRoleKey, slug);

    if (!job.id) {
      // Ensure slug is tracked even when using generated slug
      if (!usedJobSlugs.has(baseSlug)) {
        usedJobSlugs.set(slug, 1);
      }
    }

    return {
      id: slug,
      company: job.company,
      role: job.role,
      startDate,
      endDate: job.endDate ?? null,
      logoUrl: job.logoUrl ?? null,
      website: job.website ?? null,
      createdAt: job.createdAt || now,
      updatedAt: job.updatedAt || now,
    };
  });

  // Normalize highlights
  const usedHighlightSlugs = new Map<string, number>();

  const normalizedHighlights = (input.highlights ?? []).map((h) => {
    // Resolve job reference: "job" field (company name) → job slug
    let resolvedJobId: string | null = null;
    if (h.jobId) {
      // Already has a slug-style jobId
      resolvedJobId = h.jobId;
    } else if (h.job) {
      // Match by company name (case-insensitive)
      const key = h.job.toLowerCase();
      resolvedJobId = jobCompanyToSlug.get(key) ?? null;
    }

    const type = h.type && VALID_TYPES.has(h.type) ? h.type : 'achievement';
    const startDate = h.startDate || now.slice(0, 10);
    const content = h.content || h.title;

    const baseSlug = resolvedJobId
      ? slugify(`${resolvedJobId}-${h.title}-${startDate}`, 'highlight')
      : slugify(`${h.title}-${startDate}`, 'highlight');
    const slug = h.id || ensureUniqueSlug(baseSlug, usedHighlightSlugs);

    if (!h.id) {
      if (!usedHighlightSlugs.has(baseSlug)) {
        usedHighlightSlugs.set(slug, 1);
      }
    }

    return {
      id: slug,
      jobId: resolvedJobId,
      type: type as BackupData['highlights'][number]['type'],
      title: h.title,
      content,
      startDate,
      endDate: h.endDate ?? null,
      domains: h.domains ?? [],
      skills: h.skills ?? [],
      keywords: h.keywords ?? [],
      metrics: (h.metrics ?? []).map((m) => ({
        label: m.label,
        value: m.value,
        unit: m.unit ?? '',
        ...(m.prefix ? { prefix: m.prefix } : {}),
        ...(m.description ? { description: m.description } : {}),
      })),
      isHidden: h.isHidden ?? false,
      createdAt: h.createdAt || now,
      updatedAt: h.updatedAt || now,
    };
  });

  return {
    version: input.version || '1.0',
    exportedAt: input.exportedAt || now,
    jobs: normalizedJobs,
    highlights: normalizedHighlights,
    ...(input.profile
      ? {
          profile: {
            fullName: input.profile.fullName,
            email: input.profile.email ?? null,
            phone: input.profile.phone ?? null,
            location: input.profile.location ?? null,
            linkedin: input.profile.linkedin ?? null,
            github: input.profile.github ?? null,
            website: input.profile.website ?? null,
            telegram: input.profile.telegram ?? null,
          },
        }
      : {}),
  };
}
