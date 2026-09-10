import { HoverCard } from '@moduix/solid/hover-card';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-solid';
import styles from '@/components/examples/hover-card/hover-card-context.module.css';

export default function ContextHoverCard() {
  return (
    <HoverCard>
      <HoverCard.Context>
        {(hoverCard) => (
          <HoverCard.Trigger class={styles.trigger}>
            @sarah_chen
            {hoverCard().open ? (
              <ChevronUpIcon aria-hidden size={16} />
            ) : (
              <ChevronDownIcon aria-hidden size={16} />
            )}
          </HoverCard.Trigger>
        )}
      </HoverCard.Context>
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