import { Button } from '@moduix/react/button';
import { Toaster, createToaster } from '@moduix/react/toast';
import { useRef, useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function App() {
  const idRef = useRef<string | undefined>(undefined);
  const [event, setEvent] = useState('No message started');

  return (
    <div className="toast-preview-stack">
      <Toaster toaster={toaster} />
      <PreviewMeta>
        <output>Last event: {event}</output>
        <Button
          onClick={() => {
            idRef.current = toaster.create({
              title: 'Sending message...',
              description: 'Please wait while we deliver your message.',
              type: 'info',
            });
            setEvent('Message is sending');
          }}
        >
          Send message
        </Button>
        <Button
          onClick={() => {
            if (!idRef.current) return;

            toaster.update(idRef.current, {
              title: 'Message sent',
              description: 'Your message has been delivered successfully.',
              type: 'success',
            });
            setEvent('Message marked as sent');
          }}
        >
          Mark as sent
        </Button>
      </PreviewMeta>
    </div>
  );
}