import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';
import { HoverCard } from '@moduix/react/hover-card';
import { useRef } from 'react';
import styles from '@/components/examples/hover-card/hover-card-dialog.module.css';

export default function DialogHoverCard() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <Dialog initialFocusEl={() => titleRef.current}>
      <Dialog.Trigger asChild>
        <Button>View profile</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title ref={titleRef} tabIndex={-1}>
              Team member
            </Dialog.Title>
          </Dialog.Header>
          <HoverCard portalled={false}>
            <HoverCard.Trigger className={styles.trigger}>@sarah_chen</HoverCard.Trigger>
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
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}