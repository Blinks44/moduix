<script lang="ts">
  import { ChevronDown as ChevronDownIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';

  const fileItems = [
    { value: 'new-file', label: 'New File' },
    { value: 'open', label: 'Open...' },
    { value: 'save', label: 'Save' },
    { value: 'save-as', label: 'Save As...' },
  ];
</script>

<Menu>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>
        File
        <MenuIndicator><ChevronDownIcon strokeWidth={3} /></MenuIndicator>
      </Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        {#each fileItems as item (item.value)}
          <MenuItem value={item.value}>
            {item.label}
          </MenuItem>
        {/each}
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>