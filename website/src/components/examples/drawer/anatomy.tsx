import { Button } from '@moduix/react/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerPositioner,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
} from '@moduix/react/drawer';

// Anatomy scene: the drawer stays open and inline so every part can be outlined.
export default function DrawerAnatomy() {
  return (
    <div style={{ minHeight: 400, width: '100%' }}>
      <Drawer open modal={false} portalled={false}>
        <DrawerTrigger asChild>
          <Button variant="outline">Open drawer</Button>
        </DrawerTrigger>
        <DrawerSwipeArea />
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent>
            <DrawerGrabber>
              <DrawerGrabberIndicator />
            </DrawerGrabber>
            <DrawerHeader>
              <DrawerTitle>Notifications</DrawerTitle>
              <DrawerCloseIcon />
              <DrawerDescription>Three updates need your attention.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>Your weekly report is ready to review.</DrawerBody>
            <DrawerFooter>
              <Button>View inbox</Button>
              <DrawerCloseTrigger asChild>
                <Button variant="outline">Close</Button>
              </DrawerCloseTrigger>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    </div>
  );
}