//#region demo
import { AspectRatio } from '@moduix/react';

const ratio = 4 / 3;
const media = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

export function PhotoAspectRatioDemo() {
  return (
    <div className="aspect-ratio-demo">
      <AspectRatio ratio={ratio}>
        <img src={media.src} alt={media.alt} className="aspect-ratio-demo__image" />
      </AspectRatio>
    </div>
  );
}
//#endregion