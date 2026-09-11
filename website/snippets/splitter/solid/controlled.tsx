import { Splitter } from '@moduix/solid/splitter';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/splitter/splitter-controlled.module.css';

const panels = [
  {
    id: 'a',
    minSize: 20,
  },
  {
    id: 'b',
    minSize: 20,
  },
];

export default function ControlledSplitterDemo() {
  const [size, setSize] = createSignal([30, 70]);

  return (
    <div class={styles.stack}>
      <Splitter
        panels={panels}
        size={size()}
        onResize={(details) => setSize(details.size)}
        class={styles.root}
      >
        <Splitter.Panel id="a" class={styles.panel}>
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" class={styles.panel}>
          B
        </Splitter.Panel>
      </Splitter>
      <output class={styles.status}>Sizes: {size().join(' / ')}</output>
    </div>
  );
}