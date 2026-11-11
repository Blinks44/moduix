<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type SeparatorOrientation = 'horizontal' | 'vertical';
  export type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg';
  export type SeparatorVariant = 'solid' | 'dashed' | 'dotted';

  export interface SeparatorRootProps
    extends HTMLProps<'span'>, PolymorphicProps<'span'>, RefAttribute {
    orientation?: SeparatorOrientation;
    size?: SeparatorSize;
    variant?: SeparatorVariant;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Separator.module.css';
  let {
    class: className,
    orientation = 'horizontal',
    ref = $bindable(null),
    role,
    size = 'sm',
    variant = 'solid',
    ...props
  }: SeparatorRootProps = $props();

  const resolvedRole = $derived(role ?? 'separator');
</script>

<Ark
  as="span"
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  role={resolvedRole}
  aria-orientation={resolvedRole === 'separator' ? orientation : undefined}
  data-scope="separator"
  data-part="root"
  data-slot="separator-root"
  data-orientation={orientation}
  data-size={size}
  data-variant={variant}
/>