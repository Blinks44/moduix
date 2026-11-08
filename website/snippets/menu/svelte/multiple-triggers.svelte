<script lang="ts">
  import { Map } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
  import { Stack } from '@moduix/svelte/stack';

  const messages = [
    { id: '1', sender: 'Alice Johnson', preview: 'Hey, can you review the latest PR?' },
    { id: '2', sender: 'Bob Smith', preview: 'Meeting notes from today are attached.' },
    { id: '3', sender: 'Carol Davis', preview: 'The deploy finished successfully!' },
  ];
</script>

<Menu>
  <Stack direction="row" gap="0.5rem">
    {#each messages as message (message.id)}
      <MenuTrigger value={message.id}>
        {#snippet asChild(props)}
          <Button
            {...props()}
            variant="outline"
            size="icon-md"
            aria-label={`Open actions for ${message.sender}`}
          >
            <Map />
          </Button>
        {/snippet}
      </MenuTrigger>
    {/each}
  </Stack>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItem value="reply">Reply</MenuItem>
        <MenuItem value="forward">Forward</MenuItem>
        <MenuItem value="archive">Archive</MenuItem>
        <MenuItem value="delete" tone="destructive">Delete</MenuItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>