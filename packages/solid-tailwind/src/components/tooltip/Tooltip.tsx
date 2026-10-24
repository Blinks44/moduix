import { Tooltip as TooltipPrimitive, useTooltip, useTooltipContext } from '@ark-ui/solid/tooltip';
import type { ComponentProps, JSX } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';

type TooltipRootProps = ComponentProps<typeof TooltipPrimitive.Root> & OverlayPortalProps;
type TooltipRootProviderProps = ComponentProps<typeof TooltipPrimitive.RootProvider> &
  OverlayPortalProps;
type TooltipTriggerAsChildProps = Omit<ComponentProps<typeof TooltipPrimitive.Trigger>, 'asChild'>;
type TooltipDisabledTriggerProps = JSX.IntrinsicElements['span'];

function Tooltip(props: TooltipRootProps) {
  const [local, others] = splitProps(props, [
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
      />
    </OverlayPortalProvider>
  );
}

function TooltipRootProvider(props: TooltipRootProviderProps) {
  const [local, others] = splitProps(props, [
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
      />
    </OverlayPortalProvider>
  );
}

function TooltipTrigger(props: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TooltipPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-sm text-foreground outline-0 transition-[background-color,border-color,color] duration-normal ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-disabled data-[state=open]:not-data-[value]:bg-accent data-[current]:data-[state=open]:bg-accent [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
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
      asChild={(triggerProps) => (
        <span
          {...triggerProps()}
          ref={local.ref}
          data-slot="tooltip-disabled-trigger"
          tabIndex={local.tabIndex ?? 0}
          class={cn(
            'inline-flex cursor-not-allowed [&>:disabled]:pointer-events-none [&>[data-disabled]]:pointer-events-none',
            local.class,
          )}
        >
          {local.children}
        </span>
      )}
    />
  );
}

function TooltipPositioner(props: ComponentProps<typeof TooltipPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TooltipPrimitive.Positioner
        class={cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-(--available-width) outline-0',
          local.class,
        )}
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
      class={cn(
        'relative max-w-[min(20rem,var(--available-width))] origin-(--transform-origin) rounded-md border border-border bg-popover px-2 py-1 text-center text-sm wrap-anywhere text-popover-foreground shadow-md data-instant:data-[state]:animate-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        local.class,
      )}
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
      class={cn(
        '[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]',
        local.class,
      )}
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
      class={cn('border-t border-l border-border', local.class)}
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

export type {
  TooltipArrowProps,
  TooltipArrowTipProps,
  TooltipContentProps,
  TooltipContextProps,
  TooltipOpenChangeDetails,
  TooltipPositionerProps,
  TooltipTriggerProps,
  TooltipTriggerValueChangeDetails,
  UseTooltipContext,
  UseTooltipProps,
  UseTooltipReturn,
} from '@ark-ui/solid/tooltip';