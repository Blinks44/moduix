<script module lang="ts">
  import type { RatingGroupRootProviderProps as ArkRatingGroupRootProviderProps } from '@ark-ui/svelte/rating-group';
  import type { RatingGroupSize } from './RatingGroup.svelte';

  export interface RatingGroupRootProviderProps extends ArkRatingGroupRootProviderProps {
    size?: RatingGroupSize;
  }
</script>

<script lang="ts">
  import { RatingGroupRootProvider } from '@ark-ui/svelte/rating-group';
  import { clsx } from 'clsx';
  import styles from './RatingGroup.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    ...props
  }: RatingGroupRootProviderProps = $props();
</script>

<RatingGroupRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-size={size}
  data-slot="rating-group-root-provider"
/>