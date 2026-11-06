<script lang="ts">
  import {
    Drawer,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
    type DrawerOpenChangeDetails,
  } from '@/components/drawer';

  let { details }: { details: DrawerOpenChangeDetails[] } = $props();
  let open = $state(false);
</script>

<output>Bound open: {open}</output>
<Drawer bind:open portalled={false} onOpenChange={(detail) => details.push(detail)}>
  <DrawerTrigger>Open drawer</DrawerTrigger>
  <DrawerPositioner>
    <DrawerContent>
      <DrawerTitle>Preferences</DrawerTitle>
      <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>
<button type="button" onclick={() => (open = false)}>Close outside</button>