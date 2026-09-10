import { Button } from '@moduix/solid/button';
import { Lightbox } from '@moduix/solid/lightbox';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/lightbox/lightbox-non-modal.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
  alt: 'Road through a green forest',
};

export default function NonModalLightboxDemo() {
  const [backgroundActions, setBackgroundActions] = createSignal(0);

  return (
    <>
      <Lightbox modal={false}>
        <Lightbox.Trigger class={styles.button}>Open non-modal lightbox</Lightbox.Trigger>
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={image.alt}>
            <Lightbox.Image src={image.src} alt={image.alt} />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
      <div>
        <output>Background actions: {backgroundActions()}</output>
        <Button variant="outline" onClick={() => setBackgroundActions((value) => value + 1)}>
          Run background action
        </Button>
      </div>
    </>
  );
}