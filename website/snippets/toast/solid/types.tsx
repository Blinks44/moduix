import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import { ToastToaster, createToaster } from '@moduix/solid/toast';

const types = ['info', 'success', 'warning', 'error'] as const;
const toaster = createToaster({ placement: 'bottom-end', overlap: true, gap: 16 });

export default function ToastTypes() {
  return (
    <Stack align="center" gap="3">
      <ToastToaster toaster={toaster} />
      {types.map((type) => (
        <Button
          onClick={() =>
            toaster.create({
              title: type === 'info' ? 'Update available' : `${type} toast`,
              description: `This notification uses the ${type} status style.`,
              type,
            })
          }
        >
          {type}
        </Button>
      ))}
    </Stack>
  );
}