import { Marquee } from '@moduix/react/marquee';
import styles from '@/components/examples/marquee/marquee-pause-on-interaction.module.css';

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

export default function PauseOnInteractionMarqueeDemo() {
  return (
    <Marquee aria-label="Partner logos" pauseOnInteraction className={styles.root}>
      <Marquee.Viewport>
        <Marquee.Content>
          {partners.map((item) => (
            <Marquee.Item key={item.name} className={styles.item}>
              <span>{item.mark}</span>
              <span>{item.name}</span>
            </Marquee.Item>
          ))}
        </Marquee.Content>
      </Marquee.Viewport>
    </Marquee>
  );
}