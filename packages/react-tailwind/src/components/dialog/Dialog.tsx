'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close dialog';

type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root> & OverlayPortalProps;
type DialogRootProviderProps = ComponentProps<typeof DialogPrimitive.RootProvider> &
  OverlayPortalProps;

function Dialog({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: DialogRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

function DialogRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: DialogRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DialogPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const DialogTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.Trigger>,
  ComponentProps<typeof DialogPrimitive.Trigger>
>(function DialogTrigger({ asChild, className, ...props }, ref) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
      data-slot="dialog-trigger"
    />
  );
});

const DialogBackdrop = forwardRef<
  ComponentRef<typeof DialogPrimitive.Backdrop>,
  ComponentProps<typeof DialogPrimitive.Backdrop>
>(function DialogBackdrop({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        ref={ref}
        className={cn(
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:animate-none',
          className,
        )}
        {...props}
        data-slot="dialog-backdrop"
      />
    </OverlayPortal>
  );
});

const DialogPositioner = forwardRef<
  ComponentRef<typeof DialogPrimitive.Positioner>,
  ComponentProps<typeof DialogPrimitive.Positioner>
>(function DialogPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DialogPrimitive.Positioner
        ref={ref}
        className={cn(
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] grid [scrollbar-gutter:stable_both-edges] place-items-center overflow-y-auto overscroll-contain p-4',
          className,
        )}
        {...props}
        data-slot="dialog-positioner"
      />
    </OverlayPortal>
  );
});

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentProps<typeof DialogPrimitive.Content>
>(function DialogContent({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "relative max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100vw-2rem))] max-w-full origin-top rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-0 transition-[scale,translate] duration-200 ease-in-out after:pointer-events-none after:absolute after:inset-0 after:z-1 after:rounded-[inherit] after:bg-black/5 after:opacity-0 after:transition-opacity after:duration-200 after:ease-in-out after:content-[''] data-[has-nested]:[translate:0_calc(2.5rem*var(--nested-layer-count,0))] data-[has-nested]:[scale:calc(1-0.05*var(--nested-layer-count,0))] data-[has-nested]:after:opacity-100 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none motion-reduce:transition-none",
        className,
      )}
      {...props}
      data-slot="dialog-content"
    />
  );
});

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentProps<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-lg font-semibold text-popover-foreground', className)}
      {...props}
      data-slot="dialog-title"
    />
  );
});

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentProps<typeof DialogPrimitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('text-md text-muted-foreground', className)}
      {...props}
      data-slot="dialog-description"
    />
  );
});

const DialogCloseTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.CloseTrigger>,
  ComponentProps<typeof DialogPrimitive.CloseTrigger>
>(function DialogCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
      data-slot="dialog-close-trigger"
    />
  );
});

const DialogCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function DialogCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="dialog-close-icon"
        aria-label={ariaLabel}
        className={cn(
          'absolute end-4 top-4 z-2 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
          className,
        )}
      >
        {children}
      </CloseButton>
    </DialogPrimitive.CloseTrigger>
  );
});

const DialogHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DialogHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='dialog-close-trigger']]:col-start-2 [&>[data-slot='dialog-close-trigger']]:justify-self-end [&>[data-slot='dialog-description']]:col-span-2 [&>[data-slot='dialog-title']]:col-start-1",
          className,
        )}
        {...props}
        data-slot="dialog-header"
      />
    );
  },
);

const DialogBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DialogBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn('mt-4 text-md text-muted-foreground', className)}
        {...props}
        data-slot="dialog-body"
      />
    );
  },
);

const DialogFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DialogFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn('mt-6 flex justify-end gap-2', className)}
        {...props}
        data-slot="dialog-footer"
      />
    );
  },
);

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
export type { DialogRootProps, DialogRootProviderProps };