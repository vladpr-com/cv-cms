'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { importDatabase } from '@/app/actions';
import type { BackupData } from '@/lib/data-types';

interface ImportButtonProps {
  variant?: 'primary' | 'outline';
  onSuccess?: () => void;
}

export function ImportButton({ variant = 'outline', onSuccess }: ImportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const isAuthenticated = !!session?.user;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text) as BackupData;

      if (isAuthenticated) {
        const result = await importDatabase(data);
        if (!result.success) {
          console.error('Import errors:', result.errors);
          return;
        }
      } else {
        const { ClientDataLayer } = await import('@/lib/data-layer/client-data-layer');
        const dl = new ClientDataLayer();
        const result = await dl.importDatabase(data);
        if (!result.success) {
          console.error('Import errors:', result.errors);
          return;
        }
      }

      onSuccess?.();
      router.refresh();
    } catch (err) {
      console.error('Import failed:', err);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const baseClasses = 'inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50';
  const variantClasses = variant === 'primary'
    ? 'bg-foreground text-background hover:bg-foreground/90'
    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        className={`${baseClasses} ${variantClasses}`}
      >
        <Upload className="h-4 w-4" />
        {isImporting ? 'Importing...' : 'Import Backup'}
      </button>
    </>
  );
}
