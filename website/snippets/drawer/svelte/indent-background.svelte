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
    DrawerIndent,
    DrawerIndentBackground,
    DrawerPositioner,
    DrawerStack,
    DrawerTitle,
    DrawerTrigger,
  } from '@moduix/svelte/drawer';
  import styles from '@/components/examples/drawer/drawer-indent-background.module.css';

  const snapPoints = [0.18, 1];
</script>

<DrawerStack>
  <div class={styles.stage}>
    <DrawerIndentBackground />
    <Drawer modal={false} portalled={false} {snapPoints} defaultSnapPoint={snapPoints[0]}>
      <DrawerIndent class={styles.indent}>
        <DrawerTrigger>
          {#snippet asChild(props)}<Button {...props()}>Open indented drawer</Button>{/snippet}
        </DrawerTrigger>
      </DrawerIndent>
      <DrawerBackdrop class={styles.backdrop} />
      <DrawerPositioner class={styles.positioner}>
        <DrawerContent class={styles.content}>
          <DrawerGrabber><DrawerGrabberIndicator /></DrawerGrabber>
          <DrawerHeader><DrawerTitle>Indent effect</DrawerTitle><DrawerCloseIcon /></DrawerHeader>
          <DrawerBody class={styles.body}>
            <Card size="sm" class={styles.card}>
              <CardBody>The background and surface move together.</CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </DrawerPositioner>
    </Drawer>
  </div>
</DrawerStack>