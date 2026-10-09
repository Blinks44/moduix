import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { AspectRatio } from '@/components/aspect-ratio';
import styles from './AspectRatio.stories.module.css';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

const storyComponents = { AspectRatio };

function renderStory(template: string) {
  return (args: { ratio: number }) =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { args, imageUrl, styles };
      },
      template,
    });
}

export const Image: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="styles.container">
      <img :src="imageUrl" alt="Mountain landscape" :class="styles.image" />
    </AspectRatio>
  `),
};

export const EmbeddedContent: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="styles.container">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video embed"
        :class="styles.iframe"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </AspectRatio>
  `),
};

export const ShadcnMigration: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="[styles.container, styles.migrationFrame]">
      <img :src="imageUrl" alt="Mountain landscape" :class="styles.fillImage" />
    </AspectRatio>
  `),
};

export const AsChild: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="styles.container" as-child>
      <figure :class="styles.figure">
        <img :src="imageUrl" alt="Mountain landscape" :class="styles.image" />
      </figure>
    </AspectRatio>
  `),
};

export const CustomRadius: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="[styles.container, styles.roundedFrame]">
      <img :src="imageUrl" alt="Mountain landscape" :class="styles.image" />
    </AspectRatio>
  `),
};