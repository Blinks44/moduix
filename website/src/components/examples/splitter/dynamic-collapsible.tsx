import { SplitterPanel, SplitterResizeTrigger, SplitterRootProvider, useSplitter } from '@moduix/react/splitter';
import { useEffect, useRef, useState } from 'react';
import styles from '@/components/examples/splitter/splitter-dynamic-collapsible.module.css';

export default function DynamicCollapsibleSplitterDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [rootSize, setRootSize] = useState<number | null>(null);
  const isCompact = rootSize != null && rootSize < 520;
  const splitter = useSplitter({
    panels: [
      {
        id: 'sidebar',
        collapsible: isCompact,
        collapsedSize: 5,
        minSize: 18,
        maxSize: 40,
      },
      {
        id: 'content',
        minSize: 40,
      },
    ],
    defaultSize: [30, 70],
  });
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setRootSize(entry.contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (isCompact) splitter.collapsePanel('sidebar');
    else splitter.expandPanel('sidebar');
  }, [isCompact, splitter]);
  return (
    <SplitterRootProvider ref={rootRef} value={splitter} className={styles.root}>
      <SplitterPanel id="sidebar" className={styles.panel}>
        Sidebar
      </SplitterPanel>
      <SplitterResizeTrigger id="sidebar:content" aria-label="Resize panels" />
      <SplitterPanel id="content" className={styles.panel}>
        Content
      </SplitterPanel>
    </SplitterRootProvider>
  );
}
