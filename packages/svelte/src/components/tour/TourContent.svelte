<script lang="ts">
  import { TourContent, type TourContentProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourContentProps = $props();
</script>

<TourContent {...props} bind:ref class={clsx(styles.content, className)} data-slot="tour-content" />