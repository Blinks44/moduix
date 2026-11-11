<script lang="ts">
  import { TourArrow, type TourArrowProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';
  import TourArrowTip from './TourArrowTip.svelte';

  let { children, class: className, ref = $bindable(null), ...props }: TourArrowProps = $props();
</script>

<TourArrow {...props} bind:ref class={clsx(styles.arrow, className)} data-slot="tour-arrow">
  {#if children}
    {@render children()}
  {:else}
    <TourArrowTip />
  {/if}
</TourArrow>