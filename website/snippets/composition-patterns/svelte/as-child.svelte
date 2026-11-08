<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Popover,
    PopoverContent,
    PopoverPositioner,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
</script>

<Popover positioning={{ gutter: 8 }}>
  <PopoverTrigger>
    {#snippet asChild(props)}
      <Button {...props()} variant="outline">Filters</Button>
    {/snippet}
  </PopoverTrigger>
  <PopoverPositioner>
    <PopoverContent>Choose one or more filters.</PopoverContent>
  </PopoverPositioner>
</Popover>