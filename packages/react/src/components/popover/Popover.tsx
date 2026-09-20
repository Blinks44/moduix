'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { Popover as PopoverPrimitive, usePopover, usePopoverContext } from '@ark-ui/react/popover';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Popover.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close popover';

export type PopoverRootProps = ComponentProps<typeof PopoverPrimitive.Root> & OverlayPortalProps;
export type PopoverRootProviderProps = ComponentProps<typeof PopoverPrimitive.RootProvider> & {
  portalRef?: OverlayPortalProps['portalRef'];
};

function PopoverRoot({
  lazyMount = true,
  modal,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: PopoverRootProps) {
  const resolvedPortalled = modal || portalled;

  return (
    <OverlayPortalProvider portalled={resolvedPortalled} portalRef={portalRef}>
      <PopoverPrimitive.Root
        lazyMount={lazyMount}
        modal={modal}
        portalled={resolvedPortalled}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

function PopoverRootProvider({
  lazyMount = true,
  portalRef,
  unmountOnExit = true,
  value,
  ...props
}: PopoverRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={value.portalled} portalRef={portalRef}>
      <PopoverPrimitive.RootProvider
        value={value}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
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
      className={className}
      {...props}
      data-slot="popover-anchor"
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
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
      data-slot="popover-trigger"
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
      className={className}
      {...props}
      data-slot="popover-indicator"
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
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="popover-positioner"
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
      className={clsx(styles.content, className)}
      {...props}
      data-slot="popover-content"
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
      className={clsx(styles.arrow, className)}
      {...props}
      data-slot="popover-arrow"
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
      className={clsx(styles.arrowTip, className)}
      {...props}
      data-slot="popover-arrow-tip"
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
      className={clsx(styles.title, className)}
      {...props}
      data-slot="popover-title"
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
      className={clsx(styles.description, className)}
      {...props}
      data-slot="popover-description"
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
      asChild={asChild}
      className={clsx(!asChild && styles.closeTrigger, className)}
      {...props}
      data-slot="popover-close-trigger"
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
        className={clsx(styles.closeIcon, className)}
      >
        {children}
      </CloseButton.Root>
    </PopoverPrimitive.CloseTrigger>
  );
});

const PopoverHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function PopoverHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
        data-slot="popover-header"
      />
    );
  },
);

const PopoverBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function PopoverBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
        data-slot="popover-body"
      />
    );
  },
);

const PopoverFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function PopoverFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.footer, className)}
        {...props}
        data-slot="popover-footer"
      />
    );
  },
);

const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  RootProvider: PopoverRootProvider,
  Context: PopoverPrimitive.Context,
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

export { Popover, usePopover, usePopoverContext };