import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent } from 'vue';
import type { Component } from 'vue';
import { Image, ImageSource } from '@/components/image';

const mountainImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4';
const architectureImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72';
const portraitImage = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330';

const meta = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    src: mountainImage,
    alt: 'Mountain landscape',
    width: 800,
    height: 520,
    layout: 'constrained',
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = { Image, ImageSource } as Record<string, Component>;

function renderStory(template: string) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { architectureImage, mountainImage, portraitImage };
      },
      template,
    });
}

export const Basic: Story = {};

export const Fixed: Story = {
  render: renderStory(`
    <Image
      :src="portraitImage"
      alt="Team member in a sunlit workspace"
      layout="fixed"
      :width="192"
      :height="256"
    />
  `),
};

export const Priority: Story = {
  render: renderStory(`
    <Image
      :src="mountainImage"
      alt="Mountain landscape"
      :width="800"
      :height="520"
      priority
      background="auto"
    />
  `),
};

export const Unstyled: Story = {
  render: renderStory(`
    <div class="w-full max-w-lg">
      <Image
        :src="architectureImage"
        alt="Sunlit modern office interior"
        :width="800"
        :height="520"
        unstyled
        class="aspect-[4/3] w-full object-cover"
      />
    </div>
  `),
};

export const FullWidth: Story = {
  render: renderStory(`
    <div class="w-[min(46rem,calc(100vw-var(--moduix-spacing-8)))]">
      <Image
        :src="architectureImage"
        alt="Sunlit modern office interior"
        layout="fullWidth"
        :height="360"
      />
    </div>
  `),
};

export const ArtDirection: Story = {
  render: renderStory(`
    <picture class="block w-full max-w-lg">
      <ImageSource
        media="(min-width: 48rem)"
        type="image/avif"
        :src="architectureImage"
        :width="800"
        :height="520"
      />
      <ImageSource
        media="(min-width: 48rem)"
        :src="architectureImage"
        :width="800"
        :height="520"
      />
      <Image :src="portraitImage" alt="Team member in a sunlit workspace" :width="800" :height="520" />
    </picture>
  `),
};