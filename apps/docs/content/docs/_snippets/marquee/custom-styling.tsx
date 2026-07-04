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

export function CustomStylingMarqueeDemo() {
  return (
    <Marquee aria-label="Partner logos" autoFill pauseOnInteraction className="marquee-custom">
      <Marquee.Edge side="start" />
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
      <Marquee.Edge side="end" />
    </Marquee>
  );
}

//#endregion