<script module lang="ts">
  import type { ButtonRootProps } from '../button/Button.svelte';

  export interface InputGroupButtonProps extends ButtonRootProps {}
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import Button from '../button/Button.svelte';
  import { useInputGroupSize } from './context';
  import styles from './InputGroup.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size,
    type = 'button',
    variant = 'ghost',
    ...props
  }: InputGroupButtonProps = $props();

  const groupSize = useInputGroupSize();
  const buttonSize = $derived(size ?? groupSize());
</script>

<Button
  {...props}
  bind:ref
  class={clsx(styles.button, className)}
  size={buttonSize}
  {type}
  {variant}
  data-slot="input-group-button"
/>