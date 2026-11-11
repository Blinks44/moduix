<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { AspectRatio } from '@/components/aspect-ratio';

  const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
  const containerClassName = 'w-[480px] overflow-hidden rounded-md';
  const imageClassName = 'block size-full object-cover';
  const iframeClassName = 'block size-full border-0';
  const fillImageClassName = 'absolute inset-0 size-full object-cover';
  const figureClassName = 'm-0';
  const migrationFrameClassName = 'bg-muted';
  const roundedFrameClassName = 'rounded-xl';

  const { Story } = defineMeta({
    title: 'Components/AspectRatio',
    component: AspectRatio,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Image" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={containerClassName}>
    <img src={imageUrl} alt="Mountain landscape" class={imageClassName} />
  </AspectRatio>
</Story>

<Story name="Embedded Content" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={containerClassName}>
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="Video embed"
      class={iframeClassName}
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </AspectRatio>
</Story>

<Story name="Shadcn Migration" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={[containerClassName, migrationFrameClassName]}>
    <img src={imageUrl} alt="Mountain landscape" class={fillImageClassName} />
  </AspectRatio>
</Story>

<Story name="As Child" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={containerClassName}
    >{#snippet asChild(props)}<figure {...props({ class: figureClassName })}>
        <img src={imageUrl} alt="Mountain landscape" class={imageClassName} />
      </figure>{/snippet}</AspectRatio
  >
</Story>

<Story name="Custom Radius" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={[containerClassName, roundedFrameClassName]}>
    <img src={imageUrl} alt="Mountain landscape" class={imageClassName} />
  </AspectRatio>
</Story>