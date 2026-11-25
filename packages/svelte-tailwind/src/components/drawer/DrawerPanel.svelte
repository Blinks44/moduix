<script lang="ts">
  import DrawerBackdrop from './DrawerBackdrop.svelte';
  import DrawerContent, { type DrawerContentProps } from './DrawerContent.svelte';
  import DrawerPositioner from './DrawerPositioner.svelte';

  let { ref = $bindable(null), ...props }: DrawerContentProps = $props();
</script>

<DrawerBackdrop />
<DrawerPositioner>
  <DrawerContent {...props} bind:ref />
</DrawerPositioner>