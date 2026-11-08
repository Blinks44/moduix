<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody } from '@moduix/svelte/card';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerContent,
    DrawerDescription,
    DrawerGrabber,
    DrawerGrabberIndicator,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-snap-points.module.css';

  const snapPoints = [0.25, 0.5, 1];
</script>

<Drawer {snapPoints} defaultSnapPoint={snapPoints[1]}>
  <DrawerTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open with snap points</Button>{/snippet}
  </DrawerTrigger>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
      <DrawerHeader>
        <DrawerTitle>Snap points</DrawerTitle>
        <DrawerCloseIcon />
        <DrawerDescription>Drag between the configured snap points.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody class={styles.body}>
        <Card size="sm" class={styles.card}><CardBody>25% · 50% · 100%</CardBody></Card>
      </DrawerBody>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>