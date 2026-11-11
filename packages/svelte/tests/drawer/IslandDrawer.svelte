<script lang="ts">
  import {
    Drawer,
    DrawerCloseIcon,
    DrawerContent,
    DrawerContext,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/drawer';
</script>

<Drawer>
  <DrawerTrigger>
    {#snippet asChild(props)}<button {...props()} type="button">Open drawer</button>{/snippet}
  </DrawerTrigger>
  <DrawerPositioner>
    <DrawerContent variant="island">
      <DrawerTitle>Preferences</DrawerTitle>
      <DrawerCloseIcon />
    </DrawerContent>
  </DrawerPositioner>
  <DrawerContext>
    {#snippet render(drawer)}
      <output data-testid="drawer-state">
        {drawer().swipeDirection}:{drawer().snapPoints.join(',')}:{String(drawer().snapPoint)}
      </output>
    {/snippet}
  </DrawerContext>
</Drawer>