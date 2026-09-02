import { Splitter } from '@moduix/react/splitter';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
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
  const [size, setSize] = useState([30, 70]);
  return (
    <div className={styles.stack}>
      <Splitter
        panels={panels}
        size={size}
        onResize={(details) => setSize(details.size)}
        className={styles.root}
      >
        <Splitter.Panel id="a" className={styles.panel}>
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" className={styles.panel}>
          B
        </Splitter.Panel>
      </Splitter>
      <PreviewMeta>
        <output className={styles.status}>Sizes: {size.join(' / ')}</output>
      </PreviewMeta>
    </div>
  );
}