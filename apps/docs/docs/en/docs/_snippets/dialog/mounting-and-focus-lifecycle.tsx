import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';
import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { useRef } from 'react';

export default function DialogLifecycleDemo() {
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
            <Dialog.Body>
              <Field>
                <Field.Label>Name</Field.Label>
                <Input ref={inputRef} />
              </Field>
            </Dialog.Body>
            <Dialog.CloseIcon />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog>
    </>
  );
}