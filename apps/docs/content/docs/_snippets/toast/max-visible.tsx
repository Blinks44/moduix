/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Toaster, createToaster } from '@moduix/react';

const toaster = createToaster({
  max: 3,
  overlap: true,
  placement: 'bottom-end',
  gap: 16,
});

export function App() {
  return (
    <>
      <Button
        onClick={() =>
          toaster.info({
            title: 'New notification',
            description: 'You have a new message in your inbox.',
          })
        }
      >
        Add notification
      </Button>
      <Button
        onClick={() => {
          messages.forEach((description) => {
            toaster.info({
              title: 'Notification',
              description,
            });
          });
        }}
      >
        Add 5 notifications
      </Button>
      <Toaster toaster={toaster} />
    </>
  );
}

//#endregion