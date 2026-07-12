/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Toaster, createToaster } from '@moduix/react';

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
      <Toaster toaster={toaster} />
    </>
  );
}

//#endregion