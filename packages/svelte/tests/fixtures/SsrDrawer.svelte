<script lang="ts">
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerGrabber,
    DrawerGrabberIndicator,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/drawer';
</script>

<Drawer defaultOpen portalled={false}>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
      <DrawerHeader>
        <DrawerTitle>Preferences</DrawerTitle>
        <DrawerDescription>Description</DrawerDescription>
        <DrawerCloseIcon />
      </DrawerHeader>
      <DrawerBody>Body</DrawerBody>
      <DrawerFooter>Footer</DrawerFooter>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>