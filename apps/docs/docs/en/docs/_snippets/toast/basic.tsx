import { Button } from '@moduix/react/button';
import { Toaster, createToaster } from '@moduix/react/toast';

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
});

export default function App() {
  return (
    <>
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
      <Toaster toaster={toaster} />
    </>
  );
}