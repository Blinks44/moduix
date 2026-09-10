import { Lightbox } from '@moduix/solid/lightbox';
import styles from '@/components/examples/lightbox/lightbox-click-to-close-image.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};

export default function ClickToCloseLightboxDemo() {
  return (
    <Lightbox>
      <Lightbox.Trigger class={styles.button}>Open click-to-close lightbox</Lightbox.Trigger>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={image.alt}>
          <Lightbox.Image src={image.src} alt={image.alt} closeOnClick />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}