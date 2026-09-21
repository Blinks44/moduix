import {
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardRootProvider,
  HoverCardTrigger,
  useHoverCard,
} from '@moduix/solid/hover-card';
import styles from '@/components/examples/hover-card/hover-card-root-provider.module.css';

export default function RootProviderHoverCard() {
  const hoverCard = useHoverCard();

  return (
    <>
      <HoverCardRootProvider value={hoverCard}>
        <HoverCardTrigger class={styles.trigger}>3 unread updates</HoverCardTrigger>
        <HoverCardPositioner>
          <HoverCardContent>
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
      </HoverCardRootProvider>
      <output>Open: {hoverCard().open ? 'yes' : 'no'}</output>
    </>
  );
}
