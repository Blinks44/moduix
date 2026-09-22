import { Button } from '@moduix/solid/button';
import {
  Dialog,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/solid/dialog';
import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/solid/hover-card';
import styles from '@/components/examples/hover-card/hover-card-dialog.module.css';

export default function DialogHoverCard() {
  let titleRef: HTMLHeadingElement | null = null;

  return (
    <Dialog initialFocusEl={() => titleRef}>
      <DialogTrigger asChild={(props) => <Button {...props()}>View profile</Button>} />
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent>
          <DialogHeader>
            <DialogTitle ref={(element) => (titleRef = element)} tabIndex={-1}>
              Team member
            </DialogTitle>
          </DialogHeader>
          <HoverCard portalled={false}>
            <HoverCardTrigger class={styles.trigger}>@sarah_chen</HoverCardTrigger>
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
          </HoverCard>
        </DialogContent>
      </DialogPositioner>
    </Dialog>
  );
}