import { Button } from '@moduix/solid/button';
import { Splitter, useSplitter } from '@moduix/solid/splitter';
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
      <Splitter.RootProvider value={splitter} class={styles.root}>
        <Splitter.Panel id="a" class={styles.panel}>
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" class={styles.panel}>
          B
        </Splitter.Panel>
      </Splitter.RootProvider>
      <output class={styles.status}>Sizes: {splitter().getSizes().join(' / ')}</output>
      <div class={styles.toolbar}>
        <Button onClick={() => splitter().resetSizes()}>Reset</Button>
        <Button onClick={() => splitter().resizePanel('a', 25)}>Set A to 25%</Button>
      </div>
    </div>
  );
}