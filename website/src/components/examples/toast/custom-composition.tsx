import { Button } from '@moduix/react/button';
import { Toast, Toaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/toast/toast-custom-composition.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className={styles.root}>
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id} className={styles.toast}>
            <div className={styles.content}>
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