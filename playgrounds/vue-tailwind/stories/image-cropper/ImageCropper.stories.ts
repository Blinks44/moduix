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
import { cn } from '@/lib/moduix/cn';
import {
  FlipHorizontalIcon,
  RestartIcon,
  RotateCcwIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@/lib/moduix/icons/ui/Icons';

const sampleImage =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
const stackClassName = 'grid w-[min(32rem,calc(100vw-2rem))] gap-3';
const toolbarClassName =
  'inline-flex w-fit flex-wrap items-center gap-1 rounded-lg border border-border bg-muted p-1';
const buttonClassName =
  'inline-flex min-h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent bg-transparent px-3 text-muted-foreground [font:inherit] transition-[border-color,background-color,box-shadow,color] duration-200 ease-in-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring';
const iconButtonClassName = 'size-8 px-0 [&_svg]:size-4';
const outputClassName = 'text-xs leading-4 text-muted-foreground';
const previewClassName =
  'grid size-32 place-items-center overflow-hidden rounded-md border border-border bg-muted [&>img]:size-full [&>img]:object-cover';
const customSelectionClassName =
  'border-destructive shadow-[0_0_0_9999px_rgb(15_23_42_/_55%),inset_0_0_0_1px_rgb(255_255_255_/_64%)]';

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
    cropAreaClassName: { type: String, default: undefined },
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
        <ImageCropperCropArea :class="cropAreaClassName" />
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
        return {
          buttonClassName,
          cn,
          customSelectionClassName,
          iconButtonClassName,
          outputClassName,
          previewClassName,
          sampleImage,
          stackClassName,
          toolbarClassName,
          ...setup?.(),
        };
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
      <div :class="stackClassName">
        <div :class="toolbarClassName">
          <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Zoom out" @click="zoom = Math.max(0.5, zoom - 0.1)"><ZoomOutIcon /></button>
          <output :class="outputClassName">{{ zoom.toFixed(1) }}x</output>
          <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Zoom in" @click="zoom = Math.min(3, zoom + 0.1)"><ZoomInIcon /></button>
        </div>
        <CropperCanvas v-model:zoom="zoom" :min-zoom="0.5" :max-zoom="3" />
      </div>
    `,
    () => ({ zoom: ref(1) }),
  ),
};

export const TransformControls: Story = {
  render: renderStory(`
    <div :class="stackClassName">
      <ImageCropper>
        <ImageCropperContext v-slot="context">
          <div :class="toolbarClassName">
            <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Zoom out" @click="context.zoomBy(-0.1)"><ZoomOutIcon /></button>
            <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Zoom in" @click="context.zoomBy(0.1)"><ZoomInIcon /></button>
            <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Rotate counterclockwise" @click="context.rotateBy(-90)"><RotateCcwIcon /></button>
            <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Rotate clockwise" @click="context.rotateBy(90)"><RotateCwIcon /></button>
            <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Flip horizontally" @click="context.flipHorizontally()"><FlipHorizontalIcon /></button>
            <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Reset crop" @click="context.reset()"><RestartIcon /></button>
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
      <div :class="stackClassName">
        <ImageCropperRootProvider :value="imageCropper">
          <ImageCropperViewport>
            <ImageCropperImage :src="sampleImage" crossorigin="anonymous" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropperRootProvider>
        <button :class="cn(buttonClassName, iconButtonClassName)" type="button" aria-label="Reset crop" @click="imageCropper.reset()"><RestartIcon /></button>
      </div>
    `,
    () => ({ imageCropper: useImageCropper({ aspectRatio: 16 / 9 }) }),
  ),
};

export const CropPreview: Story = {
  render: renderStory(
    `
      <div :class="stackClassName">
        <ImageCropperRootProvider :value="imageCropper">
          <ImageCropperViewport>
            <ImageCropperImage :src="sampleImage" crossorigin="anonymous" />
            <ImageCropperCropArea />
          </ImageCropperViewport>
        </ImageCropperRootProvider>
        <Button type="button" @click="handleCrop">Crop image</Button>
        <div :class="previewClassName"><img v-if="preview" :src="preview" alt="" /></div>
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
    '<CropperCanvas :crop-area-class-name="customSelectionClassName" :initial-crop="{ x: 80, y: 60, width: 240, height: 180 }" />',
  ),
};