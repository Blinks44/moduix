<script lang="ts">
  import { TourControl, type TourControlProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourControlProps = $props();
</script>

<TourControl {...props} bind:ref class={clsx(styles.control, className)} data-slot="tour-control" />