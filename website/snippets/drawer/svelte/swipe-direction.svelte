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
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/drawer/drawer-swipe-direction.module.css';
</script>

<Stack direction="row" wrap="wrap" gap="2">
  <Drawer swipeDirection="end">
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open right drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerBackdrop />
    <DrawerPositioner>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Details</DrawerTitle>
          <DrawerCloseIcon />
          <DrawerDescription>Logical end resolves to the right in LTR.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody class={styles.body}>
          <Card size="sm" class={styles.card}>
            <CardBody>The same logical direction resolves correctly in RTL.</CardBody>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </DrawerPositioner>
  </Drawer>
  <Drawer swipeDirection="up">
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open top drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerBackdrop />
    <DrawerPositioner>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Top drawer</DrawerTitle>
          <DrawerCloseIcon />
          <DrawerDescription>Swipe up to dismiss this drawer.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody class={styles.body}>
          <Card size="sm" class={styles.card}>
            <CardBody>Check this direction on a mobile viewport.</CardBody>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </DrawerPositioner>
  </Drawer>
</Stack>