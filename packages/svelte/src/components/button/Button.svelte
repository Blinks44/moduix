<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type ButtonVariant =
    | 'default'
    | 'outline'
    | 'secondary'
    | 'destructive'
    | 'destructive-outline'
    | 'ghost'
    | 'link';
  export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';

  export interface ButtonRootProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {
    'data-part'?: string;
    'data-scope'?: string;
    'data-slot'?: string;
    loading?: boolean;
    size?: ButtonSize;
    variant?: ButtonVariant;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Button.module.css';

  let {
    asChild,
    class: className,
    disabled = false,
    loading = false,
    onclickcapture,
    ref = $bindable(null),
    size = 'md',
    type,
    variant = 'default',
    'aria-busy': ariaBusy,
    'aria-disabled': ariaDisabled,
    'data-part': dataPart = 'root',
    'data-scope': dataScope = 'button',
    'data-slot': dataSlot = 'button-root',
    ...props
  }: ButtonRootProps = $props();

  const isDisabled = $derived(
    !!disabled || loading || ariaDisabled === true || ariaDisabled === 'true',
  );

  const handleClickCapture: ButtonRootProps['onclickcapture'] = (event) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onclickcapture?.(event);
  };
</script>

<Ark
  as="button"
  {...props}
  bind:ref
  {asChild}
  type={asChild ? type : (type ?? 'button')}
  disabled={asChild ? undefined : isDisabled}
  aria-busy={loading ? true : ariaBusy}
  aria-disabled={isDisabled ? true : ariaDisabled}
  onclickcapture={handleClickCapture}
  data-scope={dataScope}
  data-part={dataPart}
  data-slot={dataSlot}
  data-variant={variant}
  data-size={size}
  data-disabled={isDisabled ? '' : undefined}
  data-loading={loading ? '' : undefined}
  class={clsx(styles.root, className)}
/>