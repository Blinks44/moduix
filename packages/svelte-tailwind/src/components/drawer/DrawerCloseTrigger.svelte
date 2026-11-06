<script lang="ts">
  import { DrawerCloseTrigger, type DrawerCloseTriggerProps } from '@ark-ui/svelte/drawer';

  let { class: className, ref = $bindable(null), ...props }: DrawerCloseTriggerProps = $props();
</script>

<DrawerCloseTrigger {...props} bind:ref class={className} data-slot="drawer-close-trigger" />