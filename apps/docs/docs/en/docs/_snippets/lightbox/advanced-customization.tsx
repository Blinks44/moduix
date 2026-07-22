import { Lightbox } from '@moduix/react';

const image = {
  src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
  alt: 'Sea cliffs under a cloudy sky',
};

export default function AdvancedCustomizationLightboxDemo() {
  return (
    <Lightbox>
      <Lightbox.Trigger className="lightbox-button">Open styled lightbox</Lightbox.Trigger>
      <Lightbox.Backdrop className="lightbox-custom-backdrop" />
      <Lightbox.Positioner>
        <Lightbox.CloseIcon className="lightbox-custom-close" />
        <Lightbox.Content className="lightbox-custom-content" aria-label={image.alt}>
          <Lightbox.Image src={image.src} alt={image.alt} />
        </Lightbox.Content>
      </Lightbox.Positioner>
    </Lightbox>
  );
}