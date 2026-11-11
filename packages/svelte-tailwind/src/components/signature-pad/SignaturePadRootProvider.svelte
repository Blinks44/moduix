<script module lang="ts">
  import type {
    SignaturePadRootProviderProps as ArkSignaturePadRootProviderProps,
    UseSignaturePadReturn,
  } from '@ark-ui/svelte/signature-pad';

  export interface SignaturePadRootProviderProps extends Omit<
    ArkSignaturePadRootProviderProps,
    'value'
  > {
    value: () => ReturnType<UseSignaturePadReturn> & { readOnly?: boolean };
  }
</script>

<script lang="ts">
  import { SignaturePadRootProvider } from '@ark-ui/svelte/signature-pad';
  import { cn } from '@/lib/moduix/cn';
  import { setSignaturePadReadOnly } from './context';

  let {
    class: className,
    ref = $bindable(null),
    value,
    ...props
  }: SignaturePadRootProviderProps = $props();

  setSignaturePadReadOnly(() => value().readOnly);
</script>

<SignaturePadRootProvider
  {...props}
  bind:ref
  {value}
  class={cn(
    'inline-flex w-70 max-w-full flex-col gap-2 text-foreground data-disabled:opacity-disabled',
    className,
  )}
  data-slot="signature-pad-root-provider"
/>