/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Splitter } from '@moduix/react';

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

export function ResizeIndicatorSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[40, 60]} className="splitter-demo">
      <Splitter.Panel id="a" className="splitter-panel">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels">
        <Splitter.ResizeTriggerIndicator />
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="b" className="splitter-panel">
        B
      </Splitter.Panel>
    </Splitter>
  );
}

//#endregion