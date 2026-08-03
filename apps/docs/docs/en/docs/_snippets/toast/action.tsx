import { Button } from '@moduix/react/button';
import { Toaster, createToaster } from '@moduix/react/toast';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const toaster = createToaster({ placement: 'bottom-end', gap: 24 });

export default function App() {
  const [event, setEvent] = useState('No toast created');

  return (
    <div className="toast-preview-stack">
      <Toaster toaster={toaster} />
      <PreviewMeta>
        <output>Last event: {event}</output>
        <Button
          onClick={() => {
            toaster.create({
              title: 'Event has been created',
              description: 'We have sent you an email with the event details.',
              type: 'info',
              action: {
                label: 'Undo',
                onClick: () => {
                  toaster.info({ description: 'Event restored to draft.' });
                  setEvent('Event restored to draft');
                },
              },
            });
            setEvent('Event created');
          }}
        >
          Create event
        </Button>
      </PreviewMeta>
    </div>
  );
}