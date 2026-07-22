import { Button, Toaster, createToaster } from '@moduix/react';

const durations = [
  {
    label: '1s',
    value: 1000,
  },
  {
    label: '3s',
    value: 3000,
  },
  {
    label: '5s',
    value: 5000,
  },
  {
    label: 'Permanent',
    value: Infinity,
  },
];

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 16,
});

export default function App() {
  return (
    <>
      {durations.map((duration) => (
        <Button
          key={duration.label}
          onClick={() =>
            toaster.info({
              title: 'Reminder set',
              description:
                duration.value === Infinity
                  ? 'This notification will stay until dismissed.'
                  : `This notification will disappear in ${duration.label}.`,
              duration: duration.value,
            })
          }
        >
          {duration.label}
        </Button>
      ))}
      <Toaster toaster={toaster} />
    </>
  );
}