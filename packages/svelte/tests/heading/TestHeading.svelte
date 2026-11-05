<script lang="ts">
  import { Heading, type HeadingRootProps } from '@/components/heading';

  let {
    asChild: useAsChild = false,
    hostTag = 'h2',
    label = 'Content',
    ref = $bindable(null),
    ...props
  }: Omit<HeadingRootProps, 'asChild'> & {
    asChild?: boolean;
    hostTag?: 'h2' | 'h3';
    label?: string;
  } = $props();

  export const getRef = () => ref;
</script>

{#if useAsChild}
  <Heading {...props} bind:ref>
    {#snippet asChild(hostProps)}
      <svelte:element this={hostTag} {...hostProps()}>{label}</svelte:element>
    {/snippet}
  </Heading>
{:else}
  <Heading {...props} bind:ref>{label}</Heading>
{/if}