<script lang="ts">
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
    type MenuRootProps,
  } from '@/components/menu';

  let { open = $bindable(false), ...props }: MenuRootProps = $props();
</script>

<div data-testid="host">
  <output>{open ? 'Open' : 'Closed'}</output>
  <Menu {...props} bind:open>
    <MenuTrigger>Actions</MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</div>