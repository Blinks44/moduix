<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    MenuContext,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuPositioner,
    MenuRootProvider,
    MenuTrigger,
    MenuViewport,
    useMenu,
  } from '@moduix/svelte/menu';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();

  const menu = useMenu({ id, defaultOpen: true });
  function highlightCopy() {
    menu().api.setHighlightedValue('copy');
  }
</script>

<div>
  <Stack direction="row" justify="center">
    <MenuRootProvider value={menu}>
      <MenuTrigger>
        {#snippet asChild(props)}
          <Button {...props()}>Edit <MenuIndicator /></Button>
        {/snippet}
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="cut">Cut</MenuItem>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="paste">Paste</MenuItem>
            <MenuItem value="delete" tone="destructive">Delete</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
      <MenuContext>
        {#snippet render(context)}
          <output>{context().open ? 'Open' : 'Closed'}</output>
        {/snippet}
      </MenuContext>
    </MenuRootProvider>
  </Stack>
  <div data-preview-meta>
    <Button size="sm" onclick={highlightCopy}>Highlight Copy</Button>
  </div>
</div>