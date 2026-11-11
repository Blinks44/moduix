<script lang="ts">
  import { Command as CommandIcon, CornerDownLeft as EnterIcon } from '@lucide/svelte';
  import { Kbd, KbdGroup } from '@moduix/svelte/kbd';

  const shortcut = {
    label: 'Command Enter',
    key: 'Enter',
  };
</script>

<KbdGroup aria-label={shortcut.label}>
  <Kbd><CommandIcon /></Kbd>+<Kbd><EnterIcon />{shortcut.key}</Kbd>
</KbdGroup>