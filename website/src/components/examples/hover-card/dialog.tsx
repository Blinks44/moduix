import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/react/hover-card';
import { useRef } from 'react';
import styles from '@/components/examples/hover-card/hover-card-dialog.module.css';

export default function DialogHoverCard() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <Dialog initialFocusEl={() => titleRef.current}>
      <DialogTrigger asChild>
        <Button>View profile</Button>
      </DialogTrigger>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle ref={titleRef} tabIndex={-1}>
              Team member
            </DialogTitle>
          </DialogHeader>
          <HoverCard portalled={false}>
            <HoverCardTrigger className={styles.trigger}>@sarah_chen</HoverCardTrigger>
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
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}