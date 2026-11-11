<script lang="ts">
  import { AngleSliderControl, type AngleSliderControlProps } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

  let {
    class: className,
    onpointerdown,
    ref = $bindable(null),
    ...props
  }: AngleSliderControlProps = $props();

  const handlePointerDown: NonNullable<AngleSliderControlProps['onpointerdown']> = (event) => {
    onpointerdown?.(event);
    if (event.defaultPrevented || event.button !== 0) return;
    const currentTarget = event.currentTarget;
    if (currentTarget.matches('[data-disabled], [data-readonly]')) return;
    event.preventDefault();
    currentTarget
      .querySelector<HTMLElement>('[data-scope="angle-slider"][data-part="thumb"]')
      ?.focus({ preventScroll: true, focusVisible: false });
  };
</script>

<AngleSliderControl
  {...props}
  bind:ref
  class={clsx(styles.control, className)}
  onpointerdown={handlePointerDown}
  data-slot="angle-slider-control"
/>