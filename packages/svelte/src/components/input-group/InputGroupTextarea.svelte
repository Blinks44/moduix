<script module lang="ts">
  import type { TextareaRootProps } from '../textarea/Textarea.svelte';

  export interface InputGroupTextareaProps extends TextareaRootProps {}
</script>

<script lang="ts">
  import { clsx } from 'clsx';
  import Textarea from '../textarea/Textarea.svelte';
  import { useInputGroupSize } from './context';
  import styles from './InputGroup.module.css';

  let {
    class: className,
    ref = $bindable(null),
    size,
    value = $bindable(),
    ...props
  }: InputGroupTextareaProps = $props();

  const groupSize = useInputGroupSize();
  const textareaSize = $derived(size ?? groupSize());
</script>

<Textarea
  {...props}
  bind:ref
  bind:value
  class={clsx(styles.textarea, className)}
  size={textareaSize}
/>