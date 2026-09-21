import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeViewport,
} from '@moduix/react/marquee';
import styles from '@/components/examples/marquee/marquee-auto-fill.module.css';

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

export default function AutoFillMarqueeDemo() {
  return (
    <Marquee aria-label="Partner logos" autoFill spacing="2rem" className={styles.root}>
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
  );
}
