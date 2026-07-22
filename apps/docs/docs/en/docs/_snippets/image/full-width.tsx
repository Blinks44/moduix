import { Image } from '@moduix/react';

export default function FullWidthImageDemo() {
  return (
    <div className="image-full-width">
      <Image
        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72"
        alt="Sunlit modern office interior"
        layout="fullWidth"
        height={360}
      />
    </div>
  );
}