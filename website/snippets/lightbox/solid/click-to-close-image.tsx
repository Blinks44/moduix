import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  Lightbox,
} from '@moduix/solid/lightbox';
import styles from '@/components/examples/lightbox/lightbox-click-to-close-image.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};

export default function ClickToCloseLightboxDemo() {
  return (
    <Lightbox>
      <LightboxTrigger class={styles.button}>Open click-to-close lightbox</LightboxTrigger>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={image.alt}>
          <LightboxImage src={image.src} alt={image.alt} closeOnClick />
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  );
}