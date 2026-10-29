import { Button } from '@moduix/react/button';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/react/toast';
import { X as XIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/toast/toast-basic.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function BuildFromPartsToastDemo() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className={styles.root}>
      <ToastToaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id}>
            <ToastTitle />
            <ToastDescription />
            <ToastCloseTrigger>
              <XIcon strokeWidth={3} />
            </ToastCloseTrigger>
          </Toast>
        )}
      </ToastToaster>
      <PreviewMeta>
        <output>Last event: {event}</output>
        <Button
          onClick={() => {
            toaster.create({
              title: 'Scheduled for tomorrow',
              description: 'Your meeting has been scheduled for tomorrow at 10am.',
              type: 'info',
            });
            setEvent('Meeting scheduled');
          }}
        >
          Schedule meeting
        </Button>
      </PreviewMeta>
    </div>
  );
}