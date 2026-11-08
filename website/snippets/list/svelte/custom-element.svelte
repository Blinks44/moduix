<script lang="ts">
  import { List, ListItem } from '@moduix/svelte/list';
  import styles from '@/components/examples/list/list-custom-element.module.css';
</script>

<List>
  <ListItem>
    {#snippet asChild(props)}
      <li {...props()} class={styles.item}>Custom items can own their local styling.</li>
    {/snippet}
  </ListItem>
  <ListItem>
    {#snippet asChild(props)}
      <li {...props()} class={styles.item}>List still provides its spacing and marker contract.</li>
    {/snippet}
  </ListItem>
  <ListItem>
    {#snippet asChild(props)}
      <li {...props()} class={styles.item}>
        asChild keeps the semantic li contract for custom items.
      </li>
    {/snippet}
  </ListItem>
</List>