'use client';

import { Tooltip as TooltipPrimitive, useTooltip, useTooltipContext } from '@ark-ui/react/tooltip';
import type { ComponentProps, ComponentPropsWithoutRef, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';

type TooltipRootProps = ComponentProps<typeof TooltipPrimitive.Root> & OverlayPortalProps;
type TooltipRootProviderProps = ComponentProps<typeof TooltipPrimitive.RootProvider> &
  OverlayPortalProps;

function TooltipRoot({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: TooltipRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <TooltipPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

function TooltipRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: TooltipRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <TooltipPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const TooltipTrigger = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Trigger>,
  ComponentProps<typeof TooltipPrimitive.Trigger>
>(function TooltipTrigger({ asChild, className, ...props }, ref) {
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-sm leading-5 text-foreground outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=open]:bg-accent motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
    />
  );
});

const TooltipDisabledTrigger = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  function TooltipDisabledTrigger({ className, tabIndex = 0, ...props }, ref) {
    return (
      <TooltipPrimitive.Trigger asChild>
        <span
          ref={ref}
          data-slot="tooltip-disabled-trigger"
          tabIndex={tabIndex}
          className={cn(
            'inline-flex cursor-not-allowed [&>:disabled]:pointer-events-none [&>[data-disabled]]:pointer-events-none',
            className,
          )}
          {...props}
        />
      </TooltipPrimitive.Trigger>
    );
  },
);

const TooltipPositioner = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Positioner>,
  ComponentProps<typeof TooltipPrimitive.Positioner>
>(function TooltipPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TooltipPrimitive.Positioner
        ref={ref}
        data-slot="tooltip-positioner"
        className={cn(
          'z-[var(--z-index)] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0',
          className,
        )}
        {...props}
      />
    </OverlayPortal>
  );
});

const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentProps<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, ...props }, ref) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      data-slot="tooltip-content"
      className={cn(
        'relative z-60 max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(20rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-md border border-border bg-popover px-2 py-1 text-center text-sm leading-5 wrap-anywhere text-popover-foreground shadow-lg data-instant:animate-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
        className,
      )}
      {...props}
    />
  );
});

const TooltipBody = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentProps<typeof TooltipPrimitive.Content>
>(function TooltipBody(props, ref) {
  return (
    <TooltipPositioner>
      <TooltipContent ref={ref} {...props} />
    </TooltipPositioner>
  );
});

const TooltipArrow = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Arrow>,
  ComponentProps<typeof TooltipPrimitive.Arrow>
>(function TooltipArrow({ className, children, ...props }, ref) {
  return (
    <TooltipPrimitive.Arrow
      ref={ref}
      data-slot="tooltip-arrow"
      className={cn('[--arrow-background:var(--color-popover)] [--arrow-size:0.625rem]', className)}
      {...props}
    >
      {children ?? <TooltipArrowTip />}
    </TooltipPrimitive.Arrow>
  );
});

const TooltipArrowTip = forwardRef<
  ComponentRef<typeof TooltipPrimitive.ArrowTip>,
  ComponentProps<typeof TooltipPrimitive.ArrowTip>
>(function TooltipArrowTip({ className, ...props }, ref) {
  return (
    <TooltipPrimitive.ArrowTip
      ref={ref}
      data-slot="tooltip-arrow-tip"
      className={cn('border-t border-l border-border', className)}
      {...props}
    />
  );
});

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