<script lang="ts">
  import { AspectRatio } from '@moduix/svelte/aspect-ratio';
  import styles from '@/components/examples/aspect-ratio/aspect-ratio-custom-element.module.css';

  const media = {
    ratio: 16 / 9,
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    alt: 'Mountain landscape',
  };
</script>

<AspectRatio ratio={media.ratio} class={styles.root}>
  {#snippet asChild(props)}
    <figure {...props({ class: styles.figure })}>
      <img src={media.src} alt={media.alt} class={styles.image} />
    </figure>
  {/snippet}
</AspectRatio>