<script module lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  export interface RatingGroupItemIndicatorProps extends HTMLAttributes<HTMLSpanElement> {}
</script>

<script lang="ts">
  import { useRatingGroupItemContext } from '@ark-ui/svelte/rating-group';
  import { clsx } from 'clsx';
  import { RatingStarIcon } from '@/lib/moduix/icons/ui';
  import styles from './RatingGroup.module.css';

  let { children, class: className, ...props }: RatingGroupItemIndicatorProps = $props();
  const item = useRatingGroupItemContext();
</script>

<span
  {...props}
  class={clsx(styles.itemIndicator, className)}
  data-half={item().half ? '' : undefined}
  data-highlighted={item().highlighted ? '' : undefined}
  data-slot="rating-group-item-indicator"
>
  {#if children}
    {@render children()}
  {:else}
    <RatingStarIcon class={styles.iconBg} data-slot="rating-group-item-indicator-bg" />
    <RatingStarIcon class={styles.iconFg} data-slot="rating-group-item-indicator-fg" />
  {/if}
</span>