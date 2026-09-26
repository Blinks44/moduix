import { Button } from '@moduix/react/button';
import { ToastToaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/toast/toast-basic.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className={styles.root}>
      <ToastToaster toaster={toaster} />
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