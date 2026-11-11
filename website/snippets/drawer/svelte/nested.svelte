<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Card, CardBody } from '@moduix/svelte/card';
  import {
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
    DrawerRootProvider,
    DrawerTitle,
    useDrawer,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-nested.module.css';

  const id = $props.id();

  const items = ['Passkeys enabled', 'Two-factor authentication on', '3 signed-in devices'];
  const snapPoints = [0.42, 1];
  const accountDrawer = useDrawer({
    id: `${id}-account`,
    snapPoints,
    defaultSnapPoint: snapPoints[0],
  });
  const securityDrawer = useDrawer({
    id: `${id}-security`,
    snapPoints,
    defaultSnapPoint: snapPoints[0],
  });
</script>

<div>
  <Button onclick={() => accountDrawer().setOpen(true)}>Open account drawer</Button>
  <DrawerRootProvider value={accountDrawer}>
    <DrawerBackdrop />
    <DrawerPositioner>
      <DrawerContent>
        <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerCloseIcon />
          <DrawerDescription>Review account preferences.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody class={styles.body}>
          <Card size="sm" class={styles.card}>
            <CardBody>
              <Button variant="outline" onclick={() => securityDrawer().setOpen(true)}>
                Security settings
              </Button>
            </CardBody>
          </Card>
        </DrawerBody>
      </DrawerContent>
    </DrawerPositioner>
  </DrawerRootProvider>
  <DrawerRootProvider value={securityDrawer}>
    <DrawerPositioner>
      <DrawerContent>
        <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
        <DrawerHeader>
          <DrawerTitle>Security</DrawerTitle>
          <DrawerCloseIcon />
          <DrawerDescription>Nested drawers keep their own focus state.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody class={styles.body}>
          <Card size="sm" class={styles.card}>
            <CardBody>
              <ul>
                {#each items as item (item)}
                  <li>{item}</li>
                {/each}
              </ul>
            </CardBody>
          </Card>
        </DrawerBody>
        <DrawerFooter>
          <DrawerCloseTrigger>
            {#snippet asChild(props)}<Button {...props()} variant="outline">Done</Button>{/snippet}
          </DrawerCloseTrigger>
        </DrawerFooter>
      </DrawerContent>
    </DrawerPositioner>
  </DrawerRootProvider>
</div>