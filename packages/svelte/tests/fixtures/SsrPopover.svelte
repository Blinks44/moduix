<script lang="ts">
  import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseIcon,
    PopoverContent,
    PopoverDescription,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@/components/popover';
</script>

<Popover defaultOpen portalled={false}>
  <PopoverTrigger>Open popover</PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverArrow />
      <PopoverTitle>Notifications</PopoverTitle>
      <PopoverDescription>Latest updates</PopoverDescription>
      <PopoverBody>Updates are ready.</PopoverBody>
      <PopoverCloseIcon />
    </PopoverContent>
  </PopoverPositioner>
</Popover>