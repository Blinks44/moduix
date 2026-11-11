<script lang="ts">
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
  import { Stack } from '@moduix/svelte/stack';

  let selected = $state('Nothing selected');
  function handleSelect(details: { value: string }) {
    selected = details.value;
  }
</script>

<div>
  <Stack direction="row" justify="center">
    <Menu onSelect={handleSelect}>
      <MenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()}>Actions <MenuIndicator /></Button>
        {/snippet}
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuItem value="archive">Archive</MenuItem>
            <MenuItem value="delete" tone="destructive">Delete</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  </Stack>
  <output>Selected: {selected}</output>
</div>