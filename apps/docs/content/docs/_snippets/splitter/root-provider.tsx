/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useSplitter } from '@ark-ui/react/splitter';
import { Button, Splitter } from '@moduix/react';

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

export function RootProviderSplitterDemo() {
  const splitter = useSplitter({
    panels,
    defaultSize: [50, 50],
  });
  return (
    <div className="splitter-stack">
      <div className="splitter-toolbar">
        <Button onClick={() => splitter.resetSizes()}>Reset</Button>
        <Button onClick={() => splitter.resizePanel('a', 25)}>Set A to 25%</Button>
      </div>
      <Splitter.RootProvider value={splitter} className="splitter-demo">
        <Splitter.Panel id="a" className="splitter-panel">
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels">
          <Splitter.ResizeTriggerIndicator />
        </Splitter.ResizeTrigger>
        <Splitter.Panel id="b" className="splitter-panel">
          B
        </Splitter.Panel>
      </Splitter.RootProvider>
      <output className="splitter-status">Sizes: {splitter.getSizes().join(' / ')}</output>
    </div>
  );
}

//#endregion