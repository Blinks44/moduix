/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useSplitter } from '@ark-ui/react/splitter';
import { Splitter } from '@moduix/react';
import { useEffect, useRef, useState } from 'react';

export function DynamicCollapsibleSplitterDemo() {
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
    <Splitter.RootProvider ref={rootRef} value={splitter} className="splitter-demo">
      <Splitter.Panel id="sidebar" className="splitter-panel">
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels">
        <Splitter.ResizeTriggerIndicator />
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="content" className="splitter-panel">
        Content
      </Splitter.Panel>
    </Splitter.RootProvider>
  );
}

//#endregion