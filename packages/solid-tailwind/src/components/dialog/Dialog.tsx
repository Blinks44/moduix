import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
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
type DialogCloseIconProps = Omit<ComponentProps<typeof DialogPrimitive.CloseTrigger>, 'asChild'>;

function DialogRoot(props: DialogRootProps) {
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DialogPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="dialog-trigger"
    />
  );
}

function DialogBackdrop(props: ComponentProps<typeof DialogPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DialogPrimitive.Backdrop
        class={cn(
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:animate-none',
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
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] grid [scrollbar-gutter:stable_both-edges] place-items-center overflow-y-auto overscroll-contain p-4',
          local.class,
        )}
        {...others}
        data-slot="dialog-positioner"
      />
    </OverlayPortal>
  );
}

function DialogContent(props: ComponentProps<typeof DialogPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Content
      class={cn(
        "relative max-h-[calc(100dvh-2rem)] w-[min(28rem,calc(100vw-2rem))] max-w-full origin-top rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-0 transition-[scale,translate] duration-200 ease-in-out after:pointer-events-none after:absolute after:inset-0 after:z-1 after:rounded-[inherit] after:bg-black/5 after:opacity-0 after:transition-opacity after:duration-200 after:ease-in-out after:content-[''] data-[has-nested]:[translate:0_calc(2.5rem*var(--nested-layer-count,0))] data-[has-nested]:[scale:calc(1-0.05*var(--nested-layer-count,0))] data-[has-nested]:after:opacity-100 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none motion-reduce:transition-none",
        local.class,
      )}
      {...others}
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DialogPrimitive.CloseTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="dialog-close-trigger"
    />
  );
}

function DialogCloseIcon(props: DialogCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <DialogPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="dialog-close-icon"
          aria-label={local['aria-label'] ?? DEFAULT_CLOSE_BUTTON_LABEL}
          aria-labelledby={local['aria-labelledby']}
          class={cn(
            'absolute end-4 top-4 z-2 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
            local.class,
          )}
        >
          {resolvedChildren()}
        </CloseButton.Root>
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

  return (
    <ark.div
      class={cn('mt-4 text-md text-muted-foreground', local.class)}
      {...others}
      data-slot="dialog-body"
    />
  );
}

function DialogFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('mt-6 flex justify-end gap-2', local.class)}
      {...others}
      data-slot="dialog-footer"
    />
  );
}

const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  RootProvider: DialogRootProvider,
  Context: DialogPrimitive.Context,
  Trigger: DialogTrigger,
  Backdrop: DialogBackdrop,
  Positioner: DialogPositioner,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  CloseTrigger: DialogCloseTrigger,
  CloseIcon: DialogCloseIcon,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

export { Dialog, useDialog, useDialogContext };
export type { DialogRootProps, DialogRootProviderProps };