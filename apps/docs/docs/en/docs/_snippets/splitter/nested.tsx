import { createSplitterRegistry, Splitter } from '@moduix/react/splitter';
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

export default function NestedSplitterDemo() {
  const [registry] = useState(() => createSplitterRegistry());
  const [verticalSize, setVerticalSize] = useState([50, 50]);

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
      <Splitter.ResizeTrigger id="left:right" aria-label="Resize panels" />
      <Splitter.Panel id="right">
        <Splitter
          orientation="vertical"
          panels={verticalPanels}
          size={verticalSize}
          registry={registry}
          onResize={({ size }) => setVerticalSize(size)}
        >
          <Splitter.Panel id="top" className="splitter-panel">
            Top
          </Splitter.Panel>
          <Splitter.ResizeTrigger id="top:bottom" aria-label="Resize panels" />
          <Splitter.Panel id="bottom" className="splitter-panel">
            Bottom
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
  );
}