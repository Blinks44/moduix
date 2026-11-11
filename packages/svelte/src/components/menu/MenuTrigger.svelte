<script lang="ts">
  import { MenuTrigger, type MenuTriggerProps } from '@ark-ui/svelte/menu';

  let { class: className, ref = $bindable(null), ...props }: MenuTriggerProps = $props();
</script>

<MenuTrigger {...props} bind:ref class={className} data-slot="menu-trigger" />