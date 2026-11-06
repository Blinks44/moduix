<script lang="ts">
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/drawer';
</script>

<Drawer defaultOpen portalled={false}>
  <DrawerTrigger class="bg-primary px-2">Open drawer</DrawerTrigger>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent class="w-96 bg-card p-4">
      <DrawerHeader>
        <DrawerTitle>Preferences</DrawerTitle>
        <DrawerCloseIcon class="size-8 rounded-full bg-primary" />
        <DrawerDescription>Description</DrawerDescription>
      </DrawerHeader>
      <DrawerBody>Body</DrawerBody>
      <DrawerFooter>Footer</DrawerFooter>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>