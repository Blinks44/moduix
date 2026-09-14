import { Lightbox } from '@moduix/solid/lightbox';
import { For, createSignal } from 'solid-js';
import styles from '@/components/examples/lightbox/lightbox-multiple-triggers.module.css';

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

export default function MultipleTriggersLightboxDemo() {
  const [activeImage, setActiveImage] = createSignal(images[0]);

  return (
    <Lightbox
      onTriggerValueChange={(details) => {
        setActiveImage(images.find((image) => image.id === details.value) ?? images[0]);
      }}
    >
      <div class={styles.gallery}>
        <For each={images}>
          {(image) => (
            <Lightbox.Trigger
              value={image.id}
              asChild={(props) => (
                <button {...props()} type="button" class={styles.galleryTrigger}>
                  <img src={image.thumbnail} alt={image.alt} />
                </button>
              )}
            />
          )}
        </For>
      </div>
      <Lightbox.Backdrop />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon />
        <Lightbox.Content aria-label={activeImage().alt}>
          <Lightbox.Image src={activeImage().src} alt={activeImage().alt} />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}