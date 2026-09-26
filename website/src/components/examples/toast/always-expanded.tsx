import { Button } from '@moduix/react/button';
import { ToastToaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/toast/toast-always-expanded.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className={styles.root}>
      <ToastToaster toaster={toaster} />
      <PreviewMeta>
        <output>Last event: {event}</output>
        <Button
          onClick={() => {
            toaster.info({
              title: 'Expanded toast',
              description: 'Each notification remains fully visible in the stack.',
            });
            setEvent('Expanded toast created');
          }}
        >
          Create expanded toast
        </Button>
      </PreviewMeta>
    </div>
  );
}