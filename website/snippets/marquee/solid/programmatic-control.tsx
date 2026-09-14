import { Button } from '@moduix/solid/button';
import { Marquee, useMarquee } from '@moduix/solid/marquee';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/marquee/marquee-programmatic-control.module.css';

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

export default function ProgrammaticMarqueeDemo() {
  const marquee = useMarquee({
    translations: {
      root: 'Partner logos',
    },
  });
  const [status, setStatus] = createSignal('Running');

  const handlePause = () => {
    marquee().pause();
    setStatus('Paused');
  };

  const handleResume = () => {
    marquee().resume();
    setStatus('Running');
  };

  const handleRestart = () => {
    marquee().restart();
    setStatus('Restarted');
  };

  return (
    <div class={styles.stack}>
      <Marquee.RootProvider value={marquee} class={styles.root}>
        <Marquee.Viewport>
          <Marquee.Content>
            {partners.map((item) => (
              <Marquee.Item class={styles.item}>
                <span>{item.mark}</span>
                <span>{item.name}</span>
              </Marquee.Item>
            ))}
          </Marquee.Content>
        </Marquee.Viewport>
      </Marquee.RootProvider>
      <div>
        <output>Playback: {status()}</output>
        <Button size="sm" variant="outline" onClick={handlePause}>
          Pause
        </Button>
        <Button size="sm" variant="outline" onClick={handleResume}>
          Resume
        </Button>
        <Button size="sm" variant="outline" onClick={handleRestart}>
          Restart
        </Button>
      </div>
    </div>
  );
}