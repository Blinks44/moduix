import { HoverCard } from '@moduix/solid/hover-card';
import styles from '@/components/examples/hover-card/hover-card-positioning.module.css';

export default function PositioningHoverCard() {
  return (
    <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
      <HoverCard.Trigger class={styles.trigger}>Atlas workspace</HoverCard.Trigger>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Body>
            <div class={styles.preview}>
              <img
                alt="Sunlit workspace with a laptop and plants"
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=640&q=80"
                class={styles.image}
              />
              <div class={styles.details}>
                <strong>Design systems that scale</strong>
                <p class={styles.description}>
                  A practical guide to building clear, consistent product experiences.
                </p>
              </div>
            </div>
          </HoverCard.Body>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}