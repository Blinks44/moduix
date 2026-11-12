import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import {
  Toast,
  ToastCloseTrigger,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
} from '@moduix/react/toast';
import { X as XIcon } from 'lucide-react';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function BuildFromPartsToastDemo() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id}>
            <ToastTitle />
            <ToastDescription />
            <ToastCloseTrigger>
              <XIcon strokeWidth={3} />
            </ToastCloseTrigger>
          </Toast>
        )}
      </ToastToaster>
      <Button
        onClick={() => {
          toaster.create({
            title: 'Scheduled for tomorrow',
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
            type: 'info',
          });
        }}
      >
        Schedule meeting
      </Button>
    </Stack>
  );
}