import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { ToastToaster, createToaster } from '@moduix/solid/toast';

const toaster = createToaster({ placement: 'bottom-end', overlap: false, gap: 16 });

export default function ToastNonOverlapping() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster} />
      <Button
        onClick={() =>
          toaster.info({
            title: 'Expanded toast',
            description: 'Each notification remains fully visible in the stack.',
          })
        }
      >
        Create expanded toast
      </Button>
    </Stack>
  );
}