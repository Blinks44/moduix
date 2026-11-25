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
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const dialogContentVariants = cva(
    [
      'moduix-dialog-nested relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-w-full origin-top',
      'rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-0',
      'transition-[scale,translate] duration-normal ease-in-out motion-reduce:transition-none',
      'data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
      '[&:has([data-slot=dialog-close-icon])_[data-slot=dialog-title]]:pe-7',
    ],
    {
      variants: {
        size: {
          sm: 'w-[min(24rem,calc(100vw-var(--moduix-spacing-8)))]',
          md: 'w-[min(28rem,calc(100vw-var(--moduix-spacing-8)))]',
          lg: 'w-[min(32rem,calc(100vw-var(--moduix-spacing-8)))]',
          xl: 'w-[min(36rem,calc(100vw-var(--moduix-spacing-8)))]',
          full: 'min-h-full w-full max-w-none rounded-none border-0',
        },
        placement: {
          center: '',
          top: 'self-start',
          bottom: 'self-end',
        },
        scrollBehavior: {
          outside: '',
          inside: [
            'flex max-h-[calc(100dvh-2*var(--moduix-spacing-4))] flex-col',
            '[&>[data-slot=dialog-body]]:min-h-0 [&>[data-slot=dialog-body]]:flex-auto [&>[data-slot=dialog-body]]:overflow-y-auto',
          ],
        },
      },
      compoundVariants: [
        {
          size: 'full',
          scrollBehavior: 'inside',
          className: 'max-h-dvh',
        },
      ],
      defaultVariants: {
        size: 'md',
        placement: 'center',
        scrollBehavior: 'outside',
      },
    },
  );

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
  class={cn(dialogContentVariants({ size, placement, scrollBehavior }), className)}
  data-size={size}
  data-placement={placement}
  data-scroll-behavior={scrollBehavior}
  data-slot="dialog-content"
/>