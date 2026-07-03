//#region demo
import { AspectRatio } from '@moduix/react';

const media = {
  ratio: 16 / 9,
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

export function CustomRadiusAspectRatioDemo() {
  return (
    <div className="aspect-ratio-demo">
      <AspectRatio ratio={media.ratio} className="aspect-ratio-demo__rounded">
        <img src={media.src} alt={media.alt} className="aspect-ratio-demo__image" />
      </AspectRatio>
    </div>
  );
}
//#endregion