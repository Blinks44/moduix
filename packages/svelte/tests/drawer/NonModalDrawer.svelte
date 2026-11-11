<script lang="ts">
  import {
    Drawer,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/drawer';
</script>

<div data-testid="host">
  <Drawer defaultOpen modal={false} portalled={false}>
    <DrawerTrigger>Toggle drawer</DrawerTrigger>
    <DrawerPositioner>
      <DrawerContent>
        <DrawerTitle>Preferences</DrawerTitle>
        <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
      </DrawerContent>
    </DrawerPositioner>
  </Drawer>
</div>