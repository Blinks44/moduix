<script lang="ts">
  import { SimpleGrid, type SimpleGridRootProps } from '@/components/simple-grid';

  let {
    ref = $bindable(null),
    withChildren = false,
    ...props
  }: Omit<SimpleGridRootProps, 'asChild'> & { withChildren?: boolean } = $props();

  export const getRef = () => ref;
</script>

<SimpleGrid {...props} bind:ref>
  {#if withChildren}
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
  {/if}
</SimpleGrid>