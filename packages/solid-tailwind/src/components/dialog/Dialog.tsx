import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type DialogPlacement = 'center' | 'top' | 'bottom';
type DialogScrollBehavior = 'outside' | 'inside';
type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  /** Width preset. `full` covers the viewport. */
  size?: DialogSize;
  /** Vertical position inside the positioner. */
  placement?: DialogPlacement;
  /** `outside` scrolls the positioner; `inside` caps the content and scrolls `DialogBody`. */
  scrollBehavior?: DialogScrollBehavior;
};
type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root> & OverlayPortalProps;
type DialogRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;
type DialogCloseIconProps = Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>;

function Dialog(props: DialogRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DialogPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DialogPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function DialogRootProvider(props: DialogRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DialogPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DialogPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function DialogTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger {...props} data-slot="dialog-trigger" />;
}

function DialogBackdrop(props: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        class={cn(
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:[animation-delay:0ms] motion-reduce:data-[state]:[animation-duration:1ms]',
          local.class,
        )}
        {...others}
        data-slot="dialog-backdrop"
      />
    </OverlayPortal>
  );
}

function DialogPositioner(props: ComponentProps<typeof DialogPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        class={cn(
          'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] grid [scrollbar-gutter:stable_both-edges] place-items-center-safe overflow-y-auto overscroll-contain p-4 has-[>[data-slot=dialog-content][data-size=full]]:p-0',
          local.class,
        )}
        {...others}
        data-slot="dialog-positioner"
      />
    </OverlayPortal>
  );
}

function DialogContent(props: DialogContentProps) {
  const [local, others] = splitProps(props, ['class', 'placement', 'scrollBehavior', 'size']);

  return (
    <DialogPrimitive.Content
      class={cn(
        "relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] w-[min(28rem,calc(100vw-2rem))] max-w-full origin-top rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-0 transition-[scale,translate] duration-200 ease-in-out after:pointer-events-none after:absolute after:inset-0 after:z-1 after:rounded-[inherit] after:bg-black/5 after:opacity-0 after:transition-opacity after:duration-200 after:ease-in-out after:content-[''] data-[has-nested]:[translate:0_calc(2.5rem*var(--nested-layer-count,0))] data-[has-nested]:[scale:calc(1-0.05*var(--nested-layer-count,0))] data-[has-nested]:after:opacity-100 data-[placement=bottom]:self-end data-[placement=top]:self-start data-[scroll-behavior=inside]:flex data-[scroll-behavior=inside]:max-h-[calc(100dvh-2rem)] data-[scroll-behavior=inside]:flex-col data-[size=full]:min-h-full data-[size=full]:w-full data-[size=full]:max-w-none data-[size=full]:rounded-none data-[size=full]:border-0 data-[size=full]:data-[scroll-behavior=inside]:max-h-dvh data-[size=lg]:w-[min(32rem,calc(100vw-2rem))] data-[size=sm]:w-[min(24rem,calc(100vw-2rem))] data-[size=xl]:w-[min(36rem,calc(100vw-2rem))] data-[state=closed]:animate-moduix-dialog-content-out data-[state=open]:animate-moduix-dialog-content-in motion-reduce:transition-none motion-reduce:data-[state]:[animation-delay:0ms] motion-reduce:data-[state]:[animation-duration:1ms] [&:has([data-slot=dialog-close-icon])_[data-slot=dialog-title]]:pe-7 data-[scroll-behavior=inside]:[&>[data-slot=dialog-body]]:min-h-0 data-[scroll-behavior=inside]:[&>[data-slot=dialog-body]]:flex-auto data-[scroll-behavior=inside]:[&>[data-slot=dialog-body]]:overflow-y-auto",
        local.class,
      )}
      {...others}
      data-size={local.size ?? 'md'}
      data-placement={local.placement ?? 'center'}
      data-scroll-behavior={local.scrollBehavior ?? 'outside'}
      data-slot="dialog-content"
    />
  );
}

function DialogTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      class={cn('text-lg font-semibold text-popover-foreground', local.class)}
      {...others}
      data-slot="dialog-title"
    />
  );
}

function DialogDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      class={cn('text-md text-muted-foreground', local.class)}
      {...others}
      data-slot="dialog-description"
    />
  );
}

function DialogCloseTrigger(props: ComponentProps<typeof DialogPrimitive.CloseTrigger>) {
  return <DialogPrimitive.CloseTrigger {...props} data-slot="dialog-close-trigger" />;
}

function DialogCloseIcon(props: DialogCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);

  return (
    <DialogPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="dialog-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeDialog}
          aria-labelledby={local['aria-labelledby']}
          class={cn(
            'absolute end-4 top-4 z-2 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
            local.class,
          )}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
  );
}

function DialogHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='dialog-close-trigger']]:col-start-2 [&>[data-slot='dialog-close-trigger']]:justify-self-end [&>[data-slot='dialog-description']]:col-span-2 [&>[data-slot='dialog-title']]:col-start-1",
        local.class,
      )}
      {...others}
      data-slot="dialog-header"
    />
  );
}

function DialogBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={cn('mt-4 text-md', local.class)} {...others} data-slot="dialog-body" />;
}

function DialogFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('mt-6 flex flex-wrap justify-end gap-2', local.class)}
      {...others}
      data-slot="dialog-footer"
    />
  );
}

const DialogContext = DialogPrimitive.Context;

export {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogCloseIcon,
  DialogCloseTrigger,
  DialogContext,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRootProvider,
  DialogTitle,
  DialogTrigger,
  useDialog,
  useDialogContext,
};
export type {
  DialogContentProps,
  DialogPlacement,
  DialogRootProps,
  DialogRootProviderProps,
  DialogScrollBehavior,
  DialogSize,
};