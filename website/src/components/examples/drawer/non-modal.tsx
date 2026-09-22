import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
import {
  Drawer,
  DrawerBody,
  DrawerCloseIcon,
  DrawerContent,
  DrawerDescription,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/react/drawer';
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from '@moduix/react/scroll-area';
import styles from '@/components/examples/drawer/drawer-non-modal.module.css';

const modal = false;
const snapPoints = [0.18, 1];
const paragraphs = [
  'A non-modal drawer can keep quick controls visible without preventing work in the surrounding page.',
  'The grabber owns drawer movement. The content below remains a normal reading and scrolling region.',
  'This paragraph is intentionally long enough to make the scroll viewport useful on compact screens and short browser windows.',
  'Scrollable content can include release notes, filters, activity history, or supporting explanation without moving the header.',
  'The page outside the drawer remains available for pointer interaction and can continue to scroll independently.',
  'Use a dedicated viewport when the panel contains more content than fits beside its persistent controls.',
  'The scrollbar confirms that the long content belongs to the drawer rather than the page behind it.',
  'The final paragraph verifies that the viewport reaches the bottom without dragging the sheet itself.',
  'A compact maximum height makes the panel useful for a persistent utility surface rather than a full-page sheet.',
  'ScrollArea keeps wheel, keyboard, and touch scrolling within this content viewport until it reaches an edge.',
  'Users can still operate controls in the surrounding page because the non-modal positioner does not intercept them.',
  'This additional copy makes overflow visible in both a wide documentation preview and a narrow mobile viewport.',
];
export default function NonModalDrawerDemo() {
  return (
    <Drawer
      modal={modal}
      preventScroll={false}
      snapPoints={snapPoints}
      defaultSnapPoint={snapPoints[0]}
    >
      <DrawerTrigger asChild>
        <Button>Open non-modal drawer</Button>
      </DrawerTrigger>
      <DrawerPositioner>
        <DrawerContent draggable={false}>
          <DrawerGrabber className={styles.grabber}>
            <DrawerGrabberIndicator className={styles.grabberIndicator} />
            <DrawerHeader className={styles.header}>
              <DrawerTitle>Non-modal drawer</DrawerTitle>
              <DrawerCloseIcon data-no-drag />
              <DrawerDescription>
                The page remains interactive while this drawer is open.
              </DrawerDescription>
            </DrawerHeader>
          </DrawerGrabber>
          <DrawerBody className={styles.body}>
            <ScrollArea className={styles.scrollArea}>
              <ScrollAreaViewport className={styles.viewport}>
                <ScrollAreaContent className={styles.content}>
                  {paragraphs.map((paragraph) => (
                    <Card key={paragraph} size="sm" className={styles.card}>
                      <CardBody>
                        <p className={styles.paragraph}>{paragraph}</p>
                      </CardBody>
                    </Card>
                  ))}
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