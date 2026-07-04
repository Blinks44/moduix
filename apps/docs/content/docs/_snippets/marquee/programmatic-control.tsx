/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useMarquee } from '@ark-ui/react/marquee';
import { Button, Marquee } from '@moduix/react';

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

export function ProgrammaticMarqueeDemo() {
  const marquee = useMarquee({
    translations: {
      root: 'Partner logos',
    },
  });
  return (
    <div className="marquee-stack">
      <div className="marquee-actions">
        <Button size="sm" variant="outline" onClick={() => marquee.pause()}>
          Pause
        </Button>
        <Button size="sm" variant="outline" onClick={() => marquee.resume()}>
          Resume
        </Button>
        <Button size="sm" variant="outline" onClick={() => marquee.restart()}>
          Restart
        </Button>
      </div>
      <Marquee.RootProvider value={marquee} className="marquee-root">
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
      </Marquee.RootProvider>
    </div>
  );
}

//#endregion