import type { Meta, StoryObj } from '@storybook/react';
import { AspectRatio } from '../../../src/components/aspect-ratio/AspectRatio';
import styles from './AspectRatio.stories.module.css';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    ratio: 16 / 9,
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

export const Image: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={styles.container}>
      <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
    </AspectRatio>
  ),
};

export const EmbeddedContent: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={styles.container}>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video embed"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className={styles.frame}
      />
    </AspectRatio>
  ),
};

export const ShadcnMigration: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={`${styles.container} ${styles.migrationFrame}`}>
      <img src={imageUrl} alt="Mountain landscape" className={styles.fillImage} />
    </AspectRatio>
  ),
};

export const AsChild: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={styles.container} asChild>
      <figure className={styles.figure}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </figure>
    </AspectRatio>
  ),
};

export const CustomRadius: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={`${styles.container} ${styles.roundedFrame}`}>
      <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
    </AspectRatio>
  ),
};