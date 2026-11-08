<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItemGroup,
    MenuItemGroupLabel,
    MenuItemIndicator,
    MenuItemText,
    MenuPositioner,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';

  let sortBy = $state('date');
</script>

<Menu closeOnSelect={false}>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Sort <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItemGroup>
          <MenuItemGroupLabel>Sort By</MenuItemGroupLabel>
          <MenuRadioItemGroup bind:value={sortBy}>
            <MenuRadioItem value="name">
              <MenuItemIndicator /><MenuItemText>Name</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="date">
              <MenuItemIndicator /><MenuItemText>Date Modified</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="size">
              <MenuItemIndicator /><MenuItemText>File Size</MenuItemText>
            </MenuRadioItem>
            <MenuRadioItem value="type">
              <MenuItemIndicator /><MenuItemText>File Type</MenuItemText>
            </MenuRadioItem>
          </MenuRadioItemGroup>
        </MenuItemGroup>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>