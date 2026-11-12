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

  let open = $state(false);
</script>

<div>
  <Menu bind:open>
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
  <div data-preview-meta>
    <output>Open: {open ? 'Yes' : 'No'}</output>
    <Button size="sm" onclick={() => (open = !open)}>Toggle</Button>
  </div>
</div>