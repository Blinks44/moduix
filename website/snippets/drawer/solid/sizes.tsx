import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/drawer';
import { For } from 'solid-js';
import styles from '@/components/examples/drawer/drawer-sizes.module.css';

const sizes: DrawerSize[] = ['sm', 'md', 'lg', 'xl'];

export default function DrawerSizesDemo() {
  return (
    <div class={styles.row}>
      <For each={sizes}>
        {(size) => (
          <Drawer swipeDirection="end">
            <DrawerTrigger
              asChild={(props) => (
                <Button {...props()} variant="outline">
                  Open {size}
                </Button>
              )}
            />
            <DrawerBackdrop />
            <DrawerPositioner>
              <DrawerContent size={size}>
                <DrawerHeader>
                  <DrawerTitle>Size {size}</DrawerTitle>
                  <DrawerCloseIcon />
                </DrawerHeader>
                <DrawerBody>
                  The size prop picks the width of a side drawer. On narrow screens the drawer
                  leaves a gap at the opposite edge.
                </DrawerBody>
              </DrawerContent>
            </DrawerPositioner>
          </Drawer>
        )}
      </For>
    </div>
  );
}