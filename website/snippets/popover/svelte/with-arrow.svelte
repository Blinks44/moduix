<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Popover,
    PopoverArrow,
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

<Popover positioning={{ gutter: 8 }}>
  <PopoverTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open with arrow</Button>{/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>
        <PopoverTitle>With arrow</PopoverTitle>
        <PopoverDescription>Arrow and ArrowTip use Ark positioning variables.</PopoverDescription>
      </PopoverHeader>
      <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>