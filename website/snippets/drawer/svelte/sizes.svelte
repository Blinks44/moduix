<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerContent,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
    type DrawerSize,
  } from '@moduix/svelte/drawer';
  import { Stack } from '@moduix/svelte/stack';

  const sizes: DrawerSize[] = ['sm', 'md', 'lg', 'xl'];
</script>

<Stack direction="row" wrap="wrap" gap="2">
  {#each sizes as size (size)}
    <Drawer swipeDirection="end">
      <DrawerTrigger>
        {#snippet asChild(props)}<Button {...props()} variant="outline">Open {size}</Button
          >{/snippet}
      </DrawerTrigger>
      <DrawerBackdrop />
      <DrawerPositioner>
        <DrawerContent {size}>
          <DrawerHeader>
            <DrawerTitle>Size {size}</DrawerTitle>
            <DrawerCloseIcon />
          </DrawerHeader>
          <DrawerBody>
            The size prop picks the width of a side drawer. On narrow screens the drawer leaves a
            gap at the opposite edge.
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  {/each}
</Stack>