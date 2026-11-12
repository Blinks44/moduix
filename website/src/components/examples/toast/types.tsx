import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import { ToastToaster, createToaster } from '@moduix/react/toast';

const types = ['info', 'success', 'warning', 'error'] as const;
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function App() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster} />
      {types.map((type) => (
        <Button
          key={type}
          onClick={() => {
            toaster.create({
              title: type === 'info' ? 'Update available' : `${type} toast`,
              description: `This notification uses the ${type} status style.`,
              type,
            });
          }}
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
}