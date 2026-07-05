/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Toast, Toaster, createToaster } from '@moduix/react';

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: true,
  gap: 24,
});

export function App() {
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
      <Toaster toaster={toaster}>
        {(toast) => (
          <Toast key={toast.id}>
            <Toast.Title />
            <Toast.Description />
            {toast.closable !== false ? <Toast.CloseTrigger /> : null}
          </Toast>
        )}
      </Toaster>
    </>
  );
}

//#endregion