import { Splitter } from '@moduix/react/splitter';
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
      <Splitter.Panel id="sidebar" className={styles.panel}>
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <Splitter.Panel id="content" className={styles.panel}>
        Content
      </Splitter.Panel>
    </Splitter>
  );
}