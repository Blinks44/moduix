<script lang="ts">
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuTriggerItem,
    MenuViewport,
  } from '@/components/menu';
</script>

<Menu defaultOpen portalled={false}>
  <MenuTrigger>
    {#snippet asChild(props)}<button {...props()} type="button">Song</button>{/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItem value="add-library">Add to Library</MenuItem>
        <Menu portalled={false}>
          <MenuTriggerItem>Add to Playlist</MenuTriggerItem>
          <MenuPositioner>
            <MenuContent>
              <MenuViewport><MenuItem value="get-up">Get Up!</MenuItem></MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>