<script lang="ts">
  import { Kbd, KbdGroup } from '@moduix/svelte/kbd';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/kbd/kbd-shortcut-list.module.css';

  const shortcuts = [
    {
      label: 'Command K',
      keys: ['Cmd', 'K'],
      description: 'Open command menu',
    },
    {
      label: 'Shift question mark',
      keys: ['Shift', '?'],
      description: 'Show shortcuts',
    },
    {
      label: 'Escape',
      keys: ['Esc'],
      description: 'Close overlay',
    },
  ];
</script>

<Stack gap="3">
  {#each shortcuts as shortcut (shortcut.label)}
    <div class={styles.row}>
      <KbdGroup aria-label={shortcut.label}>
        {#each shortcut.keys as key, index (key)}
          {#if index > 0}+{/if}
          <Kbd>{key}</Kbd>
        {/each}
      </KbdGroup>
      {shortcut.description}
    </div>
  {/each}
</Stack>