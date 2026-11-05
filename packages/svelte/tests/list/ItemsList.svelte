<script lang="ts">
  import { List, ListItem, type ListRootProps } from '@/components/list';

  let {
    onItemClick,
    ref = $bindable(null),
    ...props
  }: Omit<ListRootProps, 'asChild'> & { onItemClick?: () => void } = $props();

  export const getRef = () => ref;
</script>

<List {...props} bind:ref>
  <ListItem onclick={onItemClick}>Prepare the release notes.</ListItem>
</List>