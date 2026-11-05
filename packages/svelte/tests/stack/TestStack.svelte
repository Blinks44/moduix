<script lang="ts">
  import { Stack, type StackRootProps } from '@/components/stack';

  let {
    asChild: useAsChild = false,
    ref = $bindable(null),
    ...props
  }: Omit<StackRootProps, 'asChild'> & { asChild?: boolean } = $props();

  export const getRef = () => ref;
</script>

{#if useAsChild}
  <Stack {...props} bind:ref>
    {#snippet asChild(hostProps)}
      <section {...hostProps()}>Content</section>
    {/snippet}
  </Stack>
{:else}
  <Stack {...props} bind:ref><section>Content</section></Stack>
{/if}