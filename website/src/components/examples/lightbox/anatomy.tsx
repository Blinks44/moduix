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

// Anatomy scene: the basic example kept open and inline so every part can be outlined.
export default function LightboxAnatomy() {
  return (
    <div
      style={{
        minHeight: 460,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Lightbox open portalled={false} modal={false}>
        <LightboxTrigger asChild>
          <button type="button" className={styles.trigger}>
            <img src={images[0].thumbnail} alt={images[0].alt} />
          </button>
        </LightboxTrigger>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxContent aria-label={images[0].alt}>
            <LightboxCloseIcon />
            <LightboxBody>
              <LightboxImage src={images[0].src} alt={images[0].alt} />
            </LightboxBody>
          </LightboxContent>
        </LightboxPositioner>
      </Lightbox>
    </div>
  );
}