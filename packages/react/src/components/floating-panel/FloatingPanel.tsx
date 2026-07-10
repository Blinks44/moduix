import type { ComponentProps, ComponentRef } from 'react';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
  type FloatingPanelResizeTriggerAxis,
} from '@ark-ui/react/floating-panel';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { GripIcon, MaximizeIcon, MinusIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './FloatingPanel.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close panel';
const DEFAULT_MINIMIZE_LABEL = 'Minimize panel';
const DEFAULT_MAXIMIZE_LABEL = 'Maximize panel';
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
  persistRect = true,
  portalled,
  portalRef,
  ...props
}: FloatingPanelRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <FloatingPanelPrimitive.Root
        closeOnEscape={closeOnEscape}
        persistRect={persistRect}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

function FloatingPanelRootProvider({
  portalled,
  portalRef,
  ...props
}: FloatingPanelRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <FloatingPanelPrimitive.RootProvider {...props} />
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
      data-slot="floating-panel-trigger"
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
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
        data-slot="floating-panel-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
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
      data-slot="floating-panel-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="floating-panel-drag-trigger"
      className={clsx(styles.dragTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="floating-panel-header"
      className={clsx(styles.header, normalizeClassName(className))}
      {...props}
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
      data-slot="floating-panel-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
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
      data-slot="floating-panel-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
  const defaultAriaLabel =
    shouldRenderDefaultIcon && stage === 'minimized'
      ? DEFAULT_MINIMIZE_LABEL
      : shouldRenderDefaultIcon && stage === 'maximized'
        ? DEFAULT_MAXIMIZE_LABEL
        : undefined;

  return (
    <FloatingPanelPrimitive.StageTrigger
      ref={ref}
      asChild={asChild}
      stage={stage}
      data-slot="floating-panel-stage-trigger"
      className={clsx(!asChild && styles.controlButton, normalizeClassName(className))}
      aria-label={ariaLabel ?? defaultAriaLabel}
      {...props}
    >
      {children}
      {shouldRenderDefaultIcon && stage === 'minimized' ? <MinusIcon /> : null}
      {shouldRenderDefaultIcon && stage === 'maximized' ? <MaximizeIcon /> : null}
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
      data-slot="floating-panel-close-trigger"
      className={clsx(!asChild && styles.controlButton, normalizeClassName(className))}
      {...props}
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
        className={clsx(styles.controlButton, normalizeClassName(className))}
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
      data-slot="floating-panel-body"
      className={clsx(styles.body, normalizeClassName(className))}
      {...props}
    />
  );
});

function FloatingPanelFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="floating-panel-footer" className={clsx(styles.footer, className)} {...props} />
  );
}

const FloatingPanelResizeTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.ResizeTrigger>,
  ComponentProps<typeof FloatingPanelPrimitive.ResizeTrigger>
>(function FloatingPanelResizeTrigger({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.ResizeTrigger
      ref={ref}
      data-slot="floating-panel-resize-trigger"
      className={clsx(styles.resizeTrigger, normalizeClassName(className))}
      {...props}
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
        data-slot="floating-panel-drag-indicator"
        className={clsx(styles.dragIndicator, normalizeClassName(className))}
        {...props}
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

export { FloatingPanel, resizeTriggerAxes };