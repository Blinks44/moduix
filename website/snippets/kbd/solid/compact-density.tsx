import { Kbd } from '@moduix/solid/kbd';
import { For } from 'solid-js';
import styles from '@/components/examples/kbd/kbd-compact-density.module.css';

const keys = ['Esc', 'Ctrl', '/'];

export default function KbdDenseDemo() {
  return (
    <div class={styles.root}>
      <For each={keys}>{(key) => <Kbd class={styles.dense}>{key}</Kbd>}</For>
    </div>
  );
}