import { Button } from '@moduix/react/button';
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
} from '@moduix/react/dialog';
import { Stack } from '@moduix/react/stack';

const sizes: DialogSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

export default function DialogSizesDemo() {
  return (
    <Stack direction="row" wrap="wrap" gap="2">
      {sizes.map((size) => (
        <Dialog key={size}>
          <DialogTrigger asChild>
            <Button variant="outline">Open {size}</Button>
          </DialogTrigger>
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
      ))}
    </Stack>
  );
}