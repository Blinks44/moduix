<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type TypesetScrollProps = HTMLProps<'div'> & PolymorphicProps<'div'> & RefAttribute;
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Typeset.module.css';
  let {
    class: className,
    ref = $bindable(null),
    role,
    tabindex = 0,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    ...props
  }: TypesetScrollProps = $props();

  const resolvedRole = $derived(role ?? (ariaLabel || ariaLabelledby ? 'region' : undefined));
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  aria-label={ariaLabel}
  aria-labelledby={ariaLabelledby}
  class={clsx(styles.scroll, className)}
  role={resolvedRole}
  {tabindex}
  data-scope="typeset"
  data-part="scroll"
  data-slot="typeset-scroll"
/>