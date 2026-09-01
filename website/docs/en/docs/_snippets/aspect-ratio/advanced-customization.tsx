import { AspectRatio } from '@moduix/react/aspect-ratio';
import styles from '@/components/examples/aspect-ratio-advanced-customization.module.css';

const media = {
  ratio: 16 / 9,
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

export default function AspectRatioAsChildDemo() {
  return (
    <AspectRatio ratio={media.ratio} className={styles.root} asChild>
      <figure className={styles.figure}>
        <img src={media.src} alt={media.alt} className={styles.image} />
      </figure>
    </AspectRatio>
  );
}