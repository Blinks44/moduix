import { Splitter } from '@moduix/react/splitter';
import styles from '@/components/examples/splitter/splitter-vertical.module.css';

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

export default function VerticalSplitterDemo() {
  return (
    <Splitter orientation="vertical" panels={panels} defaultSize={[45, 55]} className={styles.root}>
      <Splitter.Panel id="a" className={styles.panel}>
        Top
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" className={styles.panel}>
        Bottom
      </Splitter.Panel>
    </Splitter>
  );
}