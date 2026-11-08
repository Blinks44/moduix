<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Popover,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
</script>

<Popover lazyMount unmountOnExit positioning={{ gutter: 8 }}>
  <PopoverTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open lazy popover</Button>{/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Lazy mounted</PopoverTitle>
        <PopoverDescription>This content mounts on open and unmounts after exit.</PopoverDescription
        >
      </PopoverHeader>
      <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>