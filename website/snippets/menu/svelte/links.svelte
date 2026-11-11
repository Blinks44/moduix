<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
</script>

<Menu>
  <MenuTrigger>
    {#snippet asChild(props)}
      <Button {...props()}>Help <MenuIndicator /></Button>
    {/snippet}
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItem value="docs">
          {#snippet asChild(props)}<a {...props()} href="#menu-docs">Documentation</a>{/snippet}
        </MenuItem>
        <MenuItem value="github">
          {#snippet asChild(props)}
            <a {...props()} href="https://github.com/Blinks44/moduix">GitHub</a>
          {/snippet}
        </MenuItem>
        <MenuItem value="changelog">
          {#snippet asChild(props)}<a {...props()} href="#menu-changelog">Changelog</a>{/snippet}
        </MenuItem>
        <MenuItem value="support">
          {#snippet asChild(props)}<a {...props()} href="#menu-support">Support</a>{/snippet}
        </MenuItem>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>