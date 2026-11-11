<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuArrow,
    MenuArrowTip,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
</script>

<Menu positioning={{ placement: 'bottom-start', gutter: 12 }}>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>File <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuArrow><MenuArrowTip /></MenuArrow>
      <MenuViewport>
        <MenuItem value="new-file">New File</MenuItem>
        <MenuItem value="open">Open...</MenuItem>
        <MenuItem value="save">Save</MenuItem>
        <MenuItem value="save-as">Save As...</MenuItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>