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

<Popover closeOnEscape={false} closeOnInteractOutside={false}>
  <PopoverTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open persistent popover</Button>{/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Explicit close</PopoverTitle>
        <PopoverDescription>
          Escape and outside interactions do not dismiss this popover.
        </PopoverDescription>
      </PopoverHeader>
      <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>