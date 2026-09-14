import { Button } from '@moduix/solid/button';
import { Lightbox, useLightbox, useLightboxContext } from '@moduix/solid/lightbox';

const image = {
  src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
  alt: 'Road through a green forest',
};

function LightboxStatus() {
  const dialog = useLightboxContext();
  return <output>Preview is {dialog().open ? 'open' : 'closed'}</output>;
}

export default function LightboxStateDemo() {
  const lightbox = useLightbox();

  return (
    <>
      <Button onClick={() => lightbox().setOpen(true)}>
        Lightbox is {lightbox().open ? 'open' : 'closed'}
      </Button>
      <Lightbox.RootProvider value={lightbox}>
        <Lightbox.Backdrop />
        <Lightbox.Positioner>
          <Lightbox.CloseIcon />
          <Lightbox.Content aria-label={image.alt}>
            <Lightbox.Image src={image.src} alt={image.alt} />
            <LightboxStatus />
          </Lightbox.Content>
        </Lightbox.Positioner>
      </Lightbox.RootProvider>
    </>
  );
}