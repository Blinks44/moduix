import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
  type DialogSize,
} from '@moduix/solid/dialog';
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';

const sizes: DialogSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

export default function DialogSizesDemo() {
  return (
    <Stack direction="row" wrap="wrap" gap="2">
      <For each={sizes}>
        {(size) => (
          <Dialog>
            <DialogTrigger
              asChild={(props) => (
                <Button variant="outline" {...props()}>
                  Open {size}
                </Button>
              )}
            />
            <DialogBackdrop />
            <DialogPositioner>
              <DialogContent size={size}>
                <DialogHeader>
                  <DialogTitle>Size {size}</DialogTitle>
                  <DialogCloseIcon />
                </DialogHeader>
                <DialogBody>
                  The size prop picks a width preset. The full size covers the viewport.
                </DialogBody>
              </DialogContent>
            </DialogPositioner>
          </Dialog>
        )}
      </For>
    </Stack>
  );
}