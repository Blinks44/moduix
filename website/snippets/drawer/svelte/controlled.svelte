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
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-controlled.module.css';

  let open = $state(false);
  const snapPoints = [0.18, 1];
</script>

<Button type="button" onclick={() => (open = !open)}>{open ? 'Close' : 'Open'} drawer</Button>
<Drawer bind:open {snapPoints} defaultSnapPoint={snapPoints[0]}>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Controlled drawer</DrawerTitle>
        <DrawerCloseIcon />
        <DrawerDescription>Open: {String(open)}</DrawerDescription>
      </DrawerHeader>
      <DrawerBody class={styles.body}>
        <Card size="sm" class={styles.card}>
          <CardBody>The trigger and close controls both update the same state.</CardBody>
        </Card>
      </DrawerBody>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>