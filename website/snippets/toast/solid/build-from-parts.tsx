import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/solid/toast';
import { X as XIcon } from 'lucide-solid';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function BuildFromPartsToastDemo() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster}>
        {() => (
          <Toast>
            <ToastTitle />
            <ToastDescription />
            <ToastCloseTrigger>
              <XIcon strokeWidth={3} />
            </ToastCloseTrigger>
          </Toast>
        )}
      </ToastToaster>
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