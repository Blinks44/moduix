import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { ToastToaster, toast } from '@moduix/react/toast';

export default function App() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster />
      <Button
        onClick={() => {
          toast('Scheduled for tomorrow', {
            description: 'Your meeting has been scheduled for tomorrow at 10am.',
          });
        }}
      >
        Schedule meeting
      </Button>
    </Stack>
  );
}