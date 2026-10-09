import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/react/marquee';
import { useState } from 'react';
import styles from '@/components/examples/marquee/marquee-finite-loops.module.css';

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

export default function FiniteLoopsMarqueeDemo() {
  const [loops, setLoops] = useState(0);
  const [completed, setCompleted] = useState(0);
  return (
    <div className={styles.stack}>
      <Marquee
        aria-label="Partner logos"
        loopCount={3}
        onLoopComplete={() => setLoops((value) => value + 1)}
        onComplete={() => setCompleted((value) => value + 1)}
        className={styles.root}
      >
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
      </Marquee>
      <div className={styles.status}>
        <span>Loops: {loops}</span>
        <span>Completed: {completed}</span>
      </div>
    </div>
  );
}