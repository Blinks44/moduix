'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
  type FloatingPanelResizeTriggerAxis,
} from '@ark-ui/react/floating-panel';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { GripIcon, MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './FloatingPanel.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close panel';
const resizeTriggerAxes = [
  'n',
  'e',
  's',
  'w',
  'ne',
  'se',
  'sw',
  'nw',
] satisfies FloatingPanelResizeTriggerAxis[];

type FloatingPanelRootProps = ComponentProps<typeof FloatingPanelPrimitive.Root> &
  OverlayPortalProps;
type FloatingPanelRootProviderProps = ComponentProps<typeof FloatingPanelPrimitive.RootProvider> &
  OverlayPortalProps;

function FloatingPanelRoot({
  closeOnEscape = true,
  lazyMount = true,
  persistRect = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: FloatingPanelRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <FloatingPanelPrimitive.Root
        closeOnEscape={closeOnEscape}
        lazyMount={lazyMount}
        persistRect={persistRect}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

function FloatingPanelRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: FloatingPanelRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <FloatingPanelPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const FloatingPanelTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Trigger>,
  ComponentProps<typeof FloatingPanelPrimitive.Trigger>
>(function FloatingPanelTrigger({ asChild, className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
      data-slot="floating-panel-trigger"
    />
  );
});

const FloatingPanelPositioner = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Positioner>,
  ComponentProps<typeof FloatingPanelPrimitive.Positioner>
>(function FloatingPanelPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <FloatingPanelPrimitive.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="floating-panel-positioner"
      />
    </OverlayPortal>
  );
});

const FloatingPanelContent = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Content>,
  ComponentProps<typeof FloatingPanelPrimitive.Content>
>(function FloatingPanelContent({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.Content
      ref={ref}
      className={clsx(styles.content, className)}
      {...props}
      data-slot="floating-panel-content"
    />
  );
});

const FloatingPanelDragTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.DragTrigger>,
  ComponentProps<typeof FloatingPanelPrimitive.DragTrigger>
>(function FloatingPanelDragTrigger({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.DragTrigger
      ref={ref}
      className={clsx(styles.dragTrigger, className)}
      {...props}
      data-slot="floating-panel-drag-trigger"
    />
  );
});

const FloatingPanelHeader = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Header>,
  ComponentProps<typeof FloatingPanelPrimitive.Header>
>(function FloatingPanelHeader({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.Header
      ref={ref}
      className={clsx(styles.header, className)}
      {...props}
      data-slot="floating-panel-header"
    />
  );
});

const FloatingPanelTitle = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Title>,
  ComponentProps<typeof FloatingPanelPrimitive.Title>
>(function FloatingPanelTitle({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.Title
      ref={ref}
      className={clsx(styles.title, className)}
      {...props}
      data-slot="floating-panel-title"
    />
  );
});

const FloatingPanelControl = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Control>,
  ComponentProps<typeof FloatingPanelPrimitive.Control>
>(function FloatingPanelControl({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.Control
      ref={ref}
      className={clsx(styles.control, className)}
      {...props}
      data-slot="floating-panel-control"
    />
  );
});

const FloatingPanelStageTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.StageTrigger>,
  ComponentProps<typeof FloatingPanelPrimitive.StageTrigger>
>(function FloatingPanelStageTrigger(
  { asChild, className, children, stage, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const shouldRenderDefaultIcon = children == null && !asChild;

  return (
    <FloatingPanelPrimitive.StageTrigger
      ref={ref}
      asChild={asChild}
      stage={stage}
      className={clsx(!asChild && styles.controlButton, className)}
      aria-label={ariaLabel}
      {...props}
      data-slot="floating-panel-stage-trigger"
    >
      {children}
      {shouldRenderDefaultIcon && stage === 'minimized' ? <MinusIcon /> : null}
      {shouldRenderDefaultIcon && stage === 'maximized' ? <MaximizeIcon /> : null}
      {shouldRenderDefaultIcon && stage === 'default' ? <RestoreIcon /> : null}
    </FloatingPanelPrimitive.StageTrigger>
  );
});

const FloatingPanelCloseTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.CloseTrigger>,
  ComponentProps<typeof FloatingPanelPrimitive.CloseTrigger>
>(function FloatingPanelCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.CloseTrigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.controlButton, className)}
      {...props}
      data-slot="floating-panel-close-trigger"
    />
  );
});

const FloatingPanelCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof FloatingPanelPrimitive.CloseTrigger>, 'asChild'>
>(function FloatingPanelCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <FloatingPanelPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="floating-panel-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.controlButton, className)}
      >
        {children}
      </CloseButton.Root>
    </FloatingPanelPrimitive.CloseTrigger>
  );
});

const FloatingPanelBody = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Body>,
  ComponentProps<typeof FloatingPanelPrimitive.Body>
>(function FloatingPanelBody({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.Body
      ref={ref}
      className={clsx(styles.body, className)}
      {...props}
      data-slot="floating-panel-body"
    />
  );
});

const FloatingPanelFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function FloatingPanelFooter({ className, ...props }, ref) {
    const { ['data-minimized']: dataMinimized } = useFloatingPanelContext().getContentProps() as {
      'data-minimized'?: string;
    };

    return (
      <ark.div
        ref={ref}
        {...props}
        data-slot="floating-panel-footer"
        data-minimized={dataMinimized}
        className={clsx(styles.footer, className)}
      />
    );
  },
);

const FloatingPanelResizeTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.ResizeTrigger>,
  ComponentProps<typeof FloatingPanelPrimitive.ResizeTrigger>
>(function FloatingPanelResizeTrigger({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.ResizeTrigger
      ref={ref}
      className={clsx(styles.resizeTrigger, className)}
      {...props}
      data-slot="floating-panel-resize-trigger"
    />
  );
});

function FloatingPanelResizeTriggerGroup({
  axes = resizeTriggerAxes,
}: {
  axes?: readonly FloatingPanelResizeTriggerAxis[];
}) {
  return (
    <>
      {axes.map((axis) => (
        <FloatingPanelResizeTrigger key={axis} axis={axis} />
      ))}
    </>
  );
}

const FloatingPanelDragIndicator = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
  function FloatingPanelDragIndicator({ className, children, ...props }, ref) {
    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={clsx(styles.dragIndicator, className)}
        {...props}
        data-slot="floating-panel-drag-indicator"
      >
        {children ?? <GripIcon />}
      </span>
    );
  },
);

const FloatingPanel = Object.assign(FloatingPanelRoot, {
  Context: FloatingPanelPrimitive.Context,
  Root: FloatingPanelRoot,
  RootProvider: FloatingPanelRootProvider,
  Trigger: FloatingPanelTrigger,
  Positioner: FloatingPanelPositioner,
  Content: FloatingPanelContent,
  DragTrigger: FloatingPanelDragTrigger,
  Header: FloatingPanelHeader,
  Title: FloatingPanelTitle,
  Control: FloatingPanelControl,
  StageTrigger: FloatingPanelStageTrigger,
  CloseTrigger: FloatingPanelCloseTrigger,
  CloseIcon: FloatingPanelCloseIcon,
  Body: FloatingPanelBody,
  Footer: FloatingPanelFooter,
  ResizeTrigger: FloatingPanelResizeTrigger,
  ResizeTriggerGroup: FloatingPanelResizeTriggerGroup,
  DragIndicator: FloatingPanelDragIndicator,
  useFloatingPanel,
  useFloatingPanelContext,
});

export { FloatingPanel, resizeTriggerAxes, useFloatingPanel, useFloatingPanelContext };