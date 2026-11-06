<script lang="ts">
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';

  const refs: Record<string, Element | null> = $state({ trigger: null, content: null, item: null });

  export const getRefs = () => refs;
</script>

<Menu defaultOpen portalled={false}>
  <MenuTrigger bind:ref={refs.trigger}>Actions</MenuTrigger>
  <MenuPositioner>
    <MenuContent bind:ref={refs.content}>
      <MenuViewport><MenuItem bind:ref={refs.item} value="edit">Edit</MenuItem></MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>