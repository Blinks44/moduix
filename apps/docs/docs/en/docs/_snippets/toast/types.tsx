import { Button, Toaster, createToaster } from '@moduix/react';

const types = ['success', 'error', 'warning', 'info'] as const;

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
});

export default function App() {
  return (
    <>
      {types.map((type) => (
        <Button
          key={type}
          onClick={() =>
            toaster[type]({
              title: type === 'info' ? 'Update available' : `${type} toast`,
              description: `This notification uses the ${type} status style.`,
            })
          }
        >
          {type}
        </Button>
      ))}
      <Toaster toaster={toaster} />
    </>
  );
}