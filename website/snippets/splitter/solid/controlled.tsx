import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/solid/splitter';
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
        <SplitterPanel id="a" class={styles.panel}>
          A
        </SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
        <SplitterPanel id="b" class={styles.panel}>
          B
        </SplitterPanel>
      </Splitter>
      <output class={styles.status}>Sizes: {size().join(' / ')}</output>
    </div>
  );
}