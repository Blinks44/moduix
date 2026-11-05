<script lang="ts">
  import { RatingGroupLabel, type RatingGroupLabelProps } from '@ark-ui/svelte/rating-group';
  import { clsx } from 'clsx';
  import styles from './RatingGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: RatingGroupLabelProps = $props();
</script>

<RatingGroupLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="rating-group-label"
/>