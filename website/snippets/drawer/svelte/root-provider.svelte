<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody } from '@moduix/svelte/card';
  import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerPositioner,
    DrawerRootProvider,
    DrawerTitle,
    useDrawer,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-root-provider.module.css';

  const id = $props.id();

  const snapPoints = [0.25, 0.5, 1];
  const drawer = useDrawer({ id, defaultSnapPoint: snapPoints[1], snapPoints });
</script>

<Button onclick={() => drawer().setOpen(true)}>Open via API</Button>
<DrawerRootProvider value={drawer}>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Root provider</DrawerTitle>
        <DrawerCloseIcon />
        <DrawerDescription>Control the drawer from outside its tree.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody class={styles.body}>
        <Card size="sm" class={styles.card}>
          <CardBody>State lives outside the drawer tree.</CardBody>
        </Card>
      </DrawerBody>
    </DrawerContent>
  </DrawerPositioner>
</DrawerRootProvider>
<output>Active snap point: {String(drawer().snapPoint)}</output>
<Button size="sm" variant="outline" onclick={() => drawer().setSnapPoint(1)}>Set 100%</Button>