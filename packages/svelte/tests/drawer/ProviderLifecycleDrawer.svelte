<script lang="ts">
  import {
    DrawerCloseTrigger,
    DrawerContent,
    DrawerContext,
    DrawerPositioner,
    DrawerRootProvider,
    DrawerTitle,
    useDrawer,
  } from '@/components/drawer';

  let { enterComplete, exitComplete }: { enterComplete: () => void; exitComplete: () => void } =
    $props();
  const drawer = useDrawer({ id: 'lifecycle-drawer' });
</script>

<button type="button" onclick={() => drawer().setOpen(true)}>Open via API</button>
<DrawerRootProvider value={drawer} onEnterComplete={enterComplete} onExitComplete={exitComplete}>
  <DrawerPositioner>
    <DrawerContent>
      <DrawerTitle>Provider lifecycle</DrawerTitle>
      <DrawerContext>
        {#snippet render(context)}<output>Open: {String(context().open)}</output>{/snippet}
      </DrawerContext>
      <DrawerCloseTrigger>Close drawer</DrawerCloseTrigger>
    </DrawerContent>
  </DrawerPositioner>
</DrawerRootProvider>