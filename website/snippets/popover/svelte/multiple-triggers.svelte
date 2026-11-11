<script lang="ts">
  import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverPositioner,
    PopoverTitle,
    PopoverTrigger,
  } from '@moduix/svelte/popover';
  import { Stack } from '@moduix/svelte/stack';

  const actions = [
    { id: 'share', label: 'Share', detail: 'Share this item by link or email.' },
    { id: 'export', label: 'Export', detail: 'Export this item as PDF, CSV, or JSON.' },
    { id: 'archive', label: 'Archive', detail: 'Move this item to the archive.' },
  ];
  let activeItem = $state<(typeof actions)[number] | null>(null);
  const handleTriggerValueChange = (details: { value?: string | null }) => {
    activeItem = actions.find((item) => item.id === details.value) ?? null;
  };
</script>

<Popover onTriggerValueChange={handleTriggerValueChange}>
  <Stack direction="row" justify="center" wrap="wrap" gap="2">
    {#each actions as item (item.id)}
      <PopoverTrigger value={item.id}>{item.label}</PopoverTrigger>
    {/each}
  </Stack>
  <PopoverPositioner>
    <PopoverContent>
      <PopoverTitle>{activeItem?.label ?? 'Select an action'}</PopoverTitle>
      <PopoverDescription>{activeItem?.detail ?? 'Choose one of the actions.'}</PopoverDescription>
    </PopoverContent>
  </PopoverPositioner>
</Popover>