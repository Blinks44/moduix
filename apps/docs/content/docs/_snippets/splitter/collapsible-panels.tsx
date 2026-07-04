/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Splitter } from '@moduix/react';

const panels = [
  {
    id: 'sidebar',
    minSize: 15,
    maxSize: 40,
    collapsible: true,
    collapsedSize: 5,
  },
  {
    id: 'content',
    minSize: 40,
  },
];

export function CollapsibleSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[28, 72]} className="splitter-demo">
      <Splitter.Panel id="sidebar" className="splitter-panel">
        Sidebar
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="sidebar:content" aria-label="Resize panels">
        <Splitter.ResizeTriggerIndicator />
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="content" className="splitter-panel">
        Content
      </Splitter.Panel>
    </Splitter>
  );
}

//#endregion