<script lang="ts">
  import {
    Menu,
    MenuCheckboxItem,
    MenuContent,
    MenuItemIndicator,
    MenuItemText,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';

  let checked = $state(false);
</script>

<div>
  <Menu defaultOpen portalled={false}>
    <MenuTrigger>Actions</MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport>
          <MenuCheckboxItem bind:checked value="toolbar" closeOnSelect={false}>
            <MenuItemIndicator />
            <MenuItemText>Show toolbar</MenuItemText>
          </MenuCheckboxItem>
        </MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
  <output>{checked ? 'Checked' : 'Unchecked'}</output>
  <button type="button" onclick={() => (checked = !checked)}>Toggle outside</button>
</div>