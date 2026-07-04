/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Marquee } from '@moduix/react';
import { useState } from 'react';

const partners = [
  {
    name: 'Atlas',
    mark: 'AT',
  },
  {
    name: 'Beacon',
    mark: 'BC',
  },
  {
    name: 'Compass',
    mark: 'CP',
  },
  {
    name: 'Delta',
    mark: 'DL',
  },
  {
    name: 'Echo',
    mark: 'EC',
  },
  {
    name: 'Foundry',
    mark: 'FD',
  },
];

export function FiniteLoopsMarqueeDemo() {
  const [loops, setLoops] = useState(0);
  const [completed, setCompleted] = useState(0);
  return (
    <div className="marquee-stack">
      <Marquee
        aria-label="Partner logos"
        loopCount={3}
        onLoopComplete={() => setLoops((value) => value + 1)}
        onComplete={() => setCompleted((value) => value + 1)}
        className="marquee-root"
      >
        <Marquee.Viewport>
          <Marquee.Content>
            {partners.map((item) => (
              <Marquee.Item key={item.name} className="marquee-item">
                <span>{item.mark}</span>
                <span>{item.name}</span>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee>
      <div className="marquee-status">
        <span>Loops: {loops}</span>
        <span>Completed: {completed}</span>
      </div>
    </div>
  );
}

//#endregion