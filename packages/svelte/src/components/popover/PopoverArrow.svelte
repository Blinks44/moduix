<script lang="ts">
  import { PopoverArrow, type PopoverArrowProps } from '@ark-ui/svelte/popover';
  import { clsx } from 'clsx';
  import styles from './Popover.module.css';
  import PopoverArrowTip from './PopoverArrowTip.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: PopoverArrowProps = $props();
</script>

<PopoverArrow {...props} bind:ref class={clsx(styles.arrow, className)} data-slot="popover-arrow">
  {#if children}
    {@render children()}
  {:else}
    <PopoverArrowTip />
  {/if}
</PopoverArrow>