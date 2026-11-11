<script lang="ts">
  import { Text, type TextRootProps } from '@/components/text';

  let {
    asChild: useAsChild = false,
    label = 'Content',
    ref = $bindable(null),
    ...props
  }: Omit<TextRootProps, 'asChild'> & { asChild?: boolean; label?: string } = $props();

  export const getRef = () => ref;
</script>

{#if useAsChild}
  <Text {...props} bind:ref>
    {#snippet asChild(hostProps)}
      <span {...hostProps()}>{label}</span>
    {/snippet}
  </Text>
{:else}
  <Text {...props} bind:ref>{label}</Text>
{/if}