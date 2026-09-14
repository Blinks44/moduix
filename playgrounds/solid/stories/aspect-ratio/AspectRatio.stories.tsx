import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { AspectRatio } from '@/components/aspect-ratio/AspectRatio';
import styles from './AspectRatio.stories.module.css';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
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
  render: (args) => (
    <AspectRatio {...args} class={styles.container}>
      <img src={imageUrl} alt="Mountain landscape" class={styles.image} />
    </AspectRatio>
  ),
};

export const EmbeddedContent: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} class={styles.container}>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video embed"
        class={styles.iframe}
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </AspectRatio>
  ),
};

export const ShadcnMigration: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} class={`${styles.container} ${styles.migrationFrame}`}>
      <img src={imageUrl} alt="Mountain landscape" class={styles.fillImage} />
    </AspectRatio>
  ),
};

export const AsChild: Story = {
  render: () => (
    <AspectRatio
      ratio={16 / 9}
      class={styles.container}
      asChild={(props) => (
        <figure {...props({ class: styles.figure })}>
          <img src={imageUrl} alt="Mountain landscape" class={styles.image} />
        </figure>
      )}
    />
  ),
};

export const CustomRadius: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} class={`${styles.container} ${styles.roundedFrame}`}>
      <img src={imageUrl} alt="Mountain landscape" class={styles.image} />
    </AspectRatio>
  ),
};