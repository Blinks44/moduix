<script lang="ts">
  import {
    PopoverArrow,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
  } from '@/components/popover';

  let {
    arrow = false,
    description,
    title,
  }: { arrow?: boolean; description: string; title: string } = $props();
</script>

<PopoverPositioner>
  <PopoverContent>
    {#if arrow}<PopoverArrow />{/if}
    <PopoverHeader>
      <PopoverTitle>{title}</PopoverTitle>
      <PopoverDescription>{description}</PopoverDescription>
    </PopoverHeader>
    <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
  </PopoverContent>
</PopoverPositioner>