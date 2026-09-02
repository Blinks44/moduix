import { Button } from '@moduix/react/button';
import { Splitter, useSplitter } from '@moduix/react/splitter';
import { PreviewMeta } from '@/components/mdx/Components';
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
    <div className={styles.stack}>
      <Splitter.RootProvider value={splitter} className={styles.root}>
        <Splitter.Panel id="a" className={styles.panel}>
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" className={styles.panel}>
          B
        </Splitter.Panel>
      </Splitter.RootProvider>
      <PreviewMeta>
        <output className={styles.status}>Sizes: {splitter.getSizes().join(' / ')}</output>
        <div className={styles.toolbar}>
          <Button onClick={() => splitter.resetSizes()}>Reset</Button>
          <Button onClick={() => splitter.resizePanel('a', 25)}>Set A to 25%</Button>
        </div>
      </PreviewMeta>
    </div>
  );
}