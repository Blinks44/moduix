<script lang="ts">
  import { AspectRatio, type AspectRatioRootProps } from '@/components/aspect-ratio';

  let {
    ref = $bindable(null),
    tall = false,
    ...props
  }: Omit<AspectRatioRootProps, 'asChild'> & { tall?: boolean } = $props();

  export const getRef = () => ref;
</script>

<AspectRatio {...props} bind:ref>
  {#if tall}<div style="height: 400px"></div>{/if}
</AspectRatio>