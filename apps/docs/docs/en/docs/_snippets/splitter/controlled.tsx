import { Splitter } from '@moduix/react';
import { useState } from 'react';

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

export default function ControlledSplitterDemo() {
  const [size, setSize] = useState([30, 70]);
  return (
    <div className="splitter-stack">
      <Splitter
        panels={panels}
        size={size}
        onResize={(details) => setSize(details.size)}
        className="splitter-demo"
      >
        <Splitter.Panel id="a" className="splitter-panel">
          A
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" aria-label="Resize panels" />
        <Splitter.Panel id="b" className="splitter-panel">
          B
        </Splitter.Panel>
      </Splitter>
      <output className="splitter-status">Sizes: {size.join(' / ')}</output>
    </div>
  );
}