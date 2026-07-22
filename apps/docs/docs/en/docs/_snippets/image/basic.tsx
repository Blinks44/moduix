import { Image } from '@moduix/react';

export default function ImageDemo() {
  return (
    <Image
      className="image-demo"
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
      alt="Mountain landscape"
      width={800}
      height={520}
      layout="constrained"
    />
  );
}