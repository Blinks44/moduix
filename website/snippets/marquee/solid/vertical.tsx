import {
  Marquee,
  MarqueeContent,
  MarqueeItem,
  MarqueeViewport,
} from '@moduix/solid/marquee';
import styles from '@/components/examples/marquee/marquee-vertical.module.css';

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

export default function VerticalMarqueeDemo() {
  return (
    <Marquee aria-label="Partner logos" side="bottom" class={styles.root}>
      <MarqueeViewport>
        <MarqueeContent>
          {partners.map((item) => (
            <MarqueeItem class={styles.item}>
              <span>{item.mark}</span>
              <span>{item.name}</span>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </MarqueeViewport>
    </Marquee>
  );
}
