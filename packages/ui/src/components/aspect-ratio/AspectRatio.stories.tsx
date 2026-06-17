import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from './AspectRatio';
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

export const Video: Story = {
  render: () => (
    <div className={styles.container}>
      <AspectRatio ratio={16 / 9}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div className={styles.container}>
      <AspectRatio ratio={1}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio>
    </div>
  ),
};

export const Portrait: Story = {
  render: () => (
    <div className={styles.containerNarrow}>
      <AspectRatio ratio={9 / 16}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio>
    </div>
  ),
};

export const Photo: Story = {
  render: () => (
    <div className={styles.container}>
      <AspectRatio ratio={4 / 3}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio>
    </div>
  ),
};

export const CustomRatio: Story = {
  render: () => (
    <div className={styles.container}>
      <AspectRatio ratio={2.35}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio>
    </div>
  ),
};

export const GenericContent: Story = {
  render: () => (
    <div className={styles.container}>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Video embed"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </AspectRatio>
    </div>
  ),
};

export const CustomRadius: Story = {
  render: () => (
    <div className={styles.container}>
      <AspectRatio ratio={16 / 9} className={styles.roundedFrame}>
        <img src={imageUrl} alt="Mountain landscape" className={styles.image} />
      </AspectRatio>
    </div>
  ),
};