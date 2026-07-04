/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createSplitterRegistry } from '@ark-ui/react/splitter';
import { Splitter } from '@moduix/react';
import { useState } from 'react';

const horizontalPanels = [
  {
    id: 'left',
    minSize: 20,
  },
  {
    id: 'right',
    minSize: 20,
  },
];

const verticalPanels = [
  {
    id: 'top',
    minSize: 20,
  },
  {
    id: 'bottom',
    minSize: 20,
  },
];

export function NestedSplitterDemo() {
  const [registry] = useState(() => createSplitterRegistry());
  return (
    <Splitter
      panels={horizontalPanels}
      defaultSize={[35, 65]}
      registry={registry}
      className="splitter-nested"
    >
      <Splitter.Panel id="left" className="splitter-panel">
        Left
      </Splitter.Panel>
      <Splitter.ResizeTrigger id="left:right" aria-label="Resize panels">
        <Splitter.ResizeTriggerIndicator />
      </Splitter.ResizeTrigger>
      <Splitter.Panel id="right">
        <Splitter
          orientation="vertical"
          panels={verticalPanels}
          defaultSize={[50, 50]}
          registry={registry}
        >
          <Splitter.Panel id="top" className="splitter-panel">
            Top
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels">
            <Splitter.ResizeTriggerIndicator />
          </Splitter.ResizeTrigger>
          <Splitter.Panel id="bottom" className="splitter-panel">
            Bottom
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  );
}

//#endregion