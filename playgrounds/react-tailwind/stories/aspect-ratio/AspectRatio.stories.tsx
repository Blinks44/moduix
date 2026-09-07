import type { Meta, StoryObj } from '@storybook/react-vite';
import { AspectRatio } from '@/components/aspect-ratio/AspectRatio';

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
const containerClassName = 'w-[480px] overflow-hidden rounded-md';
const imageClassName = 'block size-full object-cover';
const iframeClassName = 'block size-full border-0';
const fillImageClassName = 'absolute inset-0 size-full object-cover';
const figureClassName = 'm-0';
const migrationFrameClassName = 'bg-muted';
const roundedFrameClassName = 'rounded-xl';

export const Image: Story = {
  render: (args) => (
    <AspectRatio {...args} className={containerClassName}>
      <img src={imageUrl} alt="Mountain landscape" className={imageClassName} />
    </AspectRatio>
  ),
};

export const EmbeddedContent: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={containerClassName}>
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Video embed"
        className={iframeClassName}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </AspectRatio>
  ),
};

export const ShadcnMigration: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={`${containerClassName} ${migrationFrameClassName}`}>
      <img src={imageUrl} alt="Mountain landscape" className={fillImageClassName} />
    </AspectRatio>
  ),
};

export const AsChild: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={containerClassName} asChild>
      <figure className={figureClassName}>
        <img src={imageUrl} alt="Mountain landscape" className={imageClassName} />
      </figure>
    </AspectRatio>
  ),
};

export const CustomRadius: Story = {
  render: () => (
    <AspectRatio ratio={16 / 9} className={`${containerClassName} ${roundedFrameClassName}`}>
      <img src={imageUrl} alt="Mountain landscape" className={imageClassName} />
    </AspectRatio>
  ),
};