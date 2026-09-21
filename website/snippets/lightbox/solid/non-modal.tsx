import { Button } from '@moduix/solid/button';
import {
  LightboxTrigger,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  Lightbox,
} from '@moduix/solid/lightbox';
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
        <LightboxTrigger class={styles.button}>Open non-modal lightbox</LightboxTrigger>
        <LightboxPositioner>
          <LightboxCloseIcon />
          <LightboxContent aria-label={image.alt}>
            <LightboxImage src={image.src} alt={image.alt} />
          </LightboxContent>
        </LightboxPositioner>
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