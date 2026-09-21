import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  Lightbox,
} from '@moduix/solid/lightbox';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/lightbox/lightbox-controlled.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};

export default function ControlledLightboxDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <Lightbox open={open()} onOpenChange={(details) => setOpen(details.open)}>
      <LightboxTrigger class={styles.button}>Open controlled lightbox</LightboxTrigger>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={image.alt}>
          <LightboxImage src={image.src} alt={image.alt} />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  );
}