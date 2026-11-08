<script lang="ts">
  import { Typeset } from '@moduix/svelte/typeset';
  import styles from '@/components/examples/typeset/typeset-reading-rhythm.module.css';
</script>

<Typeset class={styles.root}>
  {#snippet asChild(props)}
    <article {...props()}>
      <h2>Reading mode</h2>
      <p>A roomier preset can make long-form content more comfortable without adding props.</p>
      <p>Use a class to keep the page and its layout in control of the rhythm.</p>
    </article>
  {/snippet}
</Typeset>