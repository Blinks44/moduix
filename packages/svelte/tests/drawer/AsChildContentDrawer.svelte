<script lang="ts">
  import { Drawer, DrawerContent, DrawerPositioner, DrawerTitle } from '@/components/drawer';

  let contentRef: Element | null = $state(null);

  export const getContentRef = () => contentRef;
</script>

<Drawer defaultOpen portalled={false}>
  <DrawerPositioner>
    <DrawerContent bind:ref={contentRef}>
      {#snippet asChild(props)}
        <section {...props()}><DrawerTitle>Preferences</DrawerTitle></section>
      {/snippet}
    </DrawerContent>
  </DrawerPositioner>
</Drawer>