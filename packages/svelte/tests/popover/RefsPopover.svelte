<script lang="ts">
  import {
    Popover,
    PopoverAnchor,
    PopoverArrow,
    PopoverArrowTip,
    PopoverBody,
    PopoverCloseIcon,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverIndicator,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@/components/popover';

  const refs: Record<string, Element | null> = $state({
    anchor: null,
    arrow: null,
    arrowTip: null,
    body: null,
    closeIcon: null,
    closeTrigger: null,
    content: null,
    description: null,
    footer: null,
    header: null,
    indicator: null,
    positioner: null,
    title: null,
    trigger: null,
  });

  export const getRefs = () => refs;
</script>

<Popover defaultOpen portalled={false}>
  <PopoverAnchor bind:ref={refs.anchor}>Reference</PopoverAnchor>
  <PopoverTrigger bind:ref={refs.trigger}>Open</PopoverTrigger>
  <PopoverTrigger>
    {#snippet asChild(props)}<a {...props()} href="/profile">Composed trigger</a>{/snippet}
  </PopoverTrigger>
  <PopoverIndicator bind:ref={refs.indicator}>!</PopoverIndicator>
  <PopoverPositioner bind:ref={refs.positioner}>
    <PopoverContent bind:ref={refs.content}>
      <PopoverArrow bind:ref={refs.arrow}><PopoverArrowTip bind:ref={refs.arrowTip} /></PopoverArrow
      >
      <PopoverHeader bind:ref={refs.header}>
        <PopoverTitle bind:ref={refs.title}>Title</PopoverTitle>
        <PopoverDescription bind:ref={refs.description}>Description</PopoverDescription>
        <PopoverCloseIcon bind:ref={refs.closeIcon} />
      </PopoverHeader>
      <PopoverBody bind:ref={refs.body}>Body</PopoverBody>
      <PopoverFooter bind:ref={refs.footer}>
        <PopoverCloseTrigger bind:ref={refs.closeTrigger}>Close</PopoverCloseTrigger>
      </PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>