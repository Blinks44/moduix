import {
  Toast as ToastPrimitive,
  Toaster as ToasterPrimitive,
  createToaster,
  useToastContext,
  type ToastOptions,
} from '@ark-ui/solid/toast';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import { children as resolveChildren, splitProps } from 'solid-js';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Toast.module.css';

const DEFAULT_CLOSE_TRIGGER_LABEL = 'Close toast';

type ToasterProps = Omit<ComponentProps<typeof ToasterPrimitive>, 'children'> &
  OverlayPortalProps & {
    children?: ComponentProps<typeof ToasterPrimitive>['children'];
  };

function Toaster(props: ToasterProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'portalRef', 'portalled']);

  return (
    <OverlayPortalProvider portalled={local.portalled ?? true} portalRef={local.portalRef}>
      <OverlayPortal>
        <ToasterPrimitive
          class={clsx(styles.toaster, local.class)}
          {...others}
          data-slot="toast-toaster"
          children={local.children ?? ((toast) => <DefaultToast toast={toast} />)}
        />
      </OverlayPortal>
    </OverlayPortalProvider>
  );
}

function DefaultToast(props: { toast: Accessor<ToastOptions> }) {
  const hasAction = () => props.toast().action != null;
  const actionLabel = () => props.toast().action?.label;

  return (
    <ToastRoot>
      {props.toast().title != null ? <ToastTitle /> : null}
      {props.toast().description != null ? <ToastDescription /> : null}
      {hasAction() ? <ToastActionTrigger>{actionLabel()}</ToastActionTrigger> : null}
      {props.toast().closable !== false ? <ToastCloseTrigger /> : null}
    </ToastRoot>
  );
}

function ToastRoot(props: ComponentProps<typeof ToastPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ToastPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="toast-root"
    />
  );
}

function ToastTitle(props: ComponentProps<typeof ToastPrimitive.Title>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);
  const toast = useToastContext();

  return (
    <ToastPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="toast-title"
    >
      {resolvedChildren() === undefined ? toast().title : resolvedChildren()}
    </ToastPrimitive.Title>
  );
}

function ToastDescription(props: ComponentProps<typeof ToastPrimitive.Description>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);
  const toast = useToastContext();

  return (
    <ToastPrimitive.Description
      class={clsx(styles.description, local.class)}
      {...others}
      data-slot="toast-description"
    >
      {resolvedChildren() === undefined ? toast().description : resolvedChildren()}
    </ToastPrimitive.Description>
  );
}

function ToastActionTrigger(props: ComponentProps<typeof ToastPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <ToastPrimitive.ActionTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.actionTrigger, local.class)}
      {...others}
      data-slot="toast-action-trigger"
    >
      {local.children}
    </ToastPrimitive.ActionTrigger>
  );
}

function ToastCloseTrigger(props: ComponentProps<typeof ToastPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'aria-labelledby',
    'asChild',
    'children',
    'class',
  ]);
  const resolvedChildren = resolveChildren(() => local.children);
  const ariaLabel =
    local['aria-label'] === undefined ? DEFAULT_CLOSE_TRIGGER_LABEL : local['aria-label'];

  if (local.asChild) {
    return (
      <ToastPrimitive.CloseTrigger
        asChild={local.asChild}
        aria-label={ariaLabel}
        aria-labelledby={local['aria-labelledby']}
        class={local.class}
        {...others}
        data-slot="toast-close-trigger"
      >
        {local.children}
      </ToastPrimitive.CloseTrigger>
    );
  }

  return (
    <ToastPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="toast-close-trigger"
          aria-label={ariaLabel}
          aria-labelledby={local['aria-labelledby']}
          class={clsx(styles.closeTrigger, local.class)}
        >
          {resolvedChildren()}
        </CloseButton>
      )}
      aria-label={ariaLabel}
      aria-labelledby={local['aria-labelledby']}
      {...others}
      data-slot="toast-close-trigger"
    />
  );
}

const Toast = Object.assign(ToastRoot, {
  Root: ToastRoot,
  Context: ToastPrimitive.Context,
  Title: ToastTitle,
  Description: ToastDescription,
  ActionTrigger: ToastActionTrigger,
  CloseTrigger: ToastCloseTrigger,
  Toaster,
});

export { Toast, Toaster, createToaster, useToastContext };