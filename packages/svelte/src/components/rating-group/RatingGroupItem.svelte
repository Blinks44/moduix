<script lang="ts">
  import { RatingGroupItem, type RatingGroupItemProps } from '@ark-ui/svelte/rating-group';
  import { clsx } from 'clsx';
  import styles from './RatingGroup.module.css';

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
  class={clsx(styles.item, className)}
  onpointerdown={handlePointerDown}
  data-slot="rating-group-item"
/>