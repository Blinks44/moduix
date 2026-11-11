<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import styles from './Carousel.stories.module.css';

  let {
    alt,
    class: className,
    src,
    style,
  }: { alt: string; class?: ClassValue; src: string; style?: string } = $props();
</script>

<figure class={[styles.slide, className]} {style}>
  <img {src} {alt} class={styles.image} />
</figure>