<script lang="ts">
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
    DrawerIndent,
    DrawerIndentBackground,
    DrawerPositioner,
    DrawerStack,
    DrawerSwipeArea,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/drawer';

  const refs: Record<string, Element | null> = $state({
    trigger: null,
    backdrop: null,
    positioner: null,
    content: null,
    grabber: null,
    indicator: null,
    title: null,
    description: null,
    closeTrigger: null,
    closeIcon: null,
    swipeArea: null,
    indent: null,
    indentBackground: null,
    header: null,
    body: null,
    footer: null,
  });

  export const getRefs = () => refs;
</script>

<DrawerStack>
  <DrawerIndentBackground bind:ref={refs.indentBackground} />
  <Drawer defaultOpen portalled={false}>
    <DrawerTrigger bind:ref={refs.trigger}>Open</DrawerTrigger>
    <DrawerTrigger>
      {#snippet asChild(props)}<button {...props()} data-testid="composed">Composed</button
        >{/snippet}
    </DrawerTrigger>
    <DrawerIndent bind:ref={refs.indent}><span>Indent</span></DrawerIndent>
    <DrawerBackdrop bind:ref={refs.backdrop} />
    <DrawerPositioner bind:ref={refs.positioner}>
      <DrawerContent bind:ref={refs.content}>
        <DrawerGrabber bind:ref={refs.grabber}>
          <DrawerGrabberIndicator bind:ref={refs.indicator} />
        </DrawerGrabber>
        <DrawerHeader bind:ref={refs.header}>
          <DrawerTitle bind:ref={refs.title}>Title</DrawerTitle>
          <DrawerDescription bind:ref={refs.description}>Description</DrawerDescription>
          <DrawerCloseTrigger bind:ref={refs.closeTrigger}>Close</DrawerCloseTrigger>
          <DrawerCloseIcon bind:ref={refs.closeIcon} />
        </DrawerHeader>
        <DrawerBody bind:ref={refs.body}>Body</DrawerBody>
        <DrawerFooter bind:ref={refs.footer}>Footer</DrawerFooter>
      </DrawerContent>
    </DrawerPositioner>
    <DrawerSwipeArea bind:ref={refs.swipeArea} />
  </Drawer>
</DrawerStack>