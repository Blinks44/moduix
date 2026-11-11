<script lang="ts">
  import {
    Popover,
    PopoverContent,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@/components/popover';
</script>

<Popover portalled={false}>
  <PopoverTrigger>Open preferences</PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent><PopoverTitle>Preferences</PopoverTitle></PopoverContent>
  </PopoverPositioner>
</Popover>