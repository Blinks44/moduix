import { Button } from '@moduix/react/button';
import { Toast, Toaster, createToaster } from '@moduix/react/toast';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

const toastStyle = {
  '--moduix-toast-bg': 'var(--moduix-color-primary)',
  '--moduix-toast-color': 'var(--moduix-color-primary-foreground)',
  '--moduix-toast-border-color': 'var(--moduix-color-primary)',
  '--moduix-toast-description-color':
    'color-mix(in srgb, var(--moduix-color-primary-foreground) 72%, transparent)',
  '--moduix-toast-close-color': 'var(--moduix-color-primary-foreground)',
  '--moduix-toast-close-color-hover': 'var(--moduix-color-primary-foreground)',
} as CSSProperties;

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className="toast-preview-stack">
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id} style={toastStyle}>
            <div
              style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--moduix-spacing-2)' }}
            >
              <span aria-hidden="true">ⓘ</span>
              <div>
                <Toast.Title />
                <Toast.Description />
              </div>
            </div>
            <Toast.CloseTrigger aria-label="Close custom toast">×</Toast.CloseTrigger>
          </Toast>
        )}
      </Toaster>
      <PreviewMeta>
        <output>Last event: {event}</output>
        <Button
          onClick={() => {
            toaster.success({
              title: 'Workspace synced',
              description: 'Map edits are available to everyone.',
            });
            setEvent('Custom toast created');
          }}
        >
          Create custom toast
        </Button>
      </PreviewMeta>
    </div>
  );
}