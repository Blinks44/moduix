<script lang="ts">
  import { MenuContextTrigger, type MenuContextTriggerProps } from '@ark-ui/svelte/menu';

  let { class: className, ref = $bindable(null), ...props }: MenuContextTriggerProps = $props();
</script>

<MenuContextTrigger {...props} bind:ref class={className} data-slot="menu-context-trigger" />