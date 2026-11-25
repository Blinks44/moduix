'use client';

import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/react/dialog';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
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
>(function DialogTrigger(props, ref) {
  return <DialogPrimitive.Trigger ref={ref} {...props} data-slot="dialog-trigger" />;
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
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
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
          'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] grid [scrollbar-gutter:stable_both-edges] place-items-center-safe overflow-y-auto overscroll-contain p-4 has-[>[data-slot=dialog-content][data-size=full]]:p-0',
          className,
        )}
        {...props}
        data-slot="dialog-positioner"
      />
    </OverlayPortal>
  );
});

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

const DialogContent = forwardRef<ComponentRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  function DialogContent(
    { className, placement = 'center', scrollBehavior = 'outside', size = 'md', ...props },
    ref,
  ) {
    return (
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentVariants({ size, placement, scrollBehavior }), className)}
        {...props}
        data-size={size}
        data-placement={placement}
        data-scroll-behavior={scrollBehavior}
        data-slot="dialog-content"
      />
    );
  },
);

const DialogPanel = forwardRef<ComponentRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  function DialogPanel(props, ref) {
    return (
      <>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent ref={ref} {...props} />
        </DialogPositioner>
      </>
    );
  },
);

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentProps<typeof DialogPrimitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-lg font-semibold', className)}
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
      className={cn('text-base text-muted-foreground', className)}
      {...props}
      data-slot="dialog-description"
    />
  );
});

const DialogCloseTrigger = forwardRef<
  ComponentRef<typeof DialogPrimitive.CloseTrigger>,
  ComponentProps<typeof DialogPrimitive.CloseTrigger>
>(function DialogCloseTrigger(props, ref) {
  return <DialogPrimitive.CloseTrigger ref={ref} {...props} data-slot="dialog-close-trigger" />;
});

const DialogCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>
>(function DialogCloseIcon(
  { className, children, 'aria-label': ariaLabel = a11yLabels.closeDialog, ...props },
  ref,
) {
  return (
    <DialogPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="dialog-close-icon"
        aria-label={ariaLabel}
        className={cn(
          'absolute end-4 top-4 z-2 rounded-md not-data-disabled:hover:bg-accent not-data-disabled:hover:text-popover-foreground',
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
        className={cn('grid gap-1', className)}
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
        className={cn('mt-4 text-base', className)}
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
        className={cn('mt-6 flex flex-wrap justify-end gap-2', className)}
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
  DialogPanel,
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

export type {
  DialogBackdropProps,
  DialogCloseTriggerProps,
  DialogContextProps,
  DialogDescriptionProps,
  DialogFocusOutsideEvent,
  DialogInteractOutsideEvent,
  DialogOpenChangeDetails,
  DialogPointerDownOutsideEvent,
  DialogPositionerProps,
  DialogTitleProps,
  DialogTriggerProps,
  DialogTriggerValueChangeDetails,
  UseDialogContext,
  UseDialogProps,
  UseDialogReturn,
} from '@ark-ui/react/dialog';