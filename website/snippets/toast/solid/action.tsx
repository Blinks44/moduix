import { Button } from '@moduix/solid/button';
import { ToastToaster, createToaster } from '@moduix/solid/toast';
import styles from '@/components/examples/toast/toast-action.module.css';

const toaster = createToaster({ placement: 'bottom-end', gap: 24 });

export default function ToastAction() {
  return (
    <div class={styles.root}>
      <ToastToaster toaster={toaster} />
      <Button
        onClick={() =>
          toaster.create({
            title: 'Event has been created',
            description: 'We have sent you an email with the event details.',
            type: 'info',
            action: {
              label: 'Undo',
              onClick: () => toaster.info({ description: 'Event restored to draft.' }),
            },
          })
        }
      >
        Create event
      </Button>
    </div>
  );
}