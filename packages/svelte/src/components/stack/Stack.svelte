<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type StackDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
  export type StackSpacing =
    | '0'
    | '0.5'
    | '1'
    | '1.5'
    | '2'
    | '2.5'
    | '3'
    | '3.5'
    | '4'
    | '4.5'
    | '5'
    | '6'
    | '7'
    | '8'
    | '10';

  export interface StackRootProps extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    direction?: StackDirection | { mobile?: StackDirection; desktop?: StackDirection };
    gap?: number | StackSpacing | (string & {});
    align?: string;
    justify?: string;
    wrap?: string;
    fill?: boolean;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Stack.module.css';

  let {
    align,
    class: className,
    direction,
    fill,
    gap,
    justify,
    ref = $bindable(null),
    style,
    wrap,
    ...props
  }: StackRootProps = $props();

  // A spacing step such as `'2'` or `'1.5'` reads `--moduix-spacing-*`, so presets rescale the gap;
  // numbers are pixels and other strings are CSS lengths.
  const toGap = (value: number | string) => {
    if (typeof value === 'number') return `${value}px`;
    return /^\d+(\.5)?$/.test(value) ? `var(--moduix-spacing-${value.replace('.', '-')})` : value;
  };

  const stackStyle = $derived.by(() => {
    const responsive = typeof direction === 'string' ? { mobile: direction } : direction;
    return (
      [
        responsive?.mobile ? `--_stack-direction:${responsive.mobile}` : undefined,
        responsive?.desktop ? `--_stack-direction-desktop:${responsive.desktop}` : undefined,
        gap != null ? `gap:${toGap(gap)}` : undefined,
        align ? `align-items:${align}` : undefined,
        justify ? `justify-content:${justify}` : undefined,
        wrap ? `flex-wrap:${wrap}` : undefined,
        style,
      ]
        .filter(Boolean)
        .join(';') || undefined
    );
  });
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={clsx(styles.root, fill && styles.fill, className)}
  style={stackStyle}
  data-scope="stack"
  data-part="root"
  data-slot="stack-root"
/>