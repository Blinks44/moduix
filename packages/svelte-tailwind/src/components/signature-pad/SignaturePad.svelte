<script lang="ts">
  import { useFieldContext } from '@ark-ui/svelte/field';
  import { SignaturePadRoot, type SignaturePadRootProps } from '@ark-ui/svelte/signature-pad';
  import { cn } from '@/lib/moduix/cn';
  import { setSignaturePadReadOnly } from './context';

  let {
    class: className,
    paths = $bindable(),
    readOnly,
    ref = $bindable(null),
    ...props
  }: SignaturePadRootProps = $props();

  const field = useFieldContext();
  const resolvedReadOnly = $derived(readOnly ?? field?.()?.readOnly);

  setSignaturePadReadOnly(() => resolvedReadOnly);
</script>

<SignaturePadRoot
  {...props}
  bind:ref
  bind:paths
  class={cn(
    'inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-disabled',
    className,
  )}
  readOnly={resolvedReadOnly}
  data-slot="signature-pad-root"
/>