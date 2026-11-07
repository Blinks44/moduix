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
  import { clsx } from 'clsx';
  import { setSignaturePadReadOnly } from './context';
  import styles from './SignaturePad.module.css';

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
  class={clsx(styles.root, className)}
  data-slot="signature-pad-root-provider"
/>