import { Button } from '@moduix/solid/button';
import { HoverCard } from '@moduix/solid/hover-card';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/hover-card/hover-card-controlled.module.css';

export default function ControlledHoverCard() {
  const [open, setOpen] = createSignal(false);

  return (
    <>
      <HoverCard open={open()} onOpenChange={(details) => setOpen(details.open)}>
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
      <div>
        <output>Open: {open() ? 'yes' : 'no'}</output>
        <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
      </div>
    </>
  );
}