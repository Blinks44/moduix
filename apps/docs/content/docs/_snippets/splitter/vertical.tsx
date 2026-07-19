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

export function VerticalSplitterDemo() {
  return (
    <Splitter
      orientation="vertical"
      panels={panels}
      defaultSize={[45, 55]}
      className="splitter-vertical"
    >
      <Splitter.Panel id="a" className="splitter-panel">
        Top
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
      <Splitter.Panel id="b" className="splitter-panel">
        Bottom
      </Splitter.Panel>
    </Splitter>
  );
}

//#endregion