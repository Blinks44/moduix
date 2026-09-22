import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/react/marquee';
import styles from '@/components/examples/marquee/marquee-reverse.module.css';

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

export default function ReverseMarqueeDemo() {
  return (
    <Marquee aria-label="Partner logos" reverse className={styles.root}>
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