/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Toast, Toaster, createToaster } from '@moduix/react';

const toaster = createToaster({
  placement: 'bottom-end',
  overlap: false,
  gap: 16,
});

export function App() {
  return (
    <>
      <Button
        onClick={() =>
          toaster.info({
            title: 'Expanded toast',
            description: 'Each notification remains fully visible in the stack.',
          })
        }
      >
        Create expanded toast
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