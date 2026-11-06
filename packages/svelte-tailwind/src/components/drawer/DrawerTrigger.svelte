<script lang="ts">
  import { DrawerTrigger, type DrawerTriggerProps } from '@ark-ui/svelte/drawer';

  let { class: className, ref = $bindable(null), ...props }: DrawerTriggerProps = $props();
</script>

<DrawerTrigger {...props} bind:ref class={className} data-slot="drawer-trigger" />