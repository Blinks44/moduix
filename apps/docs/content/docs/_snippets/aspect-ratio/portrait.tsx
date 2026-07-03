//#region demo
import { AspectRatio } from '@moduix/react';

const ratio = 9 / 16;
const media = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

export function PortraitAspectRatioDemo() {
  return (
    <div className="aspect-ratio-demo aspect-ratio-demo--narrow">
      <AspectRatio ratio={ratio}>
        <img src={media.src} alt={media.alt} className="aspect-ratio-demo__image" />
      </AspectRatio>
    </div>
  );
}
//#endregion