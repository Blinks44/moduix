<script lang="ts">
  import {
    DrawerBackdrop,
    DrawerContent,
    DrawerContext,
    DrawerPositioner,
    DrawerRootProvider,
    DrawerTitle,
    useDrawer,
  } from '@/components/drawer';

  let portalTarget: HTMLElement | undefined = $state();
  let contentRef: Element | null = $state(null);
  const drawer = useDrawer({ id: 'portal-drawer', defaultOpen: true });

  export const getContentRef = () => contentRef;
</script>

<div bind:this={portalTarget} data-testid="portal"></div>
{#if portalTarget}
  <DrawerRootProvider value={drawer} portalRef={() => portalTarget}>
    <DrawerBackdrop />
    <DrawerPositioner>
      <DrawerContent bind:ref={contentRef}>
        <DrawerTitle>Preferences</DrawerTitle>
        <DrawerContext>
          {#snippet render(context)}<output>Open: {String(context().open)}</output>{/snippet}
        </DrawerContext>
      </DrawerContent>
    </DrawerPositioner>
  </DrawerRootProvider>
{/if}