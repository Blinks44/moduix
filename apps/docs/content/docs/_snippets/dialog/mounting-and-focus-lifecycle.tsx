/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Dialog } from '@moduix/react';
import { useRef } from 'react';

export function DialogLifecycleDemo() {
  const inputRef = useRef(null as HTMLInputElement | null);
  const finalFocusRef = useRef(null as HTMLButtonElement | null);
  return (
    <>
      <Button ref={finalFocusRef}>Final focus target</Button>
      <Dialog
        lazyMount
        unmountOnExit
        initialFocusEl={() => inputRef.current}
        finalFocusEl={() => finalFocusRef.current}
      >
        <Dialog.Trigger asChild>
          <Button>Edit profile</Button>
        </Dialog.Trigger>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Edit profile</Dialog.Title>
            <input ref={inputRef} className="dialog-input" />
            <Dialog.CloseIcon />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog>
    </>
  );
}

//#endregion