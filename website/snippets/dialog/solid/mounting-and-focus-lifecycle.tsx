import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogContent,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';
import { Field, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';

export default function DialogLifecycleDemo() {
  let inputRef: HTMLInputElement | null = null;
  let finalFocusRef: HTMLButtonElement | null = null;

  return (
    <>
      <Button ref={(element) => (finalFocusRef = element)}>Final focus target</Button>
      <Dialog
        lazyMount
        unmountOnExit
        initialFocusEl={() => inputRef}
        finalFocusEl={() => finalFocusRef}
      >
        <DialogTrigger asChild={(props) => <Button {...props()}>Edit profile</Button>} />
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogBody>
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input ref={(element) => (inputRef = element)} />
              </Field>
            </DialogBody>
            <DialogCloseIcon />
          </DialogContent>
        </DialogPositioner>
      </Dialog>
    </>
  );
}
