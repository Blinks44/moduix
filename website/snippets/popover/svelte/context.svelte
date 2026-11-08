<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Popover,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverContext,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
</script>

<Popover positioning={{ gutter: 8 }}>
  <PopoverContext>
    {#snippet render(popover)}
      <output>Open: {popover().open ? 'yes' : 'no'}</output>
    {/snippet}
  </PopoverContext>
  <PopoverTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open context example</Button>{/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Context state</PopoverTitle>
        <PopoverDescription>
          Read state from a descendant without passing props through the popup tree.
        </PopoverDescription>
      </PopoverHeader>
      <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>