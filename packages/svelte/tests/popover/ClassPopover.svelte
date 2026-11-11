<script lang="ts">
  import {
    Popover,
    PopoverBody,
    PopoverCloseIcon,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@/components/popover';
</script>

<Popover defaultOpen portalled={false}>
  <PopoverTrigger class="consumer-trigger">Open</PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent class="consumer-content">
      <PopoverHeader>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverCloseIcon class="consumer-close" />
      </PopoverHeader>
      <PopoverBody class="consumer-body">Body</PopoverBody>
      <PopoverFooter class="consumer-footer">Footer</PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>