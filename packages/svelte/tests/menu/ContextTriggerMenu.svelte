<script lang="ts">
  import {
    Menu,
    MenuArrow,
    MenuContent,
    MenuContextTrigger,
    MenuItem,
    MenuPositioner,
    MenuViewport,
  } from '@/components/menu';

  let { styled = false }: { styled?: boolean } = $props();
</script>

{#if styled}
  <Menu defaultOpen>
    <MenuContextTrigger>
      {#snippet asChild(props)}<button {...props()} type="button">Open context menu</button
        >{/snippet}
    </MenuContextTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuArrow />
        <MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
{:else}
  <Menu portalled={false}>
    <MenuContextTrigger>Open context menu</MenuContextTrigger>
    <MenuPositioner>
      <MenuContent>
        <MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport>
      </MenuContent>
    </MenuPositioner>
  </Menu>
{/if}