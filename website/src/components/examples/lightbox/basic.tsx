import {
  LightboxTrigger,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxBody,
  LightboxImage,
  Lightbox,
} from '@moduix/react/lightbox';
import styles from '@/components/examples/lightbox/lightbox-basic.module.css';

const images = [
  {
    id: 'mountain',
    thumbnail:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
    alt: 'Mountain ridge at sunset',
  },
  {
    id: 'sea',
    thumbnail:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
    alt: 'Sea cliffs under a cloudy sky',
  },
  {
    id: 'forest',
    thumbnail:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
    alt: 'Road through a green forest',
  },
];

export default function LightboxDemo() {
  return (
    <Lightbox>
      <LightboxTrigger asChild>
        <button type="button" className={styles.trigger}>
          <img src={images[0].thumbnail} alt={images[0].alt} />
        </button>
      </LightboxTrigger>
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