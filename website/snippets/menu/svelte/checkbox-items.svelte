<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuCheckboxItem,
    MenuContent,
    MenuIndicator,
    MenuItemIndicator,
    MenuItemText,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';

  let showToolbar = $state(true);
  let showSidebar = $state(false);
  let showStatusBar = $state(true);
  let showLineNumbers = $state(true);
</script>

<Menu closeOnSelect={false}>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>View <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuCheckboxItem bind:checked={showToolbar} value="toolbar">
          <MenuItemIndicator /><MenuItemText>Show Toolbar</MenuItemText>
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showSidebar} value="sidebar">
          <MenuItemIndicator /><MenuItemText>Show Sidebar</MenuItemText>
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showStatusBar} value="status-bar">
          <MenuItemIndicator /><MenuItemText>Show Status Bar</MenuItemText>
        </MenuCheckboxItem>
        <MenuCheckboxItem bind:checked={showLineNumbers} value="line-numbers">
          <MenuItemIndicator /><MenuItemText>Show Line Numbers</MenuItemText>
        </MenuCheckboxItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>