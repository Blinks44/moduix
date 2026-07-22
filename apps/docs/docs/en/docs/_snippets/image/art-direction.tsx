import { Image } from '@moduix/react';

export default function ArtDirectedImageDemo() {
  return (
    <picture className="image-picture">
      <Image.Source
        media="(min-width: 48rem)"
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
        width={800}
        height={520}
      />
      <Image
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        alt="Team member in a sunlit workspace"
        width={800}
        height={520}
      />
    </picture>
  );
}