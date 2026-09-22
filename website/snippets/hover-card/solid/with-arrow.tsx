import {
  HoverCard,
  HoverCardArrow,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/solid/hover-card';
import styles from '@/components/examples/hover-card/hover-card-with-arrow.module.css';

export default function HoverCardWithArrow() {
  return (
    <HoverCard>
      <HoverCardTrigger class={styles.trigger}>@sarah_chen</HoverCardTrigger>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow />
          <HoverCardBody>
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
          </HoverCardBody>
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCard>
  );
}