<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
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
  } from '@/lib/moduix/icons/ui';
  import CropperCanvas from './CropperCanvas.svelte';

  const { Story } = defineMeta({
    title: 'Components/ImageCropper',
    component: ImageCropper,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const stackClassName = 'grid w-[min(32rem,calc(100vw-2rem))] gap-3';
  const toolbarClassName =
    'inline-flex w-fit flex-wrap items-center gap-1 rounded-lg border border-border bg-muted p-1';
  const buttonClassName =
    'inline-flex min-h-8 cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent bg-transparent px-3 text-muted-foreground [font:inherit] transition-[border-color,background-color,box-shadow,color] duration-normal ease-in-out hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring';
  const iconButtonClassName = 'size-8 px-0 [&_svg]:size-4';
  const outputClassName = 'text-xs leading-4 text-muted-foreground';
  const previewClassName =
    'grid size-32 place-items-center overflow-hidden rounded-md border border-border bg-muted [&>img]:size-full [&>img]:object-cover';
  const customSelectionClassName =
    'border-destructive shadow-[0_0_0_9999px_rgb(15_23_42_/_55%),inset_0_0_0_1px_rgb(255_255_255_/_64%)]';

  const sampleImage =
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=640&h=400&q=90';
</script>

<script lang="ts">
  let zoom = $state(1);
  let preview = $state<string | null>(null);
  const providerCropper = useImageCropper({
    id: 'image-cropper-root-provider',
    aspectRatio: 16 / 9,
  });
  const previewCropper = useImageCropper({
    id: 'image-cropper-crop-preview',
    cropShape: 'circle',
    aspectRatio: 1,
  });

  const handleCrop = async () => {
    const result = await previewCropper().getCroppedImage({ output: 'dataUrl' });
    if (typeof result === 'string') preview = result;
  };
</script>

<Story name="Basic" asChild>
  <CropperCanvas />
</Story>

<Story name="Aspect Ratio" exportName="AspectRatio" asChild>
  <CropperCanvas aspectRatio={1} cropShape="circle" />
</Story>

<Story name="Fixed Crop Area" exportName="FixedCropArea" asChild>
  <CropperCanvas
    fixedCropArea
    cropShape="circle"
    aspectRatio={1}
    initialCrop={{ x: 112, y: 64, width: 220, height: 220 }}
  />
</Story>

<Story name="Controlled Zoom" exportName="ControlledZoom" asChild>
  <div class={stackClassName}>
    <div class={toolbarClassName}>
      <button
        class={cn(buttonClassName, iconButtonClassName)}
        type="button"
        aria-label="Zoom out"
        onclick={() => (zoom = Math.max(0.5, zoom - 0.1))}><ZoomOutIcon /></button
      >
      <output class={outputClassName}>{zoom.toFixed(1)}x</output>
      <button
        class={cn(buttonClassName, iconButtonClassName)}
        type="button"
        aria-label="Zoom in"
        onclick={() => (zoom = Math.min(3, zoom + 0.1))}><ZoomInIcon /></button
      >
    </div>
    <CropperCanvas bind:zoom minZoom={0.5} maxZoom={3} />
  </div>
</Story>

<Story name="Transform Controls" exportName="TransformControls" asChild>
  <div class={stackClassName}>
    <ImageCropper>
      <ImageCropperContext>
        {#snippet render(context)}
          <div class={toolbarClassName}>
            <button
              class={cn(buttonClassName, iconButtonClassName)}
              type="button"
              aria-label="Zoom out"
              onclick={() => context().zoomBy(-0.1)}><ZoomOutIcon /></button
            >
            <button
              class={cn(buttonClassName, iconButtonClassName)}
              type="button"
              aria-label="Zoom in"
              onclick={() => context().zoomBy(0.1)}><ZoomInIcon /></button
            >
            <button
              class={cn(buttonClassName, iconButtonClassName)}
              type="button"
              aria-label="Rotate counterclockwise"
              onclick={() => context().rotateBy(-90)}><RotateCcwIcon /></button
            >
            <button
              class={cn(buttonClassName, iconButtonClassName)}
              type="button"
              aria-label="Rotate clockwise"
              onclick={() => context().rotateBy(90)}><RotateCwIcon /></button
            >
            <button
              class={cn(buttonClassName, iconButtonClassName)}
              type="button"
              aria-label="Flip horizontally"
              onclick={() => context().flipHorizontally()}><FlipHorizontalIcon /></button
            >
            <button
              class={cn(buttonClassName, iconButtonClassName)}
              type="button"
              aria-label="Reset crop"
              onclick={() => context().reset()}><RestartIcon /></button
            >
          </div>
        {/snippet}
      </ImageCropperContext>
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} crossorigin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropper>
  </div>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={stackClassName}>
    <ImageCropperRootProvider value={providerCropper}>
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} crossorigin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
    <button
      class={cn(buttonClassName, iconButtonClassName)}
      type="button"
      aria-label="Reset crop"
      onclick={() => providerCropper().reset()}><RestartIcon /></button
    >
  </div>
</Story>

<Story name="Crop Preview" exportName="CropPreview" asChild>
  <div class={stackClassName}>
    <ImageCropperRootProvider value={previewCropper}>
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} crossorigin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
    <Button type="button" onclick={handleCrop}>Crop image</Button>
    <div class={previewClassName}>
      {#if preview}<img src={preview} alt="" />{/if}
    </div>
  </div>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <CropperCanvas
    cropAreaClassName={customSelectionClassName}
    initialCrop={{ x: 80, y: 60, width: 240, height: 180 }}
  />
</Story>