import { Button } from '@moduix/react/button';
import {
  HoverCard,
  HoverCardBody,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '@moduix/react/hover-card';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/hover-card/hover-card-controlled.module.css';

export default function ControlledHoverCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HoverCard open={open} onOpenChange={(details) => setOpen(details.open)}>
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
      <PreviewMeta>
        <output>Open: {open ? 'yes' : 'no'}</output>
        <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
          Toggle
        </Button>
      </PreviewMeta>
    </>
  );
}
