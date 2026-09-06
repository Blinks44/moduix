import { AspectRatio } from '@moduix/solid/aspect-ratio';
import styles from '@/components/examples/aspect-ratio/aspect-ratio-migrating-from-shadcn.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

export default function AspectRatioMigrationDemo() {
  return (
    <AspectRatio ratio={16 / 9} class={styles.root}>
      {/* Swap this <img> for next/image with fill in a Next.js app. */}
      <img src={image.src} alt={image.alt} class={styles.image} />
    </AspectRatio>
  );
}