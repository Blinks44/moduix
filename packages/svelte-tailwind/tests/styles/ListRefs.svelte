<script lang="ts">
  import { List, ListItem } from '@/components/list';

  let rootRef: Element | null = $state(null);
  let itemRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, itemRef });
</script>

<List bind:ref={rootRef} data-testid="list" data-probe="root" class="consumer-class">
  <ListItem bind:ref={itemRef}>Keep the item ref on its semantic host.</ListItem>
</List>