import { Button } from '@moduix/react/button';
import {
  LightboxRootProvider,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  useLightbox,
  useLightboxContext,
} from '@moduix/react/lightbox';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/lightbox/lightbox-root-provider-and-context.module.css';

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

function LightboxStatus() {
  const dialog = useLightboxContext();
  return (
    <PreviewMeta>
      <output className={styles.status}>Preview is {dialog.open ? 'open' : 'closed'}</output>
    </PreviewMeta>
  );
}

export default function LightboxStateDemo() {
  const lightbox = useLightbox();
  return (
    <>
      <Button onClick={() => lightbox.setOpen(true)}>
        Lightbox is {lightbox.open ? 'open' : 'closed'}
      </Button>
      <LightboxRootProvider value={lightbox}>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxCloseIcon />
          <LightboxContent aria-label={images[2].alt}>
            <LightboxImage src={images[2].src} alt={images[2].alt} />
            <LightboxStatus />
          </LightboxContent>
        </LightboxPositioner>
      </LightboxRootProvider>
    </>
  );
}