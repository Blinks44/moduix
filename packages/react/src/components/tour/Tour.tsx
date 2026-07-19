import {
  Tour as TourPrimitive,
  useTour,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
} from '@ark-ui/react/tour';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Tour.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close tour';

type TourRootProps = ComponentProps<typeof TourPrimitive.Root> & OverlayPortalProps;

function TourRoot({ portalled, portalRef, ...props }: TourRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <TourPrimitive.Root {...props} />
    </OverlayPortalProvider>
  );
}

const TourBackdrop = forwardRef<
  ComponentRef<typeof TourPrimitive.Backdrop>,
  ComponentProps<typeof TourPrimitive.Backdrop>
>(function TourBackdrop({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TourPrimitive.Backdrop
        ref={ref}
        data-slot="tour-backdrop"
        className={clsx(styles.backdrop, normalizeClassName(className))}
        {...props}
      />
    </OverlayPortal>
  );
});

const TourSpotlight = forwardRef<
  ComponentRef<typeof TourPrimitive.Spotlight>,
  ComponentProps<typeof TourPrimitive.Spotlight>
>(function TourSpotlight({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TourPrimitive.Spotlight
        ref={ref}
        data-slot="tour-spotlight"
        className={clsx(styles.spotlight, normalizeClassName(className))}
        {...props}
      />
    </OverlayPortal>
  );
});

const TourPositioner = forwardRef<
  ComponentRef<typeof TourPrimitive.Positioner>,
  ComponentProps<typeof TourPrimitive.Positioner>
>(function TourPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TourPrimitive.Positioner
        ref={ref}
        data-slot="tour-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
      />
    </OverlayPortal>
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

const TourCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof TourPrimitive.CloseTrigger>, 'asChild'>
>(function TourCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <TourPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="tour-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, normalizeClassName(className))}
      >
        {children}
      </CloseButton.Root>
    </TourPrimitive.CloseTrigger>
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

function TourActionList({ className }: { className?: string }) {
  return (
    <TourPrimitive.Actions>
      {(actions) =>
        actions.map((action) => (
          <TourActionTrigger key={action.label} action={action} className={className} />
        ))
      }
    </TourPrimitive.Actions>
  );
}

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
  CloseIcon: TourCloseIcon,
  Control: TourControl,
  Actions: TourActions,
  ActionList: TourActionList,
  ActionTrigger: TourActionTrigger,
});

export { Tour, useTour, waitForElement, waitForElementValue, waitForEvent, waitForPromise };