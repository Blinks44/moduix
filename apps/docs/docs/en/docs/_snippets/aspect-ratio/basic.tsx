import { AspectRatio } from '@moduix/react';

const image = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="aspect-ratio-demo">
      <img src={image.src} alt={image.alt} className="aspect-ratio-demo__image" />
    </AspectRatio>
  );
}