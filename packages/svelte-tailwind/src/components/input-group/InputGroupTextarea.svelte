<script module lang="ts">
  import type { TextareaRootProps } from '../textarea/Textarea.svelte';

  export interface InputGroupTextareaProps extends TextareaRootProps {}
</script>

<script lang="ts">
  import { cn } from '@/lib/moduix/cn';
  import Textarea from '../textarea/Textarea.svelte';
  import { useInputGroupSize } from './context';
  import { inputGroupTextareaVariants } from './variants';

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
  class={cn(inputGroupTextareaVariants({ size: textareaSize }), className)}
  size={textareaSize}
/>