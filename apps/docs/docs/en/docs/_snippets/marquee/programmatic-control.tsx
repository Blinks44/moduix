import { Button, Marquee, useMarquee } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

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

export default function ProgrammaticMarqueeDemo() {
  const marquee = useMarquee({
    translations: {
      root: 'Partner logos',
    },
  });
  const [status, setStatus] = useState('Running');

  const handlePause = () => {
    marquee.pause();
    setStatus('Paused');
  };

  const handleResume = () => {
    marquee.resume();
    setStatus('Running');
  };

  const handleRestart = () => {
    marquee.restart();
    setStatus('Restarted');
  };

  return (
    <div className="marquee-stack">
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
      <PreviewMeta>
        <output>Playback: {status}</output>
        <Button size="sm" variant="outline" onClick={handlePause}>
          Pause
        </Button>
        <Button size="sm" variant="outline" onClick={handleResume}>
          Resume
        </Button>
        <Button size="sm" variant="outline" onClick={handleRestart}>
          Restart
        </Button>
      </PreviewMeta>
    </div>
  );
}