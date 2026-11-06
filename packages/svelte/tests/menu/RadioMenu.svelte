<script lang="ts">
  import {
    Menu,
    MenuContent,
    MenuItemText,
    MenuPositioner,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';

  let selected = $state('first');
</script>

<div>
  <Menu defaultOpen portalled={false}>
    <MenuTrigger>Actions</MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport>
          <MenuRadioItemGroup bind:value={selected}>
            <MenuRadioItem value="first"><MenuItemText>First</MenuItemText></MenuRadioItem>
            <MenuRadioItem value="second"><MenuItemText>Second</MenuItemText></MenuRadioItem>
          </MenuRadioItemGroup>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
  <output>{selected}</output>
  <button type="button" onclick={() => (selected = 'first')}>Reset outside</button>
</div>