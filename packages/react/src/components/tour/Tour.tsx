'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
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
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Tour.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close tour';

type TourRootProps = ComponentProps<typeof TourPrimitive.Root> & OverlayPortalProps;
type TourCloseIconProps = Omit<ComponentProps<typeof TourPrimitive.CloseTrigger>, 'asChild'>;

function TourRoot({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: TourRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <TourPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
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
        className={clsx(styles.backdrop, className)}
        {...props}
        data-slot="tour-backdrop"
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
        className={clsx(styles.spotlight, className)}
        {...props}
        data-slot="tour-spotlight"
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
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="tour-positioner"
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
      className={clsx(styles.content, className)}
      {...props}
      data-slot="tour-content"
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
      className={clsx(styles.arrow, className)}
      {...props}
      data-slot="tour-arrow"
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
      className={clsx(styles.arrowTip, className)}
      {...props}
      data-slot="tour-arrow-tip"
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
      className={clsx(styles.title, className)}
      {...props}
      data-slot="tour-title"
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
      className={clsx(styles.description, className)}
      {...props}
      data-slot="tour-description"
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
      className={clsx(styles.progressText, className)}
      {...props}
      data-slot="tour-progress-text"
    />
  );
});

const TourBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(function TourBody(
  { className, ...props },
  ref,
) {
  return (
    <ark.div ref={ref} className={clsx(styles.body, className)} {...props} data-slot="tour-body" />
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
      className={clsx(!asChild && styles.closeTrigger, className)}
      {...props}
      data-slot="tour-close-trigger"
    />
  );
});

const TourCloseIcon = forwardRef<ComponentRef<typeof CloseButton>, TourCloseIconProps>(
  function TourCloseIcon(
    { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
    ref,
  ) {
    return (
      <TourPrimitive.CloseTrigger asChild {...props}>
        <CloseButton
          ref={ref}
          data-slot="tour-close-icon"
          aria-label={ariaLabel}
          className={clsx(styles.closeIcon, className)}
        >
          {children}
        </CloseButton>
      </TourPrimitive.CloseTrigger>
    );
  },
);

const TourControl = forwardRef<
  ComponentRef<typeof TourPrimitive.Control>,
  ComponentProps<typeof TourPrimitive.Control>
>(function TourControl({ className, ...props }, ref) {
  return (
    <TourPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="tour-control"
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
      className={clsx(!asChild && styles.actionTrigger, className)}
      {...props}
      data-slot="tour-action-trigger"
    />
  );
});

const TourActions = TourPrimitive.Actions;

function TourActionList({ className }: { className?: string }) {
  return (
    <TourPrimitive.Actions>
      {(actions) =>
        actions.map((action, index) => (
          <TourActionTrigger
            key={`${action.label}-${index}`}
            action={action}
            className={className}
          />
        ))
      }
    </TourPrimitive.Actions>
  );
}

const Tour = Object.assign(TourRoot, {
  Root: TourRoot,
  Context: TourPrimitive.Context,
  Backdrop: TourBackdrop,
  Spotlight: TourSpotlight,
  Positioner: TourPositioner,
  Content: TourContent,
  Arrow: TourArrow,
  ArrowTip: TourArrowTip,
  Title: TourTitle,
  Description: TourDescription,
  ProgressText: TourProgressText,
  Body: TourBody,
  CloseTrigger: TourCloseTrigger,
  CloseIcon: TourCloseIcon,
  Control: TourControl,
  Actions: TourActions,
  ActionList: TourActionList,
  ActionTrigger: TourActionTrigger,
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

export type { TourCloseIconProps, TourRootProps };