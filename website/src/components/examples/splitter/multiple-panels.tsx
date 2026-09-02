import { Splitter } from '@moduix/react/splitter';
import styles from '@/components/examples/splitter/splitter-multiple-panels.module.css';

const panels = [
  {
    id: 'a',
    minSize: 15,
  },
  {
    id: 'b',
    minSize: 15,
  },
  {
    id: 'c',
    minSize: 15,
  },
];

export default function MultiplePanelsSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[25, 45, 30]} className={styles.root}>
      <Splitter.Panel id="a" className={styles.panel}>
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <Splitter.Panel id="b" className={styles.panel}>
        B
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <Splitter.Panel id="c" className={styles.panel}>
        C
      </Splitter.Panel>
    </Splitter>
  );
}