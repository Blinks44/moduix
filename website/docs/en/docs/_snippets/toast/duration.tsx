import { Button } from '@moduix/react/button';
import { Toaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const durations = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: 'Permanent', value: Infinity },
];

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className="toast-preview-stack">
      <Toaster toaster={toaster} />
      <PreviewMeta>
        <output>Last event: {event}</output>
        {durations.map((duration) => (
          <Button
            key={duration.label}
            onClick={() => {
              toaster.info({
                title: 'Reminder set',
                description:
                  duration.value === Infinity
                    ? 'This notification will stay until dismissed.'
                    : `This notification will disappear in ${duration.label}.`,
                duration: duration.value,
              });
              setEvent(`Toast created for ${duration.label}`);
            }}
          >
            {duration.label}
          </Button>
        ))}
      </PreviewMeta>
    </div>
  );
}