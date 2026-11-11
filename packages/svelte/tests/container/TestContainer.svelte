<script lang="ts">
  import { Container, type ContainerRootProps } from '@/components/container';

  let { ref = $bindable(null), ...props }: Omit<ContainerRootProps, 'asChild'> = $props();

  export const getRef = () => ref;
</script>

<Container {...props} bind:ref />