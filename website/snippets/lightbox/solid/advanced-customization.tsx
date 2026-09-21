import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  Lightbox,
} from '@moduix/solid/lightbox';
import styles from '@/components/examples/lightbox/lightbox-advanced-customization.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};

export default function AdvancedCustomizationLightboxDemo() {
  return (
    <Lightbox>
      <LightboxTrigger class={styles.button}>Open styled lightbox</LightboxTrigger>
      <LightboxBackdrop class={styles.customBackdrop} />
      <LightboxPositioner>
        <LightboxCloseIcon class={styles.customClose} />
        <LightboxContent class={styles.customContent} aria-label={image.alt}>
          <LightboxImage src={image.src} alt={image.alt} />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  );
}