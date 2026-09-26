import { Tooltip as TooltipPrimitive, useTooltip, useTooltipContext } from '@ark-ui/solid/tooltip';
import { clsx } from 'clsx';
import type { ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import styles from './Tooltip.module.css';

type TooltipRootProps = ComponentProps<typeof TooltipPrimitive.Root> & OverlayPortalProps;
type TooltipRootProviderProps = ComponentProps<typeof TooltipPrimitive.RootProvider> &
  OverlayPortalProps;
type TooltipTriggerAsChildProps = Omit<ComponentProps<typeof TooltipPrimitive.Trigger>, 'asChild'>;
type TooltipDisabledTriggerProps = JSX.IntrinsicElements['span'];
type TooltipDisabledTriggerRef = TooltipDisabledTriggerProps['ref'];

function assignDisabledTriggerRef(
  ref: TooltipDisabledTriggerRef | undefined,
  element: HTMLSpanElement,
) {
  if (typeof ref === 'function') {
    ref(element);
  }
}

function Tooltip(props: TooltipRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <TooltipPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </TooltipPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function TooltipRootProvider(props: TooltipRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <TooltipPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </TooltipPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function TooltipTrigger(props: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TooltipPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
      data-slot="tooltip-trigger"
    />
  );
}

function TooltipDisabledTrigger(props: TooltipDisabledTriggerProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'ref', 'tabIndex']);

  return (
    <TooltipPrimitive.Trigger
      {...(others as TooltipTriggerAsChildProps)}
      asChild={(triggerProps) => {
        const primitiveProps = triggerProps() as JSX.IntrinsicElements['span'];
        const primitiveRef = primitiveProps.ref;

        return (
          <span
            {...primitiveProps}
            ref={(element) => {
              assignDisabledTriggerRef(primitiveRef, element);
              assignDisabledTriggerRef(local.ref, element);
            }}
            data-slot="tooltip-disabled-trigger"
            tabIndex={local.tabIndex ?? 0}
            class={clsx(styles.disabledTrigger, local.class)}
          >
            {local.children}
          </span>
        );
      }}
    />
  );
}

function TooltipPositioner(props: ComponentProps<typeof TooltipPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TooltipPrimitive.Positioner
        class={clsx(styles.positioner, local.class)}
        {...others}
        data-slot="tooltip-positioner"
      />
    </OverlayPortal>
  );
}

function TooltipContent(props: ComponentProps<typeof TooltipPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TooltipPrimitive.Content
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="tooltip-content"
    />
  );
}

function TooltipBody(props: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPositioner>
      <TooltipContent {...props} />
    </TooltipPositioner>
  );
}

function TooltipArrow(props: ComponentProps<typeof TooltipPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TooltipPrimitive.Arrow
      class={clsx(styles.arrow, local.class)}
      {...others}
      data-slot="tooltip-arrow"
    >
      {resolvedChildren() ?? <TooltipArrowTip />}
    </TooltipPrimitive.Arrow>
  );
}

function TooltipArrowTip(props: ComponentProps<typeof TooltipPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TooltipPrimitive.ArrowTip
      class={clsx(styles.arrowTip, local.class)}
      {...others}
      data-slot="tooltip-arrow-tip"
    />
  );
}

const TooltipContext = TooltipPrimitive.Context;

export {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipBody,
  TooltipContext,
  TooltipContent,
  TooltipDisabledTrigger,
  TooltipPositioner,
  TooltipRootProvider,
  TooltipTrigger,
  useTooltip,
  useTooltipContext,
};
export type { TooltipRootProps, TooltipRootProviderProps };