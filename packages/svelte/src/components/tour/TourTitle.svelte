<script lang="ts">
  import { TourTitle, type TourTitleProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourTitleProps = $props();
</script>

<TourTitle {...props} bind:ref class={clsx(styles.title, className)} data-slot="tour-title" />