import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/react/hover-card';
import styles from '@/components/examples/hover-card/hover-card-positioning.module.css';

export default function PositioningHoverCard() {
  return (
    <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
      <HoverCardTrigger className={styles.trigger}>Atlas workspace</HoverCardTrigger>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardBody>
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
          </HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>
  );
}
