<script lang="ts">
  import {
    PopoverArrow,
    PopoverBody,
    PopoverCloseIcon,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
  } from '@/components/popover';
</script>

<PopoverPositioner>
  <PopoverContent data-testid="content">
    <PopoverArrow />
    <PopoverHeader>
      <PopoverTitle>Notifications</PopoverTitle>
      <PopoverDescription>Latest updates</PopoverDescription>
      <PopoverCloseIcon />
    </PopoverHeader>
    <PopoverBody>Updates are ready.</PopoverBody>
    <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
  </PopoverContent>
</PopoverPositioner>