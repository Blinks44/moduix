<script lang="ts">
  import { AspectRatio } from '@moduix/svelte/aspect-ratio';
  import styles from '@/components/examples/aspect-ratio/aspect-ratio-embedded-content.module.css';

  const embed = {
    ratio: 16 / 9,
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'Video embed',
  };
</script>

<AspectRatio ratio={embed.ratio} class={styles.root}>
  <iframe
    src={embed.src}
    title={embed.title}
    class={styles.iframe}
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>
</AspectRatio>