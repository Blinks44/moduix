<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody } from '@moduix/svelte/card';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerContent,
    DrawerGrabber,
    DrawerGrabberIndicator,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@moduix/svelte/scroll-area';
  import styles from '@/components/examples/drawer/drawer-scrollable.module.css';

  const sections = [
    'Keyboard and focus',
    'Viewport overflow',
    'Close affordances',
    'Mobile ergonomics',
    'Persistent panels',
    'Status updates',
    'Error handling',
    'Long descriptions',
  ];
  const snapPoints = [0.3, 1];
</script>

<Drawer {snapPoints} defaultSnapPoint={snapPoints[0]}>
  <DrawerTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open scrollable drawer</Button>{/snippet}
  </DrawerTrigger>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
      <DrawerHeader><DrawerTitle>Scrollable drawer</DrawerTitle><DrawerCloseIcon /></DrawerHeader>
      <DrawerBody class={styles.body}>
        <ScrollArea class={styles.scrollArea}>
          <ScrollAreaViewport class={styles.viewport}>
            <ScrollAreaContent class={styles.content}>
              {#each sections as section (section)}
                <Card size="sm" class={styles.card}>
                  <CardBody>
                    <strong>{section}</strong>
                    <p>Keep long content readable in a dedicated viewport.</p>
                  </CardBody>
                </Card>
              {/each}
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
          <ScrollAreaCorner />
        </ScrollArea>
      </DrawerBody>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>