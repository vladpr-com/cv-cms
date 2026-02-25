'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { JobForm, JobFormData } from '@/components/forms/job-form';
import { Plus, Pencil, Trash } from 'lucide-react';
import { createJob, updateJob, deleteJob } from '@/app/actions';
import type { Job } from '@/lib/data-types';
import { useRouter } from 'next/navigation';

interface CreateJobDialogProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: 'anonymous' | 'authenticated';
}

export function CreateJobDialog({
  onSuccess,
  trigger,
  open: controlledOpen,
  onOpenChange,
  mode = 'authenticated',
}: CreateJobDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (value) setError(null);
  }

  async function handleSubmit(data: JobFormData) {
    setIsLoading(true);
    setError(null);
    try {
      const { isCurrent, ...jobData } = data;
      const jobPayload = {
        ...jobData,
        logoUrl: jobData.logoUrl || null,
        website: jobData.website || null,
        endDate: isCurrent ? null : (jobData.endDate || null),
      };

      if (mode === 'anonymous') {
        const { ClientDataLayer } = await import('@/lib/data-layer/client-data-layer');
        const dl = new ClientDataLayer();
        await dl.createJob(jobPayload);
      } else {
        await createJob(jobPayload);
        router.refresh();
      }

      setOpen(false);
      onSuccess?.();
    } catch (error: unknown) {
      console.error('Failed to create job:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError('Failed to create job: ' + message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Job</DialogTitle>
          <DialogDescription>
            Add a new company to your career timeline.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md">{error}</div>}
        <JobForm onSubmit={handleSubmit} isLoading={isLoading} submitLabel="Create Job" />
      </DialogContent>
    </Dialog>
  );
}

interface EditJobDialogProps {
  job: Job;
  onSuccess?: () => void;
  onDelete?: () => void;
  trigger?: React.ReactNode;
  mode?: 'anonymous' | 'authenticated';
}

export function EditJobDialog({
  job,
  onSuccess,
  onDelete,
  trigger,
  mode = 'authenticated',
}: EditJobDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (value) setError(null);
  }

  async function handleSubmit(data: JobFormData) {
    setIsLoading(true);
    setError(null);
    try {
      const { isCurrent, ...jobData } = data;
      const updatePayload = {
        ...jobData,
        logoUrl: jobData.logoUrl || null,
        website: jobData.website || null,
        endDate: isCurrent ? null : (jobData.endDate || null),
      };

      if (mode === 'anonymous') {
        const { ClientDataLayer } = await import('@/lib/data-layer/client-data-layer');
        const dl = new ClientDataLayer();
        await dl.updateJob(job.id, updatePayload);
      } else {
        await updateJob(job.id, updatePayload);
        router.refresh();
      }

      setOpen(false);
      onSuccess?.();
    } catch (error: unknown) {
      console.error('Failed to update job:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError('Failed to update job: ' + message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    setIsLoading(true);
    try {
      if (mode === 'anonymous') {
        const { ClientDataLayer } = await import('@/lib/data-layer/client-data-layer');
        const dl = new ClientDataLayer();
        await dl.deleteJob(job.id);
      } else {
        await deleteJob(job.id);
        router.refresh();
      }
      setOpen(false);
      onDelete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete job');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription>
            Update the details for {job.company}.
          </DialogDescription>
        </DialogHeader>
        {error && <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-md">{error}</div>}
        <JobForm
          defaultValues={{
            company: job.company,
            role: job.role,
            startDate: job.startDate,
            isCurrent: !job.endDate,
            endDate: job.endDate || '',
            logoUrl: job.logoUrl || '',
            website: job.website || '',
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitLabel="Update Job"
        />
        <div className="pt-4 border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="w-full" disabled={isLoading}>
                <Trash className="w-4 h-4 mr-2" />
                Delete Job
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Job</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete &quot;{job.company}&quot;? Highlights linked to this job will be kept but unlinked. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
