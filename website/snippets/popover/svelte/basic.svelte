<script lang="ts">
  import { Bell as BellIcon } from '@lucide/svelte';
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

<Popover positioning={{ gutter: 8 }}>
  <PopoverTrigger>
    {#snippet asChild(props)}
      <Button {...props()}><BellIcon aria-hidden="true" size={16} /> Notifications</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverHeader>
        <PopoverTitle>Notifications</PopoverTitle>
        <PopoverDescription>You are all caught up. Good job!</PopoverDescription>
      </PopoverHeader>
      <PopoverFooter><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter>
    </PopoverContent>
  </PopoverPositioner>
</Popover>