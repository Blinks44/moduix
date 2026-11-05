<script lang="ts">
  import { Skeleton, type SkeletonRootProps } from '@/components/skeleton';

  let {
    asChild: useAsChild = false,
    label = 'Profile',
    ref = $bindable(null),
    ...props
  }: Omit<SkeletonRootProps, 'asChild'> & { asChild?: boolean; label?: string } = $props();

  export const getRef = () => ref;
</script>

{#if useAsChild}
  <Skeleton {...props} bind:ref>
    {#snippet asChild(hostProps)}
      <section {...hostProps()} aria-label="Profile" data-testid="profile">
        <strong>Ada Lovelace</strong>
      </section>
    {/snippet}
  </Skeleton>
{:else}
  <Skeleton {...props} bind:ref><span>{label}</span></Skeleton>
{/if}