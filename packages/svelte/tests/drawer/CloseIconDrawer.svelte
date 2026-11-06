<script lang="ts">
  import {
    Drawer,
    DrawerCloseIcon,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
  } from '@/components/drawer';

  let {
    label,
    labelledby,
    custom = false,
  }: { label?: string; labelledby?: string; custom?: boolean } = $props();
</script>

<Drawer defaultOpen portalled={false}>
  <DrawerPositioner>
    <DrawerContent>
      <DrawerTitle>Preview</DrawerTitle>
      {#if custom}
        <DrawerCloseIcon
          aria-label={label}
          aria-labelledby={labelledby}
          class="consumer-close"
          style="color: red"
          title="Dismiss preview"
          data-testid="close"
        >
          <span>Custom close</span>
        </DrawerCloseIcon>
      {:else}
        <DrawerCloseIcon
          aria-label={label}
          aria-labelledby={labelledby}
          class="consumer-close"
          style="color: red"
          title="Dismiss preview"
          data-testid="close"
        />
      {/if}
    </DrawerContent>
  </DrawerPositioner>
</Drawer>