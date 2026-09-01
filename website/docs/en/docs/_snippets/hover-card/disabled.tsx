import { HoverCard } from '@moduix/react/hover-card';
import styles from '@/components/examples/hover-card/hover-card-disabled.module.css';

export default function DisabledHoverCard() {
  return (
    <HoverCard disabled>
      <HoverCard.Trigger className={styles.trigger}>Profile preview unavailable</HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <div className={styles.preview}>
            <img
              alt="Sunlit workspace with a laptop and plants"
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
              className={styles.image}
            />
            <div className={styles.details}>
              <strong>Design systems that scale</strong>
              <p className={styles.description}>
                A practical guide to building clear, consistent product experiences.
              </p>
            </div>
          </div>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}