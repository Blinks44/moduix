import { Dialog as DialogPrimitive, useDialog, useDialogContext } from '@ark-ui/solid/dialog';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Dialog.module.css';

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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DialogPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
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
        class={clsx(styles.backdrop, local.class)}
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
        class={clsx(styles.positioner, local.class)}
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
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="dialog-content"
    />
  );
}

function DialogTitle(props: ComponentProps<typeof DialogPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="dialog-title"
    />
  );
}

function DialogDescription(props: ComponentProps<typeof DialogPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DialogPrimitive.Description
      class={clsx(styles.description, local.class)}
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
      class={clsx(!local.asChild && styles.closeTrigger, local.class)}
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
        <CloseButton
          {...triggerProps()}
          data-slot="dialog-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeDialog}
          aria-labelledby={local['aria-labelledby']}
          class={clsx(styles.closeIcon, local.class)}
        >
          {resolvedChildren()}
        </CloseButton>
      )}
      {...others}
    />
  );
}

function DialogHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.header, local.class)} {...others} data-slot="dialog-header" />;
}

function DialogBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.body, local.class)} {...others} data-slot="dialog-body" />;
}

function DialogFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div class={clsx(styles.footer, local.class)} {...others} data-slot="dialog-footer" />;
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
export type { DialogRootProps, DialogRootProviderProps };