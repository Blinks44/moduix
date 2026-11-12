import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { ToastToaster, createToaster } from '@moduix/react/toast';

const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 24 });

export default function App() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster} />
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