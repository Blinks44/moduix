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

function Tooltip({
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
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-sm text-foreground outline-0 transition-[background-color,border-color,color] duration-normal ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-disabled data-[state=open]:not-data-[value]:bg-accent data-[current]:data-[state=open]:bg-accent [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
      data-slot="tooltip-trigger"
    />
  );
});

const TooltipDisabledTrigger = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(
  function TooltipDisabledTrigger({ className, tabIndex = 0, ...props }, ref) {
    return (
      <TooltipPrimitive.Trigger asChild>
        <span
          ref={ref}
          tabIndex={tabIndex}
          className={cn(
            'inline-flex cursor-not-allowed [&>:disabled]:pointer-events-none [&>[data-disabled]]:pointer-events-none',
            className,
          )}
          {...props}
          data-slot="tooltip-disabled-trigger"
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
        className={cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-(--available-width) outline-0',
          className,
        )}
        {...props}
        data-slot="tooltip-positioner"
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
      className={cn(
        'relative max-w-[min(20rem,var(--available-width))] origin-(--transform-origin) rounded-md border border-border bg-popover px-2 py-1 text-center text-sm wrap-anywhere text-popover-foreground shadow-md data-instant:data-[state]:animate-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        className,
      )}
      {...props}
      data-slot="tooltip-content"
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
      className={cn(
        '[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]',
        className,
      )}
      {...props}
      data-slot="tooltip-arrow"
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
      className={cn('border-t border-l border-border', className)}
      {...props}
      data-slot="tooltip-arrow-tip"
    />
  );
});

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
} from '@ark-ui/react/tooltip';