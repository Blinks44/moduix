import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { ToastToaster, createToaster } from '@moduix/solid/toast';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function ToastBasic() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster} />
      <Button
        onClick={() =>
          toaster.create({
            title: 'Scheduled for tomorrow',
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
            type: 'info',
          })
        }
      >
        Schedule meeting
      </Button>
    </Stack>
  );
}