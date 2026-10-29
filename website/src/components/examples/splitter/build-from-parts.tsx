import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
} from '@moduix/react/splitter';
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

export default function BuildFromPartsSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[40, 60]} className={styles.root}>
      <SplitterPanel id="a" className={styles.panel}>
        A
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels">
        <SplitterResizeTriggerIndicator />
      </SplitterResizeTrigger>
      <SplitterPanel id="b" className={styles.panel}>
        B
      </SplitterPanel>
    </Splitter>
  );
}