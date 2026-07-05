//#region demo
import { AspectRatio } from '@moduix/react';

const embed = {
  ratio: 16 / 9,
  src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  title: 'Video embed',
};

export function AspectRatioEmbedDemo() {
  return (
    <div className="aspect-ratio-demo">
      <AspectRatio ratio={embed.ratio}>
        <iframe
          src={embed.src}
          title={embed.title}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="aspect-ratio-demo__frame"
        />
      </AspectRatio>
    </div>
  );
}
//#endregion