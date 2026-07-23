import { Tooltip as TooltipPrimitive, useTooltip, useTooltipContext } from '@ark-ui/react/tooltip';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import styles from './Tooltip.module.css';

type TooltipRootProps = ComponentProps<typeof TooltipPrimitive.Root> & OverlayPortalProps;
type TooltipRootProviderProps = ComponentProps<typeof TooltipPrimitive.RootProvider> &
  OverlayPortalProps;

function TooltipRoot({ portalled, portalRef, ...props }: TooltipRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <TooltipPrimitive.Root {...props} />
    </OverlayPortalProvider>
  );
}

function TooltipRootProvider({ portalled, portalRef, ...props }: TooltipRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <TooltipPrimitive.RootProvider {...props} />
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
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const TooltipPositioner = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Positioner>,
  ComponentProps<typeof TooltipPrimitive.Positioner>
>(function TooltipPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TooltipPrimitive.Positioner
        ref={ref}
        data-slot="tooltip-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
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
      className={clsx(styles.content, normalizeClassName(className))}
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
      className={clsx(styles.arrow, normalizeClassName(className))}
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
      className={clsx(styles.arrowTip, normalizeClassName(className))}
      {...props}
    />
  );
});

const Tooltip = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  RootProvider: TooltipRootProvider,
  Context: TooltipPrimitive.Context,
  Trigger: TooltipTrigger,
  Body: TooltipBody,
  Positioner: TooltipPositioner,
  Content: TooltipContent,
  Arrow: TooltipArrow,
  ArrowTip: TooltipArrowTip,
});

export { Tooltip, useTooltip, useTooltipContext };