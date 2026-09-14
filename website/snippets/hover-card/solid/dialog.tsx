import { Button } from '@moduix/solid/button';
import { Dialog } from '@moduix/solid/dialog';
import { HoverCard } from '@moduix/solid/hover-card';
import styles from '@/components/examples/hover-card/hover-card-dialog.module.css';

export default function DialogHoverCard() {
  let titleRef: HTMLHeadingElement | null = null;

  return (
    <Dialog initialFocusEl={() => titleRef}>
      <Dialog.Trigger asChild={(props) => <Button {...props()}>View profile</Button>} />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title ref={(element) => (titleRef = element)} tabIndex={-1}>
              Team member
            </Dialog.Title>
          </Dialog.Header>
          <HoverCard portalled={false}>
            <HoverCard.Trigger class={styles.trigger}>@sarah_chen</HoverCard.Trigger>
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
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog>
  );
}