import { Marquee } from '@moduix/solid/marquee';
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
    <div class={styles.stack}>
      <Marquee aria-label="Slow partner logos" speed={25} class={styles.root}>
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
      </Marquee>
      <Marquee aria-label="Fast partner logos" speed={100} class={styles.root}>
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
      </Marquee>
    </div>
  );
}