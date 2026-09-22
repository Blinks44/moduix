import { Button } from '@moduix/react/button';
import {
  MarqueeContent,
  MarqueeItem,
  MarqueeRootProvider,
  MarqueeViewport,
  useMarquee,
} from '@moduix/react/marquee';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/marquee/marquee-programmatic-control.module.css';

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
    <div className={styles.stack}>
      <MarqueeRootProvider value={marquee} className={styles.root}>
        <MarqueeViewport>
          <MarqueeContent>
            {partners.map((item) => (
              <MarqueeItem key={item.name} className={styles.item}>
                <span>{item.mark}</span>
                <span>{item.name}</span>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </MarqueeViewport>
      </MarqueeRootProvider>
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