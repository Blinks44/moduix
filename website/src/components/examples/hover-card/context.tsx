import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardContext,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/react/hover-card';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import styles from '@/components/examples/hover-card/hover-card-context.module.css';

export default function ContextHoverCard() {
  return (
    <HoverCard>
      <HoverCardContext>
        {(hoverCard) => (
          <HoverCardTrigger className={styles.trigger}>
            @sarah_chen
            {hoverCard.open ? (
              <ChevronUpIcon aria-hidden size={16} />
            ) : (
              <ChevronDownIcon aria-hidden size={16} />
            )}
          </HoverCardTrigger>
        )}
      </HoverCardContext>
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