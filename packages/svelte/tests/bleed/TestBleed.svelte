<script lang="ts">
  import { Bleed, type BleedRootProps } from '@/components/bleed';

  let { ref = $bindable(null), ...props }: Omit<BleedRootProps, 'asChild'> = $props();

  export const getRef = () => ref;
</script>

<Bleed {...props} bind:ref />