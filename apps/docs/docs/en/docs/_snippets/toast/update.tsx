import { Button, Toaster, createToaster } from '@moduix/react';
import { useRef } from 'react';

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
});

export default function App() {
  const idRef = useRef<string | undefined>(undefined);
  return (
    <>
      <Button
        onClick={() => {
          idRef.current = toaster.create({
            title: 'Sending message...',
            description: 'Please wait while we deliver your message.',
            type: 'loading',
          });
        }}
      >
        Send message
      </Button>
      <Button
        onClick={() => {
          if (idRef.current) {
            toaster.update(idRef.current, {
              title: 'Message sent',
              description: 'Your message has been delivered successfully.',
              type: 'success',
            });
          }
        }}
      >
        Mark as sent
      </Button>
      <Toaster toaster={toaster} />
    </>
  );
}