/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Toaster, createToaster } from '@moduix/react';

const toaster = createToaster({
  placement: 'bottom-end',
  gap: 24,
});

export function App() {
  return (
    <>
      <Button
        onClick={() =>
          toaster.create({
            title: 'Event has been created',
            description: 'We have sent you an email with the event details.',
            type: 'info',
            action: {
              label: 'Undo',
              onClick: () =>
                toaster.info({
                  description: 'Event restored to draft.',
                }),
            },
          })
        }
      >
        Create event
      </Button>
      <Toaster toaster={toaster} />
    </>
  );
}

//#endregion