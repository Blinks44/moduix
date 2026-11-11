<script lang="ts">
  import { SliderRoot, type SliderRootProps } from '@ark-ui/svelte/slider';
  import { clsx } from 'clsx';
  import styles from './Slider.module.css';

  let {
    class: className,
    readOnly,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: SliderRootProps = $props();
</script>

<SliderRoot
  {...props}
  bind:ref
  bind:value
  {readOnly}
  class={clsx(styles.root, className)}
  data-readonly={readOnly ? '' : undefined}
  data-slot="slider-root"
/>