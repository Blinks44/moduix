<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    DrawerBackdrop,
    DrawerCloseIcon,
    DrawerContent,
    DrawerDescription,
    DrawerGrabber,
    DrawerGrabberIndicator,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    type DrawerVariant,
  } from '@/components/drawer';

  let {
    children,
    description,
    draggable,
    title,
    variant,
  }: {
    children?: Snippet;
    description?: string;
    draggable?: boolean;
    title?: string;
    variant?: DrawerVariant;
  } = $props();
</script>

<DrawerBackdrop />
<DrawerPositioner>
  <DrawerContent {draggable} {variant}>
    <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
    <DrawerHeader>
      <DrawerTitle>{title}</DrawerTitle>
      <DrawerCloseIcon />
      {#if description}<DrawerDescription>{description}</DrawerDescription>{/if}
    </DrawerHeader>
    {@render children?.()}
  </DrawerContent>
</DrawerPositioner>