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
    DrawerGrabber,
    DrawerGrabberIndicator,
    DrawerHeader,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-basic.module.css';

  const snapPoints = [0.45, 1];
  const notifications = [
    'Your weekly report is ready to review.',
    'Maya mentioned you in the project update.',
    'Two tasks are due tomorrow.',
  ];
</script>

<Drawer {snapPoints} defaultSnapPoint={snapPoints[0]}>
  <DrawerTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open drawer</Button>{/snippet}
  </DrawerTrigger>
  <DrawerBackdrop />
  <DrawerPositioner>
    <DrawerContent>
      <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
      <DrawerHeader>
        <DrawerTitle>Notifications</DrawerTitle>
        <DrawerCloseIcon />
        <DrawerDescription>Three updates need your attention.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody class={styles.body}>
        <Card size="sm" class={styles.card}>
          <CardBody>
            <ul>
              {#each notifications as notification (notification)}
                <li>{notification}</li>
              {/each}
            </ul>
          </CardBody>
        </Card>
      </DrawerBody>
      <DrawerFooter>
        <Button>View inbox</Button>
        <DrawerCloseTrigger>
          {#snippet asChild(props)}<Button {...props()} variant="outline">Close</Button>{/snippet}
        </DrawerCloseTrigger>
      </DrawerFooter>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>