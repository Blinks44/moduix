import { Lightbox } from '@moduix/solid/lightbox';
import styles from '@/components/examples/lightbox/lightbox-advanced-customization.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};

export default function AdvancedCustomizationLightboxDemo() {
  return (
    <Lightbox>
      <Lightbox.Trigger class={styles.button}>Open styled lightbox</Lightbox.Trigger>
      <Lightbox.Backdrop class={styles.customBackdrop} />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon class={styles.customClose} />
        <Lightbox.Content class={styles.customContent} aria-label={image.alt}>
          <Lightbox.Image src={image.src} alt={image.alt} />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}