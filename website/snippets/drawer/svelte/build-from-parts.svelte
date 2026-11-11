<script lang="ts">
  import { X as XIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody } from '@moduix/svelte/card';
  import { CloseButton } from '@moduix/svelte/close-button';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerDescription,
    DrawerGrabber,
    DrawerGrabberIndicator,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-build-from-parts.module.css';

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
      <div class={styles.header}>
        <DrawerTitle>Notifications</DrawerTitle>
        <DrawerCloseTrigger>
          {#snippet asChild(props)}
            <CloseButton {...props()} aria-label="Close drawer" class={styles.closeButton}>
              <XIcon strokeWidth={3} />
            </CloseButton>
          {/snippet}
        </DrawerCloseTrigger>
        <DrawerDescription class={styles.description}>
          Three updates need your attention.
        </DrawerDescription>
      </div>
      <div class={styles.body}>
        <Card size="sm" class={styles.card}>
          <CardBody>
            <ul>
              {#each notifications as notification (notification)}
                <li>{notification}</li>
              {/each}
            </ul>
          </CardBody>
        </Card>
      </div>
      <div class={styles.footer}>
        <Button>View inbox</Button>
        <DrawerCloseTrigger>
          {#snippet asChild(props)}<Button {...props()} variant="outline">Close</Button>{/snippet}
        </DrawerCloseTrigger>
      </div>
    </DrawerContent>
  </DrawerPositioner>
</Drawer>