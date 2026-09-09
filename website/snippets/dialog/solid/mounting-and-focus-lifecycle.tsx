import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';
import { Field } from '@moduix/solid/field';
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
        <Dialog.Trigger asChild={(props) => <Button {...props()}>Edit profile</Button>} />
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Edit profile</Dialog.Title>
            <Dialog.Body>
              <Field>
                <Field.Label>Name</Field.Label>
                <Input ref={(element) => (inputRef = element)} />
              </Field>
            </Dialog.Body>
            <Dialog.CloseIcon />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog>
    </>
  );
}