import { Splitter } from '@moduix/react/splitter';
import styles from '@/components/examples/splitter/splitter-basic.module.css';

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

export default function SplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[40, 60]} className={styles.root}>
      <Splitter.Panel id="a" className={styles.panel}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" className={styles.panel}>
        B
      </Splitter.Panel>
    </Splitter>
  );
}