<script lang="ts">
  import { insideScrollSections } from '../data/insideScrollSections';
  import styles from './ScrollArea.stories.module.css';
</script>

<div class={styles.textContent}>
  {#each insideScrollSections as item (item.title)}
    <section>
      <h3>{item.title}</h3>
      <p class={styles.paragraph}>{item.body}</p>
    </section>
  {/each}
</div>