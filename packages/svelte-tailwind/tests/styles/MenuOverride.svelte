<script lang="ts">
  import {
    Menu,
    MenuArrow,
    MenuContent,
    MenuItem,
    MenuItemIndicator,
    MenuItemText,
    MenuPositioner,
    MenuRadioItem,
    MenuRadioItemGroup,
    MenuSeparator,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';
</script>

<Menu defaultOpen portalled={false}>
  <MenuTrigger class="bg-primary">Actions</MenuTrigger>
  <MenuPositioner>
    <MenuContent class="py-0">
      <MenuArrow class="[--arrow-size:1rem]" />
      <MenuViewport>
        <MenuItem value="edit" tone="destructive" class="px-0 text-primary">Edit</MenuItem>
        <MenuRadioItemGroup value="radio">
          <MenuRadioItem value="radio" indicator="end" class="grid-cols-1">
            <MenuItemIndicator />
            <MenuItemText>Radio</MenuItemText>
          </MenuRadioItem>
        </MenuRadioItemGroup>
        <MenuSeparator class="h-0.5" />
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>