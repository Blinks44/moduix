<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuItemGroup,
    MenuItemGroupLabel,
    MenuPositioner,
    MenuSeparator,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
</script>

<Menu>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Edit <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItemGroup>
          <MenuItemGroupLabel>Clipboard</MenuItemGroupLabel>
          <MenuItem value="cut">Cut</MenuItem>
          <MenuItem value="copy">Copy</MenuItem>
          <MenuItem value="paste">Paste</MenuItem>
        </MenuItemGroup>
        <MenuSeparator />
        <MenuItemGroup>
          <MenuItemGroupLabel>Selection</MenuItemGroupLabel>
          <MenuItem value="select-all">Select All</MenuItem>
        </MenuItemGroup>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>