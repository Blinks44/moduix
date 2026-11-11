<script lang="ts">
  import { Drawer, DrawerContent, DrawerPositioner, DrawerTitle } from '@/components/drawer';

  let portalTarget: HTMLElement | undefined = $state();
</script>

<div>
  <div bind:this={portalTarget} data-testid="drawer-portal"></div>
  <Drawer defaultOpen portalRef={() => portalTarget}>
    <DrawerPositioner>
      <DrawerContent><DrawerTitle>Preferences</DrawerTitle></DrawerContent>
    </DrawerPositioner>
  </Drawer>
</div>