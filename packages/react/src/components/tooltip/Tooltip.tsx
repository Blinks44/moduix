import type { ComponentProps, ComponentRef } from 'react';
import { Tooltip as TooltipPrimitive, useTooltip, useTooltipContext } from '@ark-ui/react/tooltip';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Tooltip.module.css';

function TooltipRoot(props: ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root {...props} />;
}

function TooltipRootProvider(props: ComponentProps<typeof TooltipPrimitive.RootProvider>) {
  return <TooltipPrimitive.RootProvider {...props} />;
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
    <TooltipPrimitive.Positioner
      ref={ref}
      data-slot="tooltip-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
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

const TooltipContext = TooltipPrimitive.Context;

const Tooltip = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  RootProvider: TooltipRootProvider,
  Trigger: TooltipTrigger,
  Positioner: TooltipPositioner,
  Content: TooltipContent,
  Arrow: TooltipArrow,
  ArrowTip: TooltipArrowTip,
  Context: TooltipContext,
});

export { Tooltip, useTooltip, useTooltipContext };
export type {
  TooltipOpenChangeDetails,
  TooltipTriggerValueChangeDetails,
  UseTooltipContext,
  UseTooltipProps,
  UseTooltipReturn,
} from '@ark-ui/react/tooltip';