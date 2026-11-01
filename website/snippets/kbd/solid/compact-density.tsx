import { Kbd } from '@moduix/solid/kbd';
import { Stack } from '@moduix/solid/stack';
import { For } from 'solid-js';
import styles from '@/components/examples/kbd/kbd-compact-density.module.css';

const keys = ['Esc', 'Ctrl', '/'];

export default function KbdDenseDemo() {
  return (
    <Stack direction="row" align="center" wrap="wrap" gap="2">
      <For each={keys}>{(key) => <Kbd class={styles.dense}>{key}</Kbd>}</For>
    </Stack>
  );
}