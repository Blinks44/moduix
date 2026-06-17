import type { ComponentProps } from 'react';
import { AspectRatio, Card } from 'moduix';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './aspect-ratio.module.css';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
const gridLandscapeImageUrl =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=720&q=80';
const gridPortraitImageUrl =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=720&h=1200&q=80';

const aspectRatioCssProperties = [
  {
    name: '--aspect-ratio-radius' as const,
    defaultValue: 'var(--radius-md)',
    description: 'Controls the root border radius.',
  },
];

export function AspectRatioCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={aspectRatioCssProperties} />;
}

export function AspectRatioExample({
  ratio = 16 / 9,
  ...props
}: ComponentProps<typeof AspectRatio.Root>) {
  return (
    <div className={styles.container}>
      <AspectRatio.Root ratio={ratio} {...props}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio.Root>
    </div>
  );
}

export function AspectRatioSquareExample() {
  return (
    <div className={styles.container}>
      <AspectRatio.Root ratio={1}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio.Root>
    </div>
  );
}

export function AspectRatioPortraitExample() {
  return (
    <div className={styles.narrowContainer}>
      <AspectRatio.Root ratio={9 / 16}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio.Root>
    </div>
  );
}

export function AspectRatioPhotoExample() {
  return (
    <div className={styles.container}>
      <AspectRatio.Root ratio={4 / 3}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio.Root>
    </div>
  );
}

export function AspectRatioCardGridExample() {
  return (
    <div className={styles.cardGrid}>
      <Card className={styles.newsCard}>
        <AspectRatio.Root ratio={16 / 9} className={styles.newsMedia}>
          <img src={gridLandscapeImageUrl} alt="Evening city skyline" className={styles.image} />
        </AspectRatio.Root>
        <div className={styles.newsBody}>
          <h3 className={styles.newsTitle}>City center opens a redesigned pedestrian corridor</h3>
          <p className={styles.newsDescription}>
            The source image is landscape, but the media frame stays aligned with the card beside
            it.
          </p>
        </div>
      </Card>

      <Card className={styles.newsCard}>
        <AspectRatio.Root ratio={16 / 9} className={styles.newsMedia}>
          <img
            src={gridPortraitImageUrl}
            alt="Reporter portrait on a street background"
            className={styles.image}
          />
        </AspectRatio.Root>
        <div className={styles.newsBody}>
          <h3 className={styles.newsTitle}>
            Editors uploaded a tall portrait photo for this story
          </h3>
          <p className={styles.newsDescription}>
            `AspectRatio` plus `object-fit: cover` keeps the media height the same instead of
            letting the card jump.
          </p>
        </div>
      </Card>
    </div>
  );
}

export function AspectRatioCustomRatioExample() {
  return (
    <div className={styles.container}>
      <AspectRatio.Root ratio={2.35}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio.Root>
    </div>
  );
}

export function AspectRatioEmbedExample() {
  return (
    <div className={styles.container}>
      <AspectRatio.Root ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video embed"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className={styles.frame}
        />
      </AspectRatio.Root>
    </div>
  );
}

export function AspectRatioCustomRadiusExample() {
  return (
    <div className={styles.container}>
      <AspectRatio.Root ratio={16 / 9} className={styles.roundedFrame}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio.Root>
    </div>
  );
}