import { createSplitterRegistry, Splitter } from '@moduix/react/splitter';
import { useState } from 'react';
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
  const [registry] = useState(() => createSplitterRegistry());
  const [verticalSize, setVerticalSize] = useState([50, 50]);

  return (
    <Splitter
      panels={horizontalPanels}
      defaultSize={[35, 65]}
      registry={registry}
      className={styles.root}
    >
      <Splitter.Panel id="left" className={styles.panel}>
        Left
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="left:right" aria-label="Resize panels" />
      <Splitter.Panel id="right">
        <Splitter
          orientation="vertical"
          panels={verticalPanels}
          size={verticalSize}
          registry={registry}
          onResize={({ size }) => setVerticalSize(size)}
        >
          <Splitter.Panel id="top" className={styles.panel}>
            Top
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels" />
          <Splitter.Panel id="bottom" className={styles.panel}>
            Bottom
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  );
}