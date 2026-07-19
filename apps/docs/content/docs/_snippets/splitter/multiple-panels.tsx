/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Splitter } from '@moduix/react';

const panels = [
  {
    id: 'a',
    minSize: 15,
  },
  {
    id: 'b',
    minSize: 15,
  },
  {
    id: 'c',
    minSize: 15,
  },
];

export function MultiplePanelsSplitterDemo() {
  return (
    <Splitter panels={panels} defaultSize={[25, 45, 30]} className="splitter-demo">
      <Splitter.Panel id="a" className="splitter-panel">
        A
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels A and B" />
      <Splitter.Panel id="b" className="splitter-panel">
        B
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="b:c" aria-label="Resize panels B and C" />
      <Splitter.Panel id="c" className="splitter-panel">
        C
      </Splitter.Panel>
    </Splitter>
  );
}

//#endregion