import { Button } from '@moduix/react/button';
import { ToastToaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import styles from '@/components/examples/toast/toast-options.module.css';

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: 'Permanent', value: Infinity },
];

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function App() {
  const [duration, setDuration] = useState(durations[2]);

  return (
    <div className={styles.root}>
      <ToastToaster toaster={toaster} />
      <div data-preview-meta>
        <output>Duration: {duration.label}</output>
        {durations.map((item) => (
          <Button
            key={item.label}
            variant={item.label === duration.label ? 'default' : 'outline'}
            onClick={() => setDuration(item)}
          >
            {item.label}
          </Button>
        ))}
        <Button
          onClick={() =>
            toaster.info({
              title: 'Reminder set',
              description:
                duration.value === Infinity
                  ? 'This notification will stay until dismissed.'
                  : `This notification will disappear in ${duration.label}.`,
              duration: duration.value,
            })
          }
        >
          Show toast
        </Button>
      </div>
    </div>
  );
}