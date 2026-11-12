import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { ToastToaster, createToaster } from '@moduix/react/toast';
import { useRef } from 'react';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function App() {
  const idRef = useRef<string | undefined>(undefined);

  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster} />
      <Button
        onClick={() => {
          idRef.current = toaster.create({
            title: 'Sending message...',
            description: 'Please wait while we deliver your message.',
            type: 'info',
          });
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
        }}
      >
        Mark as sent
      </Button>
    </Stack>
  );
}