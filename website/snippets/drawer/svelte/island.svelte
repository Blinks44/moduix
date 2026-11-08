<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody } from '@moduix/svelte/card';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseIcon,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-island.module.css';
</script>

<Drawer swipeDirection="end">
  <DrawerTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open island drawer</Button>{/snippet}
  </DrawerTrigger>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent variant="island">
      <DrawerHeader>
        <DrawerTitle>Quick actions</DrawerTitle>
        <DrawerCloseIcon />
        <DrawerDescription>This drawer floats inside the viewport edge.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody class={styles.body}>
        <Card size="sm" class={styles.card}>
          <CardBody>Choose an action without leaving your current context.</CardBody>
        </Card>
      </DrawerBody>
      <DrawerFooter>
        <DrawerCloseTrigger>
          {#snippet asChild(props)}<Button {...props()} variant="outline">Done</Button>{/snippet}
        </DrawerCloseTrigger>
      </DrawerFooter>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>