<script lang="ts">
  import { TourDescription, type TourDescriptionProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourDescriptionProps = $props();
</script>

<TourDescription
  {...props}
  bind:ref
  class={clsx(styles.description, className)}
  data-slot="tour-description"
/>