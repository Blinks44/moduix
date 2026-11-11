<script lang="ts">
  import { useFieldContext } from '@ark-ui/svelte/field';
  import { SignaturePadRoot, type SignaturePadRootProps } from '@ark-ui/svelte/signature-pad';
  import { clsx } from 'clsx';
  import { setSignaturePadReadOnly } from './context';
  import styles from './SignaturePad.module.css';

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
  class={clsx(styles.root, className)}
  readOnly={resolvedReadOnly}
  data-slot="signature-pad-root"
/>