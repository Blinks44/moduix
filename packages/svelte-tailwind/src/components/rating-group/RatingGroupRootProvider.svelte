<script module lang="ts">
  import type { RatingGroupRootProviderProps as ArkRatingGroupRootProviderProps } from '@ark-ui/svelte/rating-group';
  import type { RatingGroupSize } from './RatingGroup.svelte';

  export interface RatingGroupRootProviderProps extends ArkRatingGroupRootProviderProps {
    size?: RatingGroupSize;
  }
</script>

<script lang="ts">
  import { RatingGroupRootProvider } from '@ark-ui/svelte/rating-group';
  import { cn } from '@/lib/moduix/cn';

  const rootClass = 'group/rating-group inline-flex flex-col gap-1';

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
  class={cn(rootClass, className)}
  data-size={size}
  data-slot="rating-group-root-provider"
/>