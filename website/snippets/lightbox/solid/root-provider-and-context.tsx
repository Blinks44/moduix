import { Button } from '@moduix/solid/button';
import {
  LightboxRootProvider,
  LightboxBackdrop,
  LightboxPositioner,
  LightboxContent,
  LightboxCloseIcon,
  LightboxImage,
  useLightbox,
  useLightboxContext,
} from '@moduix/solid/lightbox';
import styles from '@/components/examples/lightbox/lightbox-root-provider-and-context.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
  alt: 'Road through a green forest',
};

function LightboxStatus() {
  const dialog = useLightboxContext();
  return (
    <div data-preview-meta>
      <output class={styles.status}>Preview is {dialog().open ? 'open' : 'closed'}</output>
    </div>
  );
}

export default function LightboxStateDemo() {
  const lightbox = useLightbox();

  return (
    <>
      <Button onClick={() => lightbox().setOpen(true)}>
        Lightbox is {lightbox().open ? 'open' : 'closed'}
      </Button>
      <LightboxRootProvider value={lightbox}>
        <LightboxBackdrop />
        <LightboxPositioner>
          <LightboxContent aria-label={image.alt}>
            <LightboxCloseIcon />
            <LightboxImage src={image.src} alt={image.alt} />
            <LightboxStatus />
          </LightboxContent>
        </LightboxPositioner>
      </LightboxRootProvider>
    </>
  );
}