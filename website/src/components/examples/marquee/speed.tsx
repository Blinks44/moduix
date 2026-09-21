import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeViewport,
} from '@moduix/react/marquee';
import styles from '@/components/examples/marquee/marquee-speed.module.css';

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

export default function SpeedMarqueeDemo() {
  return (
    <div className={styles.stack}>
      <Marquee aria-label="Slow partner logos" speed={25} className={styles.root}>
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
      <Marquee aria-label="Fast partner logos" speed={100} className={styles.root}>
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
    </div>
  );
}
