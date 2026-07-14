import { Image } from '@moduix/react';
import styles from './image.module.css';

const mountainImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';
const architectureImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72';
const portraitImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330';

export const imageCssProperties = [
  {
    name: '--image-radius' as const,
    defaultValue: 'var(--radius-md)',
    description: 'Controls the image border radius.',
  },
];

export const imageBasicCss = `
.image-demo {
  width: min(32rem, calc(100vw - var(--spacing-8)));
}
`;

export const imageFullWidthCss = `
.image-full-width {
  width: min(46rem, calc(100vw - var(--spacing-8)));
}
`;

export const imagePictureCss = `
.image-picture {
  display: block;
  width: min(32rem, calc(100vw - var(--spacing-8)));
}
`;

export function ImageExample() {
  return (
    <Image
      className={styles.container}
      src={mountainImage}
      alt="Mountain landscape"
      width={800}
      height={520}
      layout="constrained"
    />
  );
}

export function ImageArtDirectionExample() {
  return (
    <picture className={styles.picture}>
      <Image.Source media="(min-width: 48rem)" src={architectureImage} width={800} height={520} />
      <Image src={portraitImage} alt="Team member in a sunlit workspace" width={800} height={520} />
    </picture>
  );
}

export function ImageFixedExample() {
  return (
    <Image
      src={portraitImage}
      alt="Team member in a sunlit workspace"
      layout="fixed"
      width={192}
      height={256}
    />
  );
}

export function ImageFullWidthExample() {
  return (
    <div className={styles.fullWidth}>
      <Image
        src={architectureImage}
        alt="Sunlit modern office interior"
        layout="fullWidth"
        height={360}
      />
    </div>
  );
}