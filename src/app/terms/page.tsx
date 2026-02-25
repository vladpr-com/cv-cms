import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Terms of Service</h1>
        </div>

        <p className="text-sm text-muted-foreground">Last updated: February 25, 2026</p>

        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">1. Service Description</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CV CMS (&quot;the Service&quot;) is a headless content management system for managing
              professional career data, including employment history, achievements, projects, and
              other highlights. The Service can be used anonymously with local browser storage or
              with an authenticated account for cloud storage.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">2. User Accounts</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You may create an account by signing in through GitHub or Google OAuth. You are
              responsible for maintaining the security of your account credentials with these
              providers. You must not share your account or use another person&apos;s account
              without permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">3. User Responsibilities</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You agree to use the Service only for its intended purpose of managing professional
              career data. You are solely responsible for the content you create and store within
              the Service. You must not use the Service for any unlawful purpose or in any way
              that could damage, disable, or impair the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">4. Data Ownership</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You retain full ownership of all content you create and store in the Service.
              We do not claim any intellectual property rights over your data. You may export
              or delete your data at any time through the Settings page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">5. Third-Party Services</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Service integrates with third-party services including:
            </p>
            <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
              <li>GitHub and Google for authentication</li>
              <li>Turso for cloud database storage</li>
              <li>n8n webhooks for optional resume optimization (user-configured)</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your use of these third-party services is subject to their respective terms of
              service and privacy policies. We are not responsible for the practices of these
              third-party services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">6. Service Availability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We strive to keep the Service available but do not guarantee uninterrupted access.
              The Service may be temporarily unavailable due to maintenance, updates, or
              circumstances beyond our control.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Service is provided &quot;as is&quot; without warranties of any kind, either
              express or implied. We shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of or inability to use the
              Service, including any loss of data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">8. Modifications</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We reserve the right to modify or discontinue the Service at any time, with or
              without notice. We may also update these Terms from time to time. Continued use
              of the Service after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">9. Contact</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              If you have questions about these Terms of Service, please contact us through the
              project&apos;s GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
