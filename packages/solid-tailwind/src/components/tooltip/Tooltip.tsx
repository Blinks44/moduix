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
type TooltipDisabledTriggerRef = TooltipDisabledTriggerProps['ref'];

function assignDisabledTriggerRef(
  ref: TooltipDisabledTriggerRef | undefined,
  element: HTMLSpanElement,
) {
  if (typeof ref === 'function') {
    ref(element);
  }
}

function TooltipRoot(props: TooltipRootProps) {
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
      data-slot="tooltip-trigger"
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-sm leading-5 text-foreground outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=open]:bg-accent motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
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
            class={cn(
              'inline-flex cursor-not-allowed [&>:disabled]:pointer-events-none [&>[data-disabled]]:pointer-events-none',
              local.class,
            )}
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
        data-slot="tooltip-positioner"
        class={cn(
          'z-[var(--z-index)] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0',
          local.class,
        )}
        {...others}
      />
    </OverlayPortal>
  );
}

function TooltipContent(props: ComponentProps<typeof TooltipPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TooltipPrimitive.Content
      data-slot="tooltip-content"
      class={cn(
        'relative z-60 max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(20rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-md border border-border bg-popover px-2 py-1 text-center text-sm leading-5 wrap-anywhere text-popover-foreground shadow-lg data-instant:animate-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
        local.class,
      )}
      {...others}
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
      data-slot="tooltip-arrow"
      class={cn('[--arrow-background:var(--color-popover)] [--arrow-size:0.625rem]', local.class)}
      {...others}
    >
      {resolvedChildren() ?? <TooltipArrowTip />}
    </TooltipPrimitive.Arrow>
  );
}

function TooltipArrowTip(props: ComponentProps<typeof TooltipPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TooltipPrimitive.ArrowTip
      data-slot="tooltip-arrow-tip"
      class={cn('border-t border-l border-border', local.class)}
      {...others}
    />
  );
}

const Tooltip = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  RootProvider: TooltipRootProvider,
  Context: TooltipPrimitive.Context,
  Trigger: TooltipTrigger,
  DisabledTrigger: TooltipDisabledTrigger,
  Body: TooltipBody,
  Positioner: TooltipPositioner,
  Content: TooltipContent,
  Arrow: TooltipArrow,
  ArrowTip: TooltipArrowTip,
});

export { Tooltip, useTooltip, useTooltipContext };
export type { TooltipRootProps, TooltipRootProviderProps };