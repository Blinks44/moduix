import {
  Marquee,
  MarqueeContent,
  MarqueeEdge,
  MarqueeItem,
  MarqueeViewport,
} from '@moduix/solid/marquee';
import styles from '@/components/examples/marquee/marquee-edges.module.css';

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

export default function EdgesMarqueeDemo() {
  return (
    <Marquee aria-label="Partner logos" class={styles.root}>
      <MarqueeEdge side="start" />
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
      <MarqueeEdge side="end" />
    </Marquee>
  );
}