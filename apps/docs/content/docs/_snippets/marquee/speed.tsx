/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Marquee } from '@moduix/react';

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

export function SpeedMarqueeDemo() {
  return (
    <div className="marquee-stack">
      <Marquee aria-label="Slow partner logos" speed={25} className="marquee-root">
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
      <Marquee aria-label="Fast partner logos" speed={100} className="marquee-root">
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
    </div>
  );
}

//#endregion