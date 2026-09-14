import { Lightbox, type LightboxImageSelectDetails } from '@moduix/solid/lightbox';
import { For, Show, createSignal } from 'solid-js';
import styles from '@/components/examples/lightbox/lightbox-bind-cms-content.module.css';

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

export default function CmsLightboxDemo() {
  let rootRef: HTMLDivElement | undefined;
  const [activeImage, setActiveImage] = createSignal<LightboxImageSelectDetails | null>(null);

  return (
    <>
      <div ref={(element) => (rootRef = element)} class={styles.gallery}>
        <For each={images}>
          {(image) => (
            <button type="button" class={styles.galleryTrigger}>
              <img src={image.thumbnail} data-lightbox-src={image.src} alt={image.alt} />
            </button>
          )}
        </For>
      </div>

      <Lightbox>
        <Lightbox.Bind
          rootRef={() => rootRef}
          selector="button"
          onImageSelect={(details) => setActiveImage(details)}
        />
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={activeImage()?.alt ?? 'Image preview'}>
            <Show when={activeImage()}>
              {(image) => <Lightbox.Image src={image().src} alt={image().alt ?? ''} />}
            </Show>
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox>
    </>
  );
}