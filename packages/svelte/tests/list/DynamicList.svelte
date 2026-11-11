<script lang="ts">
  import { List, type ListRootProps } from '@/components/list';

  let {
    asChild: useAsChild = false,
    label = 'Content',
    ref = $bindable(null),
    ...props
  }: Omit<ListRootProps, 'asChild'> & { asChild?: boolean; label?: string } = $props();

  export const getRef = () => ref;
</script>

{#if useAsChild}
  <List {...props} bind:ref>
    {#snippet asChild(hostProps)}
      <ul {...hostProps()}><li>{label}</li></ul>
    {/snippet}
  </List>
{:else}
  <List {...props} bind:ref>{label}</List>
{/if}