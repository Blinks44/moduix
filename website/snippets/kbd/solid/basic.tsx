import { Kbd } from '@moduix/solid/kbd';
import { For } from 'solid-js';
import styles from '@/components/examples/kbd/kbd-basic.module.css';

const shortcut = {
  label: 'Command K',
  keys: ['Cmd', 'K'],
};

export default function KbdDemo() {
  return (
    <div class={styles.root}>
      <Kbd.Group aria-label={shortcut.label}>
        <For each={shortcut.keys}>
          {(key, index) => (
            <>
              {index() > 0 && '+'}
              <Kbd>{key}</Kbd>
            </>
          )}
        </For>
      </Kbd.Group>
    </div>
  );
}