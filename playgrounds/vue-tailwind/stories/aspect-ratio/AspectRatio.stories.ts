import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import { AspectRatio } from '@/components/aspect-ratio';

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;

type Story = StoryObj<typeof meta>;

const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
const containerClassName = 'w-[480px] overflow-hidden rounded-md';
const imageClassName = 'block size-full object-cover';
const iframeClassName = 'block size-full border-0';
const fillImageClassName = 'absolute inset-0 size-full object-cover';
const figureClassName = 'm-0';
const migrationFrameClassName = 'bg-muted';
const roundedFrameClassName = 'rounded-xl';

const storyComponents = { AspectRatio };

function renderStory(template: string) {
  return (args: { ratio: number }) =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          args,
          imageUrl,
          containerClassName,
          imageClassName,
          iframeClassName,
          fillImageClassName,
          figureClassName,
          migrationFrameClassName,
          roundedFrameClassName,
        };
      },
      template,
    });
}

export const Image: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="containerClassName">
      <img :src="imageUrl" alt="Mountain landscape" :class="imageClassName" />
    </AspectRatio>
  `),
};

export const EmbeddedContent: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="containerClassName">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video embed"
        :class="iframeClassName"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </AspectRatio>
  `),
};

export const ShadcnMigration: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="[containerClassName, migrationFrameClassName]">
      <img :src="imageUrl" alt="Mountain landscape" :class="fillImageClassName" />
    </AspectRatio>
  `),
};

export const AsChild: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="containerClassName" as-child>
      <figure :class="figureClassName">
        <img :src="imageUrl" alt="Mountain landscape" :class="imageClassName" />
      </figure>
    </AspectRatio>
  `),
};

export const CustomRadius: Story = {
  args: { ratio: 16 / 9 },
  render: renderStory(`
    <AspectRatio :ratio="args.ratio" :class="[containerClassName, roundedFrameClassName]">
      <img :src="imageUrl" alt="Mountain landscape" :class="imageClassName" />
    </AspectRatio>
  `),
};