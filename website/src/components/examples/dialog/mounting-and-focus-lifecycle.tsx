import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import { Field, FieldLabel } from '@moduix/react/field';
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
        <DialogTrigger asChild>
          <Button>Edit profile</Button>
        </DialogTrigger>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogBody>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input ref={inputRef} />
              </Field>
            </DialogBody>
            <DialogCloseIcon />
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    </>
  );
}