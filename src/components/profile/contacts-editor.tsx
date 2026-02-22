'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Send,
} from 'lucide-react';
import type { Profile, UpdateProfile } from '@/lib/types';

interface ContactsEditorProps {
  profile: Profile;
  onSave: (data: UpdateProfile) => Promise<void>;
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CONTACT_FIELDS = [
  { key: 'email' as const, label: 'Email', icon: Mail, placeholder: 'you@example.com', type: 'email' },
  { key: 'phone' as const, label: 'Phone', icon: Phone, placeholder: '+1 (555) 123-4567', type: 'tel' },
  { key: 'location' as const, label: 'Location', icon: MapPin, placeholder: 'City, Country', type: 'text' },
  { key: 'linkedin' as const, label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username', type: 'url' },
  { key: 'github' as const, label: 'GitHub', icon: Github, placeholder: 'https://github.com/username', type: 'url' },
  { key: 'website' as const, label: 'Website', icon: Globe, placeholder: 'https://yoursite.com', type: 'url' },
  { key: 'telegram' as const, label: 'Telegram', icon: Send, placeholder: '@username', type: 'text' },
] as const;

export function ContactsEditor({
  profile,
  onSave,
  trigger,
  open,
  onOpenChange,
}: ContactsEditorProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of CONTACT_FIELDS) {
      init[f.key] = profile[f.key] || '';
    }
    return init;
  });
  const [saving, setSaving] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      // Reset values when opening
      const init: Record<string, string> = {};
      for (const f of CONTACT_FIELDS) {
        init[f.key] = profile[f.key] || '';
      }
      setValues(init);
    }
    onOpenChange?.(isOpen);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: UpdateProfile = {};
      for (const f of CONTACT_FIELDS) {
        const val = values[f.key]?.trim() || null;
        data[f.key] = val;
      }
      await onSave(data);
      onOpenChange?.(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Contacts</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {CONTACT_FIELDS.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.key} className="flex items-center gap-3">
                <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <Label htmlFor={field.key} className="sr-only">
                    {field.label}
                  </Label>
                  <Input
                    id={field.key}
                    type={field.type}
                    placeholder={field.label}
                    value={values[field.key] || ''}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    className="h-9"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange?.(false)}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
