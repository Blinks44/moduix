import { Button } from '@moduix/react/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
  type DrawerSize,
} from '@moduix/react/drawer';
import { Stack } from '@moduix/react/stack';

const sizes: DrawerSize[] = ['sm', 'md', 'lg', 'xl'];

export default function DrawerSizesDemo() {
  return (
    <Stack direction="row" wrap="wrap" gap="2">
      {sizes.map((size) => (
        <Drawer key={size} swipeDirection="end">
          <DrawerTrigger asChild>
            <Button variant="outline">Open {size}</Button>
          </DrawerTrigger>
          <DrawerBackdrop />
          <DrawerPositioner>
            <DrawerContent size={size}>
              <DrawerHeader>
                <DrawerTitle>Size {size}</DrawerTitle>
                <DrawerCloseIcon />
              </DrawerHeader>
              <DrawerBody>
                The size prop picks the width of a side drawer. On narrow screens the drawer leaves
                a gap at the opposite edge.
              </DrawerBody>
            </DrawerContent>
          </DrawerPositioner>
        </Drawer>
      ))}
    </Stack>
  );
}