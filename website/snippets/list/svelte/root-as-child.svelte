<script lang="ts">
  import { List, ListItem } from '@moduix/svelte/list';
</script>

<List>
  {#snippet asChild(props)}
    <ul {...props()} aria-label="Release tasks">
      <ListItem>Prepare the release notes.</ListItem>
      <ListItem>Publish the package.</ListItem>
      <ListItem>Announce the release.</ListItem>
    </ul>
  {/snippet}
</List>