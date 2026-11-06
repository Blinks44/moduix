<script lang="ts">
  import { MenuArrow, type MenuArrowProps } from '@ark-ui/svelte/menu';
  import MenuArrowTip from './MenuArrowTip.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: MenuArrowProps = $props();
</script>

<MenuArrow {...props} bind:ref class={className} data-slot="menu-arrow">
  {#if children}
    {@render children()}
  {:else}
    <MenuArrowTip />
  {/if}
</MenuArrow>