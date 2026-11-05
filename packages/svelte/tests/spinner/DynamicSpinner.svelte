<script lang="ts">
  import { Spinner, type SpinnerRootProps } from '@/components/spinner';

  let {
    asChild: useAsChild = false,
    ref = $bindable(null),
    ...props
  }: Omit<SpinnerRootProps, 'asChild'> & { asChild?: boolean } = $props();

  export const getRef = () => ref;
</script>

<span id="progress-label">Uploading</span>
{#if useAsChild}
  <Spinner {...props} bind:ref>
    {#snippet asChild(hostProps)}
      <span {...hostProps()}></span>
    {/snippet}
  </Spinner>
{:else}
  <Spinner {...props} bind:ref />
{/if}