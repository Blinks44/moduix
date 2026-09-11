import { createSplitterRegistry, Splitter } from '@moduix/solid/splitter';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/splitter/splitter-nested.module.css';

const horizontalPanels = [
  {
    id: 'left',
    minSize: 20,
  },
  {
    id: 'right',
    minSize: 20,
  },
];

const verticalPanels = [
  {
    id: 'top',
    minSize: 20,
  },
  {
    id: 'bottom',
    minSize: 20,
  },
];

export default function NestedSplitterDemo() {
  const registry = createSplitterRegistry();
  const [verticalSize, setVerticalSize] = createSignal([50, 50]);

  return (
    <Splitter
      panels={horizontalPanels}
      defaultSize={[35, 65]}
      registry={registry}
      class={styles.root}
    >
      <Splitter.Panel id="left" class={styles.panel}>
        Left
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="left:right" aria-label="Resize panels" />
      <Splitter.Panel id="right">
        <Splitter
          orientation="vertical"
          panels={verticalPanels}
          size={verticalSize()}
          registry={registry}
          onResize={({ size }) => setVerticalSize(size)}
        >
          <Splitter.Panel id="top" class={styles.panel}>
            Top
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels" />
          <Splitter.Panel id="bottom" class={styles.panel}>
            Bottom
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  );
}