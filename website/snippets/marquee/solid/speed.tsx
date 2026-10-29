import { Marquee, MarqueeContent, MarqueeItem, MarqueeViewport } from '@moduix/solid/marquee';
import { Stack } from '@moduix/solid/stack';
import styles from '@/components/examples/marquee/marquee-speed.module.css';

const partners = [
  { name: 'Atlas', mark: 'AT' },
  { name: 'Beacon', mark: 'BC' },
  { name: 'Compass', mark: 'CP' },
  { name: 'Delta', mark: 'DL' },
  { name: 'Echo', mark: 'EC' },
  { name: 'Foundry', mark: 'FD' },
];

export default function SpeedMarqueeDemo() {
  return (
    <Stack align="center" gap="3">
      <Marquee aria-label="Slow partner logos" speed={25} class={styles.root}>
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
      <Marquee aria-label="Fast partner logos" speed={100} class={styles.root}>
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
    </Stack>
  );
}