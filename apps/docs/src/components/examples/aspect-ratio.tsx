import { AspectRatio, Card } from '@moduix/react';
import styles from './aspect-ratio.module.css';

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
const gridLandscapeImageUrl =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=720&q=80';
const gridPortraitImageUrl =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=720&h=1200&q=80';

export const aspectRatioCssProperties = [
  {
    name: '--aspect-ratio-radius' as const,
    defaultValue: 'var(--radius-md)',
    description: 'Controls the root border radius.',
  },
];

export const aspectRatioBasicCss = `
.aspect-ratio-demo {
  width: min(30rem, calc(100vw - var(--spacing-8)));
}

.aspect-ratio-demo__image {
  object-fit: cover;
}

.aspect-ratio-demo__figure {
  margin: 0;
}
`;

export const aspectRatioGridCss = `
.aspect-ratio-grid {
  display: grid;
  width: min(42rem, calc(100vw - var(--spacing-8)));
  gap: var(--spacing-4);
  align-items: start;
}

@media (min-width: 40rem) {
  .aspect-ratio-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.aspect-ratio-grid__card {
  overflow: hidden;
  --card-radius: var(--radius-lg);
}

.aspect-ratio-grid__media {
  --aspect-ratio-radius: 0;
}

.aspect-ratio-grid__image {
  object-fit: cover;
}

.aspect-ratio-grid__body {
  display: grid;
  gap: var(--spacing-2);
  padding: var(--spacing-5);
}

.aspect-ratio-grid__title {
  margin: 0;
  color: var(--color-foreground);
  font-size: var(--text-md);
  font-weight: var(--weight-semibold);
  line-height: var(--line-height-text-md);
}

.aspect-ratio-grid__description {
  margin: 0;
  color: var(--color-muted-foreground);
  font-size: var(--text-sm);
  line-height: var(--line-height-text-sm);
}
`;

export const aspectRatioEmbedCss = `
.aspect-ratio-demo {
  width: min(30rem, calc(100vw - var(--spacing-8)));
}

.aspect-ratio-demo__frame {
  border: 0;
}
`;

export const aspectRatioMigrationCss = `
.aspect-ratio-demo {
  width: min(30rem, calc(100vw - var(--spacing-8)));
  background: var(--color-muted);
}

.aspect-ratio-demo__fill-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

export function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9} className={styles.container}>
      <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
    </AspectRatio>
  );
}

export function AspectRatioCardGridExample() {
  return (
    <div className={styles.cardGrid}>
      <Card className={styles.newsCard}>
        <AspectRatio ratio={16 / 9} className={styles.newsMedia}>
          <img src={gridLandscapeImageUrl} alt="Evening city skyline" className={styles.image} />
        </AspectRatio>
        <div className={styles.newsBody}>
          <h3 className={styles.newsTitle}>City center opens a redesigned pedestrian corridor</h3>
          <p className={styles.newsDescription}>
            The source image is landscape, but the media frame stays aligned with the card beside
            it.
          </p>
        </div>
      </Card>

      <Card className={styles.newsCard}>
        <AspectRatio ratio={16 / 9} className={styles.newsMedia}>
          <img
            src={gridPortraitImageUrl}
            alt="Reporter portrait on a street background"
            className={styles.image}
          />
        </AspectRatio>
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

export function AspectRatioEmbedExample() {
  return (
    <AspectRatio ratio={16 / 9} className={styles.container}>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video embed"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className={styles.frame}
      />
    </AspectRatio>
  );
}

export function AspectRatioShadcnMigrationExample() {
  return (
    <AspectRatio ratio={16 / 9} className={styles.container}>
      <img src={imageUrl} alt="Mountain landscape" className={styles.fillImage} />
    </AspectRatio>
  );
}

export function AspectRatioAsChildExample() {
  return (
    <AspectRatio ratio={16 / 9} className={styles.container} asChild>
      <figure className={styles.figure}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </figure>
    </AspectRatio>
  );
}