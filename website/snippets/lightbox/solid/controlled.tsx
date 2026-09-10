import { Lightbox } from '@moduix/solid/lightbox';
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
      <Lightbox.Trigger class={styles.button}>Open controlled lightbox</Lightbox.Trigger>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={image.alt}>
          <Lightbox.Image src={image.src} alt={image.alt} />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}