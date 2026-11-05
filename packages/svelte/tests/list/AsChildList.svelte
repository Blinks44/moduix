<script lang="ts">
  import { List, ListItem } from '@/components/list';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<List bind:ref marker="none">
  {#snippet asChild(props)}
    <ul {...props()} aria-label="Release tasks">
      <ListItem>
        {#snippet asChild(itemProps)}
          <li {...itemProps()}>Publish the package.</li>
        {/snippet}
      </ListItem>
    </ul>
  {/snippet}
</List>