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
  <Menu defaultOpen portalled={false} onInteractOutside={(event) => event.preventDefault()}>
    <MenuTrigger>Actions</MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport>
          <MenuRadioItemGroup bind:value={selected}>
            <MenuRadioItem value="first" closeOnSelect={false}
              ><MenuItemText>First</MenuItemText></MenuRadioItem
            >
            <MenuRadioItem value="second" closeOnSelect={false}
              ><MenuItemText>Second</MenuItemText></MenuRadioItem
            >
          </MenuRadioItemGroup>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
  <output>{selected}</output>
  <button type="button" onclick={() => (selected = 'first')}>Reset outside</button>
</div>