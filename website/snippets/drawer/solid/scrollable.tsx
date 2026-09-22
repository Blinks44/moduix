import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/solid/drawer';
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@moduix/solid/scroll-area';
import { For } from 'solid-js';
import styles from '@/components/examples/drawer/drawer-scrollable.module.css';

const scrollSections = [
  {
    title: 'Keyboard and focus',
    body: 'Tab and Shift+Tab should stay predictable while Escape or explicit controls request close.',
  },
  {
    title: 'Viewport overflow',
    body: 'Keep the container visible and place long content in a dedicated scrollable inner region.',
  },
  {
    title: 'Close affordances',
    body: 'Always provide an explicit close action when the surface can be dismissed by the user.',
  },
  {
    title: 'Mobile ergonomics',
    body: 'Keep touch targets reachable and avoid cramped headers on narrow viewports.',
  },
  {
    title: 'Persistent panels',
    body: 'Keep important controls fixed and scroll only the supporting content.',
  },
  {
    title: 'Status updates',
    body: 'After completion, close the surface and show an inline confirmation or toast.',
  },
  {
    title: 'Error handling',
    body: 'When an action fails, keep the user in context and show recovery near the failed control.',
  },
  {
    title: 'Long descriptions',
    body: 'Dense explanatory copy should remain readable without pushing primary actions out of reach.',
  },
  {
    title: 'Scrolling feedback',
    body: 'Visible scrollbars and edge states show that additional content is available.',
  },
  {
    title: 'Footer behavior',
    body: 'Footer actions should stay stable while the user reviews long terms, warnings, or settings.',
  },
  {
    title: 'Review checklist',
    body: 'Use repeated sections to test keyboard, wheel, touch, and scrollbar drag interactions.',
  },
  {
    title: 'Final confirmation',
    body: 'The final section should be reachable without layout jumps or hidden content at the bottom edge.',
  },
];

const snapPoints = [0.3, 1];

export default function ScrollableDrawerDemo() {
  return (
    <Drawer snapPoints={snapPoints} defaultSnapPoint={snapPoints[0]}>
      <DrawerTrigger asChild={(props) => <Button {...props()}>Open scrollable drawer</Button>} />
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent>
          <DrawerGrabber>
            <DrawerGrabberIndicator />
          </DrawerGrabber>
          <DrawerHeader>
            <DrawerTitle>Scrollable drawer</DrawerTitle>
            <DrawerCloseIcon />
          </DrawerHeader>
          <DrawerBody class={styles.body}>
            <ScrollArea class={styles.scrollArea}>
              <ScrollAreaViewport class={styles.viewport}>
                <ScrollAreaContent class={styles.content}>
                  <For each={scrollSections}>
                    {(section) => (
                      <Card size="sm" class={styles.card}>
                        <CardBody>
                          <strong>{section.title}</strong>
                          <p>{section.body}</p>
                        </CardBody>
                      </Card>
                    )}
                  </For>
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar>
                <ScrollAreaThumb />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner />
            </ScrollArea>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  );
}