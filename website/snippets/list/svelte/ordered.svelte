<script lang="ts">
  import { List, ListItem } from '@moduix/svelte/list';
</script>

<List as="ol" start={3}>
  <ListItem>Prepare the release notes.</ListItem>
  <ListItem>Publish the package.</ListItem>
  <ListItem>Announce the release.</ListItem>
</List>