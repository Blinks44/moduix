import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { ToastToaster, toast } from '@moduix/solid/toast';

export default function ToastBasic() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster />
      <Button
        onClick={() =>
          toast('Scheduled for tomorrow', {
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
          })
        }
      >
        Schedule meeting
      </Button>
    </Stack>
  );
}