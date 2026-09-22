import { Button } from '@moduix/react/button';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/toast/toast-custom-composition.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className={styles.root}>
      <ToastToaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id} className={styles.toast}>
            <div className={styles.content}>
              <span aria-hidden="true">ⓘ</span>
              <div>
                <ToastTitle />
                <ToastDescription />
              </div>
            </div>
            <ToastCloseTrigger aria-label="Close custom toast">×</ToastCloseTrigger>
          </Toast>
        )}
      </ToastToaster>
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
