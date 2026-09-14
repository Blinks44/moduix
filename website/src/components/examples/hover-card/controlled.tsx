import { Button } from '@moduix/react/button';
import { HoverCard } from '@moduix/react/hover-card';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/hover-card/hover-card-controlled.module.css';

export default function ControlledHoverCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
        <HoverCard.Trigger className={styles.trigger}>@sarah_chen</HoverCard.Trigger>
        <HoverCard.Positioner>
          <HoverCard.Content>
            <HoverCard.Body>
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
            </HoverCard.Body>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard>
      <PreviewMeta>
        <output>Open: {open ? 'yes' : 'no'}</output>
        <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
      </PreviewMeta>
    </>
  );
}