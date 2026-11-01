import { AspectRatio } from '@moduix/react/aspect-ratio';
import styles from '@/components/examples/aspect-ratio/aspect-ratio-common-ratios.module.css';

const image = {
  src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  alt: 'Mountain landscape',
};

const ratios = [
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
];

export default function CommonRatiosAspectRatioDemo() {
  return (
    <div className={styles.root}>
      {ratios.map((ratio) => (
        <figure key={ratio.label} className={styles.item}>
          <AspectRatio ratio={ratio.value} className={styles.frame}>
            <img src={image.src} alt={image.alt} className={styles.image} />
          </AspectRatio>
          <figcaption className={styles.caption}>{ratio.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}