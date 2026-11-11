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

<Menu defaultOpen>
  <MenuTrigger>
    {#snippet asChild(props)}<button {...props()} type="button">Actions</button>{/snippet}
  </MenuTrigger>
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