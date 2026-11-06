<script lang="ts">
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';
</script>

<Menu defaultOpen>
  <MenuTrigger>Actions</MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      {#snippet asChild(props)}
        <section {...props()} aria-label="Actions">
          <MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport>
        </section>
      {/snippet}
    </MenuContent>
  </MenuPositioner>
</Menu>