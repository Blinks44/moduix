import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxBody,
  LightboxImage,
  Lightbox,
} from '@moduix/solid/lightbox';
import styles from '@/components/examples/lightbox/lightbox-basic.module.css';

const images = [
  {
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Mountain ridge at sunset',
  },
];

export default function LightboxDemo() {
  return (
    <Lightbox>
      <LightboxTrigger
        asChild={(props) => (
          <button {...props()} type="button" class={styles.trigger}>
            <img src={images[0].thumbnail} alt={images[0].alt} />
          </button>
        )}
      />
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxCloseIcon />
        <LightboxContent aria-label={images[0].alt}>
          <LightboxBody>
            <LightboxImage src={images[0].src} alt={images[0].alt} />
          </LightboxBody>
        </LightboxContent>
      </LightboxPositioner>
    </Lightbox>
  );
}