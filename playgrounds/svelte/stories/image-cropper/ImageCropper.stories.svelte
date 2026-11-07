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
  import {
    FlipHorizontalIcon,
    RestartIcon,
    RotateCcwIcon,
    RotateCwIcon,
    ZoomInIcon,
    ZoomOutIcon,
  } from '@/lib/moduix/icons/ui';
  import CropperCanvas from './CropperCanvas.svelte';
  import styles from './ImageCropper.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/ImageCropper',
    component: ImageCropper,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

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
  <div class={styles.stack}>
    <div class={styles.toolbar}>
      <button
        class={[styles.button, styles.iconButton]}
        type="button"
        aria-label="Zoom out"
        onclick={() => (zoom = Math.max(0.5, zoom - 0.1))}><ZoomOutIcon /></button
      >
      <output class={styles.output}>{zoom.toFixed(1)}x</output>
      <button
        class={[styles.button, styles.iconButton]}
        type="button"
        aria-label="Zoom in"
        onclick={() => (zoom = Math.min(3, zoom + 0.1))}><ZoomInIcon /></button
      >
    </div>
    <CropperCanvas bind:zoom minZoom={0.5} maxZoom={3} />
  </div>
</Story>

<Story name="Transform Controls" exportName="TransformControls" asChild>
  <div class={styles.stack}>
    <ImageCropper>
      <ImageCropperContext>
        {#snippet render(context)}
          <div class={styles.toolbar}>
            <button
              class={[styles.button, styles.iconButton]}
              type="button"
              aria-label="Zoom out"
              onclick={() => context().zoomBy(-0.1)}><ZoomOutIcon /></button
            >
            <button
              class={[styles.button, styles.iconButton]}
              type="button"
              aria-label="Zoom in"
              onclick={() => context().zoomBy(0.1)}><ZoomInIcon /></button
            >
            <button
              class={[styles.button, styles.iconButton]}
              type="button"
              aria-label="Rotate counterclockwise"
              onclick={() => context().rotateBy(-90)}><RotateCcwIcon /></button
            >
            <button
              class={[styles.button, styles.iconButton]}
              type="button"
              aria-label="Rotate clockwise"
              onclick={() => context().rotateBy(90)}><RotateCwIcon /></button
            >
            <button
              class={[styles.button, styles.iconButton]}
              type="button"
              aria-label="Flip horizontally"
              onclick={() => context().flipHorizontally()}><FlipHorizontalIcon /></button
            >
            <button
              class={[styles.button, styles.iconButton]}
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
  <div class={styles.stack}>
    <ImageCropperRootProvider value={providerCropper}>
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} crossorigin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
    <button
      class={[styles.button, styles.iconButton]}
      type="button"
      aria-label="Reset crop"
      onclick={() => providerCropper().reset()}><RestartIcon /></button
    >
  </div>
</Story>

<Story name="Crop Preview" exportName="CropPreview" asChild>
  <div class={styles.stack}>
    <ImageCropperRootProvider value={previewCropper}>
      <ImageCropperViewport>
        <ImageCropperImage src={sampleImage} crossorigin="anonymous" />
        <ImageCropperCropArea />
      </ImageCropperViewport>
    </ImageCropperRootProvider>
    <Button type="button" onclick={handleCrop}>Crop image</Button>
    <div class={styles.preview}>
      {#if preview}<img src={preview} alt="" />{/if}
    </div>
  </div>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <CropperCanvas
    class={styles.customRoot}
    initialCrop={{ x: 80, y: 60, width: 240, height: 180 }}
  />
</Story>