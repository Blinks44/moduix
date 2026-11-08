<script lang="ts">
  import { Bleed } from '@moduix/svelte/bleed';
  import styles from '@/components/examples/bleed/bleed-semantic-element.module.css';

  const caption = 'Full-width media with a constrained parent.';
</script>

<div class={styles.root}>
  <Bleed class={styles.figure}>
    {#snippet asChild(props)}
      <figure {...props()}>
        <div class={styles.media}></div>
        <p style="margin: 0">{caption}</p>
      </figure>
    {/snippet}
  </Bleed>
</div>