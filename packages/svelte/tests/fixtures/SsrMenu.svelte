<script lang="ts">
  import {
    Menu,
    MenuCheckboxItem,
    MenuContent,
    MenuItem,
    MenuItemIndicator,
    MenuItemText,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';
</script>

<Menu defaultOpen portalled={false}>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItem value="edit">Edit</MenuItem>
        <MenuCheckboxItem checked={false} value="toolbar">
          <MenuItemIndicator />
          <MenuItemText>Show toolbar</MenuItemText>
        </MenuCheckboxItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>