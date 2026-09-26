import { Button } from '@moduix/react/button';
import {
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterRootProvider,
  useSplitter,
} from '@moduix/react/splitter';
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
      <SplitterRootProvider value={splitter} className={styles.root}>
        <SplitterPanel id="a" className={styles.panel}>
          A
        </SplitterPanel>
        <SplitterResizeTrigger id="a:b" aria-label="Resize panels" />
        <SplitterPanel id="b" className={styles.panel}>
          B
        </SplitterPanel>
      </SplitterRootProvider>
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