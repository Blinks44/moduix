import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  useImageCropper,
} from '@/components/image-cropper';
import {
  FlipHorizontalIcon,
  RestartIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/lib/moduix/icons/ui/Icons';
import styles from './ImageCropper.stories.module.css';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';

const meta = {
  title: 'Components/ImageCropper',
  component: ImageCropper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ImageCropper>;

export default meta;

type Story = StoryObj<typeof meta>;

const cropperComponents = {
  Button,
  FlipHorizontalIcon,
  ImageCropper,
  ImageCropperContext,
  ImageCropperCropArea,
  ImageCropperImage,
  ImageCropperRootProvider,
  ImageCropperViewport,
  RestartIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
};

const CropperCanvas = defineComponent({
  components: cropperComponents,
  props: {
    aspectRatio: { type: Number, default: undefined },
    className: { type: String, default: undefined },
    cropShape: { type: String, default: undefined },
    fixedCropArea: Boolean,
    initialCrop: { type: Object, default: undefined },
    maxZoom: { type: Number, default: undefined },
    minZoom: { type: Number, default: undefined },
    zoom: { type: Number, default: undefined },
  },
  template: `
    <ImageCropper
      :aspect-ratio="aspectRatio"
      :class="className"
      :crop-shape="cropShape"
      :fixed-crop-area="fixedCropArea"
      :initial-crop="initialCrop"
      :max-zoom="maxZoom"
      :min-zoom="minZoom"
      :zoom="zoom"
      @zoom-change="$emit('zoom-change', $event)"
    >
      <ImageCropperViewport>
        <ImageCropperImage :src="sampleImage" crossorigin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  `,
  emits: ['zoom-change'],
  setup() {
    return { sampleImage };
  },
});

const storyComponents = { ...cropperComponents, CropperCanvas };

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { sampleImage, styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = { render: renderStory('<CropperCanvas />') };

export const AspectRatio: Story = {
  render: renderStory('<CropperCanvas :aspect-ratio="1" crop-shape="circle" />'),
};

export const FixedCropArea: Story = {
  render: renderStory(
    '<CropperCanvas fixed-crop-area crop-shape="circle" :aspect-ratio="1" :initial-crop="{ x: 112, y: 64, width: 220, height: 220 }" />',
  ),
};

export const ControlledZoom: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <div :class="styles.toolbar">
          <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Zoom out" @click="zoom = Math.max(0.5, zoom - 0.1)"><ZoomOutIcon /></button>
          <output :class="styles.output">{{ zoom.toFixed(1) }}x</output>
          <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Zoom in" @click="zoom = Math.min(3, zoom + 0.1)"><ZoomInIcon /></button>
        </div>
        <CropperCanvas v-model:zoom="zoom" :min-zoom="0.5" :max-zoom="3" />
      </div>
    `,
    () => ({ zoom: ref(1) }),
  ),
};

export const TransformControls: Story = {
  render: renderStory(`
    <div :class="styles.stack">
      <ImageCropper>
        <ImageCropperContext v-slot="context">
          <div :class="styles.toolbar">
            <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Zoom out" @click="context.zoomBy(-0.1)"><ZoomOutIcon /></button>
            <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Zoom in" @click="context.zoomBy(0.1)"><ZoomInIcon /></button>
            <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Rotate counterclockwise" @click="context.rotateBy(-90)"><RotateCcwIcon /></button>
            <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Rotate clockwise" @click="context.rotateBy(90)"><RotateCwIcon /></button>
            <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Flip horizontally" @click="context.flipHorizontally()"><FlipHorizontalIcon /></button>
            <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Reset crop" @click="context.reset()"><RestartIcon /></button>
          </div>
        </ImageCropperContext>
        <ImageCropperViewport>
          <ImageCropperImage :src="sampleImage" crossorigin="anonymous" />
          <ImageCropperCropArea />
        </ImageCropperViewport>
      </ImageCropper>
    </div>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <ImageCropperRootProvider :value="imageCropper">
          <ImageCropperViewport>
            <ImageCropperImage :src="sampleImage" crossorigin="anonymous" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropperRootProvider>
        <button :class="[styles.button, styles.iconButton]" type="button" aria-label="Reset crop" @click="imageCropper.reset()"><RestartIcon /></button>
      </div>
    `,
    () => ({ imageCropper: useImageCropper({ aspectRatio: 16 / 9 }) }),
  ),
};

export const CropPreview: Story = {
  render: renderStory(
    `
      <div :class="styles.stack">
        <ImageCropperRootProvider :value="imageCropper">
          <ImageCropperViewport>
            <ImageCropperImage :src="sampleImage" crossorigin="anonymous" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropperRootProvider>
        <Button type="button" @click="handleCrop">Crop image</Button>
        <div :class="styles.preview"><img v-if="preview" :src="preview" alt="" /></div>
      </div>
    `,
    () => {
      const imageCropper = useImageCropper({ cropShape: 'circle', aspectRatio: 1 });
      const preview = ref<string | null>(null);
      const handleCrop = async () => {
        const result = await imageCropper.value.getCroppedImage({ output: 'dataUrl' });
        if (typeof result === 'string') preview.value = result;
      };
      return { handleCrop, imageCropper, preview };
    },
  ),
};

export const CustomStyling: Story = {
  render: renderStory(
    '<CropperCanvas :class-name="styles.customRoot" :initial-crop="{ x: 80, y: 60, width: 240, height: 180 }" />',
  ),
};