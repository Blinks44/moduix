import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@moduix/react/splitter';
import styles from '@/components/examples/splitter/splitter-collapsible-panels.module.css';

const panels = [
  {
    id: 'sidebar',
    minSize: 5,
    maxSize: 40,
    collapsible: true,
    collapsedSize: 5,
  },
  {
    id: 'content',
    minSize: 40,
  },
];

export default function CollapsibleSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[28, 72]} className={styles.root}>
      <SplitterPanel id="sidebar" className={styles.panel}>
        Sidebar
      </SplitterPanel>
      <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <SplitterPanel id="content" className={styles.panel}>
        Content
      </SplitterPanel>
    </Splitter>
  );
}