<script lang="ts">
  import { RatingGroupItem, type RatingGroupItemProps } from '@ark-ui/svelte/rating-group';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    onpointerdown,
    ref = $bindable(null),
    ...props
  }: RatingGroupItemProps = $props();

  const handlePointerDown: NonNullable<RatingGroupItemProps['onpointerdown']> = (event) => {
    onpointerdown?.(event);
    if (event.button !== 0) return;
    const currentTarget = event.currentTarget;
    if (currentTarget.matches('[data-disabled], [data-readonly]')) return;
    currentTarget.focus({ preventScroll: true, focusVisible: false });
  };
</script>

<RatingGroupItem
  {...props}
  bind:ref
  class={cn(
    'inline-flex cursor-pointer rounded-sm outline-focus-inset outline-offset-focus-inset outline-transparent focus-visible:outline-focus-inset focus-visible:outline-offset-1 focus-visible:outline-ring data-disabled:cursor-default data-readonly:cursor-default',
    className,
  )}
  onpointerdown={handlePointerDown}
  data-slot="rating-group-item"
/>