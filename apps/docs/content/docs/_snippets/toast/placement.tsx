/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Toast, Toaster } from '@moduix/react';
import { useState } from 'react';

const placements = ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end'];

export function App() {
  const [placement, setPlacement] = useState<(typeof placements)[number]>('bottom-end');
  const toaster = toasters[placement];
  return (
    <>
      {placements.map((item) => (
        <Button key={item} onClick={() => setPlacement(item)}>
          {item}
        </Button>
      ))}
      <Button
        onClick={() =>
          toaster.info({
            title: 'Notification',
            description: `This toast appears at ${placement}.`,
          })
        }
      >
        Show {placement}
      </Button>
      {placements.map((item) => (
        <Toaster key={item} toaster={toasters[item]}>
          {(toast) => (
            <Toast key={toast.id}>
              <Toast.Title />
              <Toast.Description />
              {toast.closable !== false ? <Toast.CloseTrigger /> : null}
            </Toast>
          )}
        </Toaster>
      ))}
    </>
  );
}

//#endregion