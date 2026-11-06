<script lang="ts">
  import {
    Drawer,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
    type DrawerRootProps,
  } from '@/components/drawer';

  let props: DrawerRootProps = $props();
</script>

<Drawer {...props}>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerPositioner>
    <DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent>
  </DrawerPositioner>
</Drawer>