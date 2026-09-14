import { Button } from '@moduix/solid/button';
import { Toaster, createToaster } from '@moduix/solid/toast';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/toast/toast-update.module.css';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function ToastUpdate() {
  const [toastId, setToastId] = createSignal<string>();

  return (
    <div class={styles.root}>
      <Toaster toaster={toaster} />
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
    </div>
  );
}