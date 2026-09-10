import { Lightbox } from '@moduix/solid/lightbox';
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
      <Lightbox.Trigger
        asChild={(props) => (
          <button {...props()} type="button" class={styles.trigger}>
            <img src={images[0].thumbnail} alt={images[0].alt} />
          </button>
        )}
      />
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={images[0].alt}>
          <Lightbox.Body>
            <Lightbox.Image src={images[0].src} alt={images[0].alt} />
          </Lightbox.Body>
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}