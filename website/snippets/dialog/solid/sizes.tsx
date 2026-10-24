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
import { For } from 'solid-js';
import styles from '@/components/examples/dialog/dialog-sizes.module.css';

const sizes: DialogSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

export default function DialogSizesDemo() {
  return (
    <div class={styles.row}>
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
    </div>
  );
}