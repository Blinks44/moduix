import type { ComponentProps, ComponentRef } from 'react';
import {
  Tour as TourPrimitive,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
} from '@ark-ui/react/tour';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Tour.module.css';

function TourRoot(props: ComponentProps<typeof TourPrimitive.Root>) {
  return <TourPrimitive.Root {...props} />;
}

const TourBackdrop = forwardRef<
  ComponentRef<typeof TourPrimitive.Backdrop>,
  ComponentProps<typeof TourPrimitive.Backdrop>
>(function TourBackdrop({ className, ...props }, ref) {
  return (
    <TourPrimitive.Backdrop
      ref={ref}
      data-slot="tour-backdrop"
      className={clsx(styles.backdrop, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourSpotlight = forwardRef<
  ComponentRef<typeof TourPrimitive.Spotlight>,
  ComponentProps<typeof TourPrimitive.Spotlight>
>(function TourSpotlight({ className, ...props }, ref) {
  return (
    <TourPrimitive.Spotlight
      ref={ref}
      data-slot="tour-spotlight"
      className={clsx(styles.spotlight, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourPositioner = forwardRef<
  ComponentRef<typeof TourPrimitive.Positioner>,
  ComponentProps<typeof TourPrimitive.Positioner>
>(function TourPositioner({ className, ...props }, ref) {
  return (
    <TourPrimitive.Positioner
      ref={ref}
      data-slot="tour-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourContent = forwardRef<
  ComponentRef<typeof TourPrimitive.Content>,
  ComponentProps<typeof TourPrimitive.Content>
>(function TourContent({ className, ...props }, ref) {
  return (
    <TourPrimitive.Content
      ref={ref}
      data-slot="tour-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourArrow = forwardRef<
  ComponentRef<typeof TourPrimitive.Arrow>,
  ComponentProps<typeof TourPrimitive.Arrow>
>(function TourArrow({ className, children, ...props }, ref) {
  return (
    <TourPrimitive.Arrow
      ref={ref}
      data-slot="tour-arrow"
      className={clsx(styles.arrow, normalizeClassName(className))}
      {...props}
    >
      {children ?? <TourArrowTip />}
    </TourPrimitive.Arrow>
  );
});

const TourArrowTip = forwardRef<
  ComponentRef<typeof TourPrimitive.ArrowTip>,
  ComponentProps<typeof TourPrimitive.ArrowTip>
>(function TourArrowTip({ className, ...props }, ref) {
  return (
    <TourPrimitive.ArrowTip
      ref={ref}
      data-slot="tour-arrow-tip"
      className={clsx(styles.arrowTip, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourTitle = forwardRef<
  ComponentRef<typeof TourPrimitive.Title>,
  ComponentProps<typeof TourPrimitive.Title>
>(function TourTitle({ className, ...props }, ref) {
  return (
    <TourPrimitive.Title
      ref={ref}
      data-slot="tour-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourDescription = forwardRef<
  ComponentRef<typeof TourPrimitive.Description>,
  ComponentProps<typeof TourPrimitive.Description>
>(function TourDescription({ className, ...props }, ref) {
  return (
    <TourPrimitive.Description
      ref={ref}
      data-slot="tour-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourProgressText = forwardRef<
  ComponentRef<typeof TourPrimitive.ProgressText>,
  ComponentProps<typeof TourPrimitive.ProgressText>
>(function TourProgressText({ className, ...props }, ref) {
  return (
    <TourPrimitive.ProgressText
      ref={ref}
      data-slot="tour-progress-text"
      className={clsx(styles.progressText, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourCloseTrigger = forwardRef<
  ComponentRef<typeof TourPrimitive.CloseTrigger>,
  ComponentProps<typeof TourPrimitive.CloseTrigger>
>(function TourCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <TourPrimitive.CloseTrigger
      ref={ref}
      asChild={asChild}
      data-slot="tour-close-trigger"
      className={clsx(!asChild && styles.closeTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourControl = forwardRef<
  ComponentRef<typeof TourPrimitive.Control>,
  ComponentProps<typeof TourPrimitive.Control>
>(function TourControl({ className, ...props }, ref) {
  return (
    <TourPrimitive.Control
      ref={ref}
      data-slot="tour-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourActionTrigger = forwardRef<
  ComponentRef<typeof TourPrimitive.ActionTrigger>,
  ComponentProps<typeof TourPrimitive.ActionTrigger>
>(function TourActionTrigger({ asChild, className, ...props }, ref) {
  return (
    <TourPrimitive.ActionTrigger
      ref={ref}
      asChild={asChild}
      data-slot="tour-action-trigger"
      className={clsx(!asChild && styles.actionTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const TourActions = TourPrimitive.Actions;
const TourContext = TourPrimitive.Context;

const Tour = Object.assign(TourRoot, {
  Root: TourRoot,
  Backdrop: TourBackdrop,
  Spotlight: TourSpotlight,
  Positioner: TourPositioner,
  Content: TourContent,
  Arrow: TourArrow,
  ArrowTip: TourArrowTip,
  Title: TourTitle,
  Description: TourDescription,
  ProgressText: TourProgressText,
  CloseTrigger: TourCloseTrigger,
  Control: TourControl,
  Actions: TourActions,
  ActionTrigger: TourActionTrigger,
  Context: TourContext,
});

export {
  Tour,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
};
export type {
  TourActionTriggerProps,
  TourArrowProps,
  TourArrowTipProps,
  TourBackdropProps,
  TourCloseTriggerProps,
  TourContentProps,
  TourContextProps,
  TourControlProps,
  TourDescriptionProps,
  TourFocusOutsideEvent,
  TourInteractOutsideEvent,
  TourPointerDownOutsideEvent,
  TourPositionerProps,
  TourProgressTextProps,
  TourRootProps,
  TourSpotlightProps,
  TourStepDetails,
  TourStepEffectArgs,
  TourTitleProps,
  UseTourContext,
  UseTourProps,
  UseTourReturn,
  WaitForEventOptions,
  WaitOptions,
} from '@ark-ui/react/tour';