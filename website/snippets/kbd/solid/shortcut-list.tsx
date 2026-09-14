import { Kbd } from '@moduix/solid/kbd';
import { For } from 'solid-js';
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

export default function KbdShortcutListDemo() {
  return (
    <div class={styles.root}>
      <For each={shortcuts}>
        {(shortcut) => (
          <div class={styles.row}>
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
            {shortcut.description}
          </div>
        )}
      </For>
    </div>
  );
}