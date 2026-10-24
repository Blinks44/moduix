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
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import { Spinner } from '../spinner';
import styles from './Toast.module.css';

type ToasterProps = Omit<ComponentProps<typeof ToasterPrimitive>, 'children'> &
  OverlayPortalProps & {
    children?: ComponentProps<typeof ToasterPrimitive>['children'];
  };

function ToastToaster(props: ToasterProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'portalRef', 'portalled']);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
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
  return (
    <Toast>
      {props.toast().title != null ? (
        <ToastTitle>
          {props.toast().type === 'loading' ? <Spinner decorative size="sm" /> : null}
          {props.toast().title}
        </ToastTitle>
      ) : null}
      {props.toast().description != null ? <ToastDescription /> : null}
      {props.toast().action != null ? (
        <ToastActionTrigger>{props.toast().action?.label}</ToastActionTrigger>
      ) : null}
      {props.toast().closable !== false ? <ToastCloseTrigger /> : null}
    </Toast>
  );
}

function Toast(props: ComponentProps<typeof ToastPrimitive.Root>) {
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
  const [local, others] = splitProps(props, ['aria-label', 'asChild', 'children', 'class']);
  const ariaLabel = () => local['aria-label'] ?? a11yLabels.closeToast;

  if (local.asChild) {
    return (
      <ToastPrimitive.CloseTrigger
        asChild={local.asChild}
        aria-label={ariaLabel()}
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
          aria-label={ariaLabel()}
          class={clsx(styles.closeTrigger, local.class)}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
  );
}

const ToastContext = ToastPrimitive.Context;

export {
  Toast,
  ToastActionTrigger,
  ToastCloseTrigger,
  ToastContext,
  ToastDescription,
  ToastTitle,
  ToastToaster,
  createToaster,
  useToastContext,
};

export type {
  CreateToasterProps,
  CreateToasterReturn,
  ToastActionOptions,
  ToastActionTriggerProps,
  ToastCloseTriggerProps,
  ToastContextProps,
  ToastDescriptionProps,
  ToastOptions,
  ToastPlacement,
  ToastPromiseOptions,
  ToastRootProps,
  ToastStatus,
  ToastStatusChangeDetails,
  ToastTitleProps,
  ToastType,
  UseToastContext,
} from '@ark-ui/solid/toast';
export type { ToasterProps };