import { AspectRatio } from '@moduix/solid/aspect-ratio';
import styles from '@/components/examples/aspect-ratio/aspect-ratio-advanced-customization.module.css';

const media = {
  ratio: 16 / 9,
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

export default function AspectRatioAsChildDemo() {
  return (
    <AspectRatio
      ratio={media.ratio}
      class={styles.root}
      asChild={(props) => (
        <figure {...props()} class={`${props().class ?? ''} ${styles.figure}`.trim()}>
          <img src={media.src} alt={media.alt} class={styles.image} />
        </figure>
      )}
    />
  );
}