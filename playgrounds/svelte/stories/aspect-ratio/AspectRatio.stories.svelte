<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { AspectRatio } from '@/components/aspect-ratio';
  import styles from './AspectRatio.stories.module.css';

  const imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';

  const { Story } = defineMeta({
    title: 'Components/AspectRatio',
    component: AspectRatio,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Image" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={styles.container}>
    <img src={imageUrl} alt="Mountain landscape" class={styles.image} />
  </AspectRatio>
</Story>

<Story name="Embedded Content" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={styles.container}>
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="Video embed"
      class={styles.iframe}
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
  </AspectRatio>
</Story>

<Story name="Shadcn Migration" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={[styles.container, styles.migrationFrame]}>
    <img src={imageUrl} alt="Mountain landscape" class={styles.fillImage} />
  </AspectRatio>
</Story>

<Story name="As Child" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={styles.container}
    >{#snippet asChild(props)}<figure {...props({ class: styles.figure })}>
        <img src={imageUrl} alt="Mountain landscape" class={styles.image} />
      </figure>{/snippet}</AspectRatio
  >
</Story>

<Story name="Custom Radius" asChild>
  {@const args = { ratio: 16 / 9 }}

  <AspectRatio ratio={args.ratio} class={[styles.container, styles.roundedFrame]}>
    <img src={imageUrl} alt="Mountain landscape" class={styles.image} />
  </AspectRatio>
</Story>