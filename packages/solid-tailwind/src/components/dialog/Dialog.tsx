import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
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
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
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

function DialogContent(props: DialogContentProps) {
  const [local, others] = splitProps(props, ['class', 'placement', 'scrollBehavior', 'size']);

  return (
    <DialogPrimitive.Content
      class={cn(
        dialogContentVariants({
          size: local.size,
          placement: local.placement,
          scrollBehavior: local.scrollBehavior,
        }),
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

function DialogPanel(props: DialogContentProps) {
  return (
    <>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent {...props} />
      </DialogPositioner>
    </>
  );
}

function DialogTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      class={cn('text-lg font-semibold', local.class)}
      {...others}
      data-slot="dialog-title"
    />
  );
}

function DialogDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      class={cn('text-base text-muted-foreground', local.class)}
      {...others}
      data-slot="dialog-description"
    />
  );
}

function DialogCloseTrigger(props: ComponentProps<typeof DialogPrimitive.CloseTrigger>) {
  return <DialogPrimitive.CloseTrigger {...props} data-slot="dialog-close-trigger" />;
}

function DialogCloseIcon(props: DialogCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'children', 'class']);

  return (
    <DialogPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="dialog-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeDialog}
          class={cn(
            'absolute end-4 top-4 z-2 rounded-md not-data-disabled:hover:bg-accent not-data-disabled:hover:text-popover-foreground',
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

  return <ark.div class={cn('grid gap-1', local.class)} {...others} data-slot="dialog-header" />;
}

function DialogBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={cn('mt-4 text-base', local.class)} {...others} data-slot="dialog-body" />;
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
} from '@ark-ui/solid/dialog';