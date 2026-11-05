<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Kbd, KbdGroup } from '@/components/kbd';
  import styles from './Kbd.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Kbd',
    component: Kbd,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <KbdGroup aria-label="Command K">
    <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
  </KbdGroup>
</Story>

<Story name="Single Key" asChild>
  <Kbd>Esc</Kbd>
</Story>

<Story name="Root Part" asChild>
  <Kbd>Enter</Kbd>
</Story>

<Story name="As Child" asChild>
  <Kbd>{#snippet asChild(props)}<kbd {...props()} title="Escape">Esc</kbd>{/snippet}</Kbd>
</Story>

<Story name="Group As Child" asChild>
  <KbdGroup aria-label="Command K"
    >{#snippet asChild(props)}<span {...props()}>
        <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
      </span>{/snippet}</KbdGroup
  >
</Story>

<Story name="Shortcut List" asChild>
  <div class={styles.column}>
    <div class={styles.shortcutRow}>
      <KbdGroup aria-label="Command K">
        <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
      </KbdGroup>
      Open command menu
    </div>
    <div class={styles.shortcutRow}>
      <KbdGroup aria-label="Shift question mark">
        <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
      </KbdGroup>
      Show shortcuts
    </div>
    <div class={styles.shortcutRow}>
      <Kbd>Esc</Kbd>
      Close overlay
    </div>
  </div>
</Story>

<Story name="Dense" asChild>
  <div class={styles.row}>
    <Kbd class={styles.dense}>Esc</Kbd>
    <Kbd class={styles.dense}>Ctrl</Kbd>
    <Kbd class={styles.dense}>/</Kbd>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <KbdGroup aria-label="Command K" class={styles.customGroup}>
    <Kbd class={styles.customKbd}>Cmd</Kbd>+<Kbd class={styles.customKbd}>K</Kbd>
  </KbdGroup>
</Story>

<Story name="With Icon" asChild>
  <KbdGroup aria-label="Shift Enter">
    <Kbd>Shift</Kbd>+<Kbd>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M9 10 4 15l5 5"></path>
        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
      </svg>
      Enter
    </Kbd>
  </KbdGroup>
</Story>