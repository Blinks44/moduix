import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { ToastToaster, createToaster } from '@moduix/solid/toast';

const toaster = createToaster({ placement: 'bottom-end', gap: 24 });

export default function ToastAction() {
  return (
    <Stack align="center" gap="3">
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
    </Stack>
  );
}