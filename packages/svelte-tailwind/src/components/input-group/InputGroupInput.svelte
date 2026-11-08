<script module lang="ts">
  import type { InputRootProps } from '../input/Input.svelte';

  export interface InputGroupInputProps extends InputRootProps {}
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import Input from '../input/Input.svelte';
  import { useInputGroupSize } from './context';
  import { inputGroupInputVariants } from './variants';

  let {
    class: className,
    ref = $bindable(null),
    size,
    value = $bindable(),
    ...props
  }: InputGroupInputProps = $props();

  const groupSize = useInputGroupSize();
  const inputSize = $derived(size ?? groupSize());
</script>

<Input
  {...props}
  bind:ref
  bind:value
  class={cn(inputGroupInputVariants({ size: inputSize }), className)}
  size={inputSize}
/>