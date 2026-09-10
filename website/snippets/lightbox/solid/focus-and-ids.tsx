import { Button } from '@moduix/solid/button';
import { Lightbox } from '@moduix/solid/lightbox';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/lightbox/lightbox-focus-and-ids.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
  alt: 'Mountain ridge at sunset',
};

const closeId = 'lightbox-focus-close';
const triggerId = 'lightbox-focus-trigger';

export default function FocusLightboxDemo() {
  const [focusReturned, setFocusReturned] = createSignal(false);

  return (
    <>
      <Lightbox
        initialFocusEl={() => document.getElementById(closeId)}
        finalFocusEl={() => document.getElementById(triggerId)}
        onOpenChange={(details) => {
          if (details.open) {
            setFocusReturned(false);
          }
        }}
        ids={{ content: 'lightbox-focus-content', title: 'lightbox-focus-title' }}
      >
        <Lightbox.Trigger class={styles.button}>Open focus-managed lightbox</Lightbox.Trigger>
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon id={closeId} />
          <Lightbox.Content>
            <Lightbox.Title class={styles.status}>Mountain ridge at sunset</Lightbox.Title>
            <Lightbox.Image src={image.src} alt={image.alt} />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
      <div>
        <output>
          {focusReturned()
            ? 'Focus returned to this button.'
            : 'Close the lightbox to return focus here.'}
        </output>
        <Button
          id={triggerId}
          class={styles.focusTarget}
          data-focus-returned={focusReturned() ? '' : undefined}
          onFocus={() => setFocusReturned(true)}
        >
          Focus returns here
        </Button>
      </div>
    </>
  );
}