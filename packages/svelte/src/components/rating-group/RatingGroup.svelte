<script module lang="ts">
  import type { RatingGroupRootProps as ArkRatingGroupRootProps } from '@ark-ui/svelte/rating-group';

  export type RatingGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface RatingGroupRootProps extends ArkRatingGroupRootProps {
    size?: RatingGroupSize;
  }
</script>

<script lang="ts">
  import { RatingGroupRoot } from '@ark-ui/svelte/rating-group';
  import { clsx } from 'clsx';
  import styles from './RatingGroup.module.css';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    size = 'md',
    ...props
  }: RatingGroupRootProps = $props();
</script>

<RatingGroupRoot
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="rating-group-root"
/>