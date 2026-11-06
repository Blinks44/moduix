<script lang="ts">
  import {
    Drawer,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
    type DrawerOpenChangeDetails,
  } from '@/components/drawer';

  let { details }: { details: DrawerOpenChangeDetails[] } = $props();
</script>

<Drawer defaultOpen onOpenChange={(detail) => details.push(detail)}>
  <DrawerPositioner>
    <DrawerContent>
      <DrawerTitle>Preferences</DrawerTitle>
      <div data-testid="drawer-body">Body</div>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>