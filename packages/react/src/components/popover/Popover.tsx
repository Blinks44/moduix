import { Popover as PopoverPrimitive, usePopover } from '@ark-ui/react/popover';
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
import styles from './Popover.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close popover';

type PopoverRootProps = ComponentProps<typeof PopoverPrimitive.Root> & OverlayPortalProps;
type PopoverRootProviderProps = ComponentProps<typeof PopoverPrimitive.RootProvider> &
  OverlayPortalProps;

function PopoverRoot({ portalled, portalRef, ...props }: PopoverRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <PopoverPrimitive.Root portalled={portalled} {...props} />
    </OverlayPortalProvider>
  );
}

function PopoverRootProvider({ portalled, portalRef, value, ...props }: PopoverRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled ?? value.portalled} portalRef={portalRef}>
      <PopoverPrimitive.RootProvider value={value} {...props} />
    </OverlayPortalProvider>
  );
}

const PopoverAnchor = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Anchor>,
  ComponentProps<typeof PopoverPrimitive.Anchor>
>(function PopoverAnchor({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Anchor
      ref={ref}
      data-slot="popover-anchor"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const PopoverTrigger = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Trigger>,
  ComponentProps<typeof PopoverPrimitive.Trigger>
>(function PopoverTrigger({ asChild, className, ...props }, ref) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      data-slot="popover-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const PopoverIndicator = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Indicator>,
  ComponentProps<typeof PopoverPrimitive.Indicator>
>(function PopoverIndicator({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Indicator
      ref={ref}
      data-slot="popover-indicator"
      className={normalizeClassName(className)}
      {...props}
    />
  );
});

const PopoverPositioner = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Positioner>,
  ComponentProps<typeof PopoverPrimitive.Positioner>
>(function PopoverPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <PopoverPrimitive.Positioner
        ref={ref}
        data-slot="popover-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
      />
    </OverlayPortal>
  );
});

const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  ComponentProps<typeof PopoverPrimitive.Content>
>(function PopoverContent({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const PopoverArrow = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Arrow>,
  ComponentProps<typeof PopoverPrimitive.Arrow>
>(function PopoverArrow({ className, children, ...props }, ref) {
  return (
    <PopoverPrimitive.Arrow
      ref={ref}
      data-slot="popover-arrow"
      className={clsx(styles.arrow, normalizeClassName(className))}
      {...props}
    >
      {children ?? <PopoverArrowTip />}
    </PopoverPrimitive.Arrow>
  );
});

const PopoverArrowTip = forwardRef<
  ComponentRef<typeof PopoverPrimitive.ArrowTip>,
  ComponentProps<typeof PopoverPrimitive.ArrowTip>
>(function PopoverArrowTip({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.ArrowTip
      ref={ref}
      data-slot="popover-arrow-tip"
      className={clsx(styles.arrowTip, normalizeClassName(className))}
      {...props}
    />
  );
});

const PopoverTitle = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Title>,
  ComponentProps<typeof PopoverPrimitive.Title>
>(function PopoverTitle({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Title
      ref={ref}
      data-slot="popover-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const PopoverDescription = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Description>,
  ComponentProps<typeof PopoverPrimitive.Description>
>(function PopoverDescription({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      data-slot="popover-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
    />
  );
});

const PopoverCloseTrigger = forwardRef<
  ComponentRef<typeof PopoverPrimitive.CloseTrigger>,
  ComponentProps<typeof PopoverPrimitive.CloseTrigger>
>(function PopoverCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <PopoverPrimitive.CloseTrigger
      ref={ref}
      data-slot="popover-close-trigger"
      asChild={asChild}
      className={clsx(!asChild && styles.closeTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const PopoverCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof PopoverPrimitive.CloseTrigger>, 'asChild'>
>(function PopoverCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="popover-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, normalizeClassName(className))}
      >
        {children}
      </CloseButton.Root>
    </PopoverPrimitive.CloseTrigger>
  );
});

function PopoverHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="popover-header" className={clsx(styles.header, className)} {...props} />;
}

function PopoverBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="popover-body" className={clsx(styles.body, className)} {...props} />;
}

function PopoverFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="popover-footer" className={clsx(styles.footer, className)} {...props} />;
}

const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  RootProvider: PopoverRootProvider,
  Anchor: PopoverAnchor,
  Trigger: PopoverTrigger,
  Indicator: PopoverIndicator,
  Positioner: PopoverPositioner,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  ArrowTip: PopoverArrowTip,
  Title: PopoverTitle,
  Description: PopoverDescription,
  CloseTrigger: PopoverCloseTrigger,
  CloseIcon: PopoverCloseIcon,
  Header: PopoverHeader,
  Body: PopoverBody,
  Footer: PopoverFooter,
});

export { Popover, usePopover };