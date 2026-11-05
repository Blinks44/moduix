<script module lang="ts">
  import type { DialogContentProps as ArkDialogContentProps } from '@ark-ui/svelte/dialog';

  export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
  export type DialogPlacement = 'center' | 'top' | 'bottom';
  export type DialogScrollBehavior = 'outside' | 'inside';

  export interface DialogContentProps extends ArkDialogContentProps {
    /** Width preset. `full` covers the viewport. */
    size?: DialogSize;
    /** Vertical position inside the positioner. */
    placement?: DialogPlacement;
    /** `outside` scrolls the positioner; `inside` caps the content and scrolls `DialogBody`. */
    scrollBehavior?: DialogScrollBehavior;
  }
</script>

<script lang="ts">
  import { DialogContent } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import styles from './Dialog.module.css';

  let {
    class: className,
    placement = 'center',
    ref = $bindable(null),
    scrollBehavior = 'outside',
    size = 'md',
    ...props
  }: DialogContentProps = $props();
</script>

<DialogContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-size={size}
  data-placement={placement}
  data-scroll-behavior={scrollBehavior}
  data-slot="dialog-content"
/>