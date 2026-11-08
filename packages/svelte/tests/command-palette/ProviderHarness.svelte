<script lang="ts">
  import {
    CommandPalettePanel,
    CommandPaletteRootProvider,
    CommandPaletteTitle,
  } from '@/components/command-palette';
  import { useDialog } from '@/components/dialog';

  let {
    exitComplete,
    shortcut = false,
    defaultOpen = false,
    closeButton = false,
  }: {
    closeButton?: boolean;
    defaultOpen?: boolean;
    exitComplete?: () => void;
    shortcut?: false | string;
  } = $props();

  // svelte-ignore state_referenced_locally
  const dialog = useDialog({ id: 'palette-provider', defaultOpen });
</script>

<div>
  <button type="button" onclick={() => dialog().setOpen(true)}>Open through provider</button>
  <button type="button">Shortcut target</button>
  <CommandPaletteRootProvider
    value={dialog}
    portalled={false}
    {shortcut}
    onExitComplete={() => exitComplete?.()}
  >
    <CommandPalettePanel>
      <CommandPaletteTitle>Provider palette</CommandPaletteTitle>
      {#if closeButton}
        <button type="button" onclick={() => dialog().setOpen(false)}>Close provider</button>
      {/if}
    </CommandPalettePanel>
  </CommandPaletteRootProvider>
</div>