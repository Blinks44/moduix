import { Button } from '@moduix/solid/button';
import {
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterRootProvider,
  useSplitter,
} from '@moduix/solid/splitter';
import styles from '@/components/examples/splitter/splitter-root-provider.module.css';

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

export default function RootProviderSplitterDemo() {
  const splitter = useSplitter({
    panels,
    defaultSize: [50, 50],
  });

  return (
    <div class={styles.stack}>
      <SplitterRootProvider value={splitter} class={styles.root}>
        <SplitterPanel id="a" class={styles.panel}>
          A
        </SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
        <SplitterPanel id="b" class={styles.panel}>
          B
        </SplitterPanel>
      </SplitterRootProvider>
      <output class={styles.status}>Sizes: {splitter().getSizes().join(' / ')}</output>
      <div class={styles.toolbar}>
        <Button onClick={() => splitter().resetSizes()}>Reset</Button>
        <Button onClick={() => splitter().resizePanel('a', 25)}>Set A to 25%</Button>
      </div>
    </div>
  );
}