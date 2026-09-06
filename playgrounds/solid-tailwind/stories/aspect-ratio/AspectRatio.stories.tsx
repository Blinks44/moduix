import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { AspectRatio } from '@/components/aspect-ratio/AspectRatio';

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
const containerClass = 'w-[480px]';
const imageClass = 'object-cover';
const fillImageClass = 'absolute inset-0 size-full object-cover';
const figureClass = 'm-0';
const migrationFrameClass = 'bg-muted';
const roundedFrameClass = 'rounded-xl';

export const Image: Story = {
  render: (args) => (
    <AspectRatio {...args} class={containerClass}>
      <img src={imageUrl} alt="Mountain landscape" class={imageClass} />
    </AspectRatio>
  ),
};

export const EmbeddedContent: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} class={containerClass}>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video embed"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </AspectRatio>
  ),
};

export const ShadcnMigration: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} class={`${containerClass} ${migrationFrameClass}`}>
      <img src={imageUrl} alt="Mountain landscape" class={fillImageClass} />
    </AspectRatio>
  ),
};

export const AsChild: Story = {
  render: () => (
    <AspectRatio
      ratio={16 / 9}
      class={containerClass}
      asChild={(props) => (
        <figure {...props({ class: figureClass })}>
          <img src={imageUrl} alt="Mountain landscape" class={imageClass} />
        </figure>
      )}
    />
  ),
};

export const CustomRadius: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} class={`${containerClass} ${roundedFrameClass}`}>
      <img src={imageUrl} alt="Mountain landscape" class={imageClass} />
    </AspectRatio>
  ),
};