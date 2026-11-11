<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverRootProvider,
    PopoverTitle,
    PopoverTrigger,
    usePopover,
  } from '@moduix/svelte/popover';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();

  const popover = usePopover({ id, positioning: { placement: 'bottom-start', gutter: 8 } });
</script>

<Stack align="center" gap="3">
  <PopoverRootProvider value={popover}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open from trigger</Button>{/snippet}
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>External state</PopoverTitle>
          <PopoverDescription>The usePopover hook owns this popover state.</PopoverDescription>
        </PopoverHeader>
        <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </PopoverRootProvider>
  <output>Open: {popover().open ? 'yes' : 'no'}</output>
  <Button size="sm" onclick={() => popover().setOpen(!popover().open)}>Toggle externally</Button>
</Stack>