<script lang="ts">
  import {
    Popover,
    PopoverBody,
    PopoverCloseIcon,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@/components/popover';
</script>

<Popover defaultOpen portalled={false}>
  <PopoverTrigger class="bg-primary px-2">Open</PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent class="w-96 bg-card p-4" data-testid="content">
      <PopoverHeader>
        <PopoverTitle>Title</PopoverTitle>
        <PopoverDescription>Description</PopoverDescription>
        <PopoverCloseIcon class="size-8 rounded-full bg-primary" />
      </PopoverHeader>
      <PopoverBody>Body</PopoverBody>
      <PopoverFooter>Footer</PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>