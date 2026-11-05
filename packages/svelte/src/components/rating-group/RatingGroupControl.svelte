<script lang="ts">
  import { RatingGroupControl, type RatingGroupControlProps } from '@ark-ui/svelte/rating-group';
  import { clsx } from 'clsx';
  import styles from './RatingGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: RatingGroupControlProps = $props();
</script>

<RatingGroupControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  data-slot="rating-group-control"
/>