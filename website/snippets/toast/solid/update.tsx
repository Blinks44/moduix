import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { ToastToaster, createToaster } from '@moduix/solid/toast';
import { createSignal } from 'solid-js';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function ToastUpdate() {
  const [toastId, setToastId] = createSignal<string>();

  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster} />
      <Button
        onClick={() =>
          setToastId(
            toaster.create({
              title: 'Sending message...',
              description: 'Please wait while we deliver your message.',
              type: 'info',
            }),
          )
        }
      >
        Send message
      </Button>
      <Button
        onClick={() => {
          const id = toastId();
          if (!id) return;

          toaster.update(id, {
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