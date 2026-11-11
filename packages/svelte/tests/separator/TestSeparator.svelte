<script lang="ts">
  import { Separator, type SeparatorRootProps } from '@/components/separator';

  let { ref = $bindable(null), ...props }: Omit<SeparatorRootProps, 'asChild'> = $props();

  export const getRef = () => ref;
</script>

<Separator {...props} bind:ref />