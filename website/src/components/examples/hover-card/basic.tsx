import { HoverCard } from '@moduix/react/hover-card';
import styles from '@/components/examples/hover-card/hover-card-basic.module.css';

export default function BasicHoverCard() {
  return (
    <HoverCard>
      <p>
        Liked by <HoverCard.Trigger className={styles.trigger}>@sarah_chen</HoverCard.Trigger> and 3
        others
      </p>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Body>
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
          </HoverCard.Body>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </HoverCard>
  );
}