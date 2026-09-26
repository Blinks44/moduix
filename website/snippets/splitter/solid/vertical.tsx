import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/solid/splitter';
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
    <Splitter orientation="vertical" panels={panels} defaultSize={[45, 55]} class={styles.root}>
      <SplitterPanel id="a" class={styles.panel}>
        Top
      </SplitterPanel>
      <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
      <SplitterPanel id="b" class={styles.panel}>
        Bottom
      </SplitterPanel>
    </Splitter>
  );
}