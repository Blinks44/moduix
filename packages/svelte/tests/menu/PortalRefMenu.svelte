<script lang="ts">
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';

  let portalTarget: HTMLElement | undefined = $state();
</script>

<div>
  <div bind:this={portalTarget} data-testid="portal"></div>
  <Menu defaultOpen portalRef={() => portalTarget}>
    <MenuTrigger>Actions</MenuTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
</div>