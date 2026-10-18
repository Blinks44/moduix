'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
  type FloatingPanelResizeTriggerAxis,
  type FloatingPanelStage,
} from '@ark-ui/react/floating-panel';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { GripIcon, MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

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

const controlButtonClass =
  'inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,opacity] duration-normal ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 [&>svg]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent';

const stageIcons = {
  default: RestoreIcon,
  maximized: MaximizeIcon,
  minimized: MinusIcon,
} satisfies Record<FloatingPanelStage, unknown>;

type FloatingPanelRootProps = ComponentProps<typeof FloatingPanelPrimitive.Root> &
  OverlayPortalProps;
type FloatingPanelRootProviderProps = ComponentProps<typeof FloatingPanelPrimitive.RootProvider> &
  OverlayPortalProps;

function FloatingPanel({
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
>(function FloatingPanelTrigger(props, ref) {
  return <FloatingPanelPrimitive.Trigger ref={ref} {...props} data-slot="floating-panel-trigger" />;
});

const FloatingPanelPositioner = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.Positioner>,
  ComponentProps<typeof FloatingPanelPrimitive.Positioner>
>(function FloatingPanelPositioner(props, ref) {
  return (
    <OverlayPortal>
      <FloatingPanelPrimitive.Positioner
        ref={ref}
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
      className={cn(
        'relative flex flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-behind:opacity-[0.55] data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        className,
      )}
      {...props}
      data-slot="floating-panel-content"
    />
  );
});

const FloatingPanelDragTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.DragTrigger>,
  ComponentProps<typeof FloatingPanelPrimitive.DragTrigger>
>(function FloatingPanelDragTrigger(props, ref) {
  return (
    <FloatingPanelPrimitive.DragTrigger
      ref={ref}
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
      className={cn(
        'flex min-h-control-xl cursor-grab items-center justify-between gap-3 border-b border-border bg-muted px-3 py-2 select-none data-dragging:cursor-grabbing data-minimized:border-b-transparent',
        className,
      )}
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
      className={cn('inline-flex min-w-0 items-center gap-2 text-sm font-semibold', className)}
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
      className={cn('inline-flex flex-none items-center gap-1', className)}
      {...props}
      data-slot="floating-panel-control"
    />
  );
});

const FloatingPanelStageTrigger = forwardRef<
  ComponentRef<typeof FloatingPanelPrimitive.StageTrigger>,
  ComponentProps<typeof FloatingPanelPrimitive.StageTrigger>
>(function FloatingPanelStageTrigger({ asChild, className, children, stage, ...props }, ref) {
  const StageIcon = stageIcons[stage];

  return (
    <FloatingPanelPrimitive.StageTrigger
      ref={ref}
      asChild={asChild}
      stage={stage}
      className={cn(!asChild && controlButtonClass, className)}
      {...props}
      data-slot="floating-panel-stage-trigger"
    >
      {children ?? (asChild ? null : <StageIcon />)}
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
      className={cn(!asChild && controlButtonClass, className)}
      {...props}
      data-slot="floating-panel-close-trigger"
    />
  );
});

const FloatingPanelCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof FloatingPanelPrimitive.CloseTrigger>, 'asChild'>
>(function FloatingPanelCloseIcon(
  { className, children, 'aria-label': ariaLabel = a11yLabels.closePanel, ...props },
  ref,
) {
  return (
    <FloatingPanelPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="floating-panel-close-icon"
        aria-label={ariaLabel}
        className={cn(controlButtonClass, className)}
      >
        {children}
      </CloseButton>
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
      className={cn('min-h-0 flex-auto overflow-auto p-4 text-sm', className)}
      {...props}
      data-slot="floating-panel-body"
    />
  );
});

const FloatingPanelFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function FloatingPanelFooter({ className, ...props }, ref) {
    // Ark does not mark parts it does not own, so mirror the content stage.
    const { 'data-minimized': dataMinimized } = useFloatingPanelContext().getContentProps() as {
      'data-minimized'?: string;
    };

    return (
      <ark.div
        ref={ref}
        {...props}
        data-slot="floating-panel-footer"
        data-minimized={dataMinimized}
        className={cn(
          'flex flex-none items-center justify-end gap-2 border-t border-border px-3 py-1 text-xs text-muted-foreground data-minimized:hidden',
          className,
        )}
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
      className={cn(
        'data-disabled:pointer-events-none data-[axis=e]:w-2 data-[axis=n]:h-2 data-[axis=ne]:size-3 data-[axis=nw]:size-3 data-[axis=s]:h-2 data-[axis=se]:size-3 data-[axis=sw]:size-3 data-[axis=w]:w-2',
        className,
      )}
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
        className={cn('inline-flex flex-none text-muted-foreground [&>svg]:size-4', className)}
        {...props}
        data-slot="floating-panel-drag-indicator"
      >
        {children ?? <GripIcon />}
      </span>
    );
  },
);

const FloatingPanelContext = FloatingPanelPrimitive.Context;

export {
  FloatingPanel,
  FloatingPanelContext,
  FloatingPanelRootProvider,
  FloatingPanelTrigger,
  FloatingPanelPositioner,
  FloatingPanelContent,
  FloatingPanelDragTrigger,
  FloatingPanelHeader,
  FloatingPanelTitle,
  FloatingPanelControl,
  FloatingPanelStageTrigger,
  FloatingPanelCloseTrigger,
  FloatingPanelCloseIcon,
  FloatingPanelBody,
  FloatingPanelFooter,
  FloatingPanelResizeTrigger,
  FloatingPanelResizeTriggerGroup,
  FloatingPanelDragIndicator,
  resizeTriggerAxes,
  useFloatingPanel,
  useFloatingPanelContext,
  type FloatingPanelRootProps,
  type FloatingPanelRootProviderProps,
};

export type {
  FloatingPanelAnchorPositionDetails,
  FloatingPanelBodyProps,
  FloatingPanelCloseTriggerProps,
  FloatingPanelContentProps,
  FloatingPanelContextProps,
  FloatingPanelControlProps,
  FloatingPanelDragTriggerProps,
  FloatingPanelHeaderProps,
  FloatingPanelIntlTranslations,
  FloatingPanelOpenChangeDetails,
  FloatingPanelPoint,
  FloatingPanelPositionChangeDetails,
  FloatingPanelPositionerProps,
  FloatingPanelResizeTriggerAxis,
  FloatingPanelResizeTriggerProps,
  FloatingPanelSize,
  FloatingPanelSizeChangeDetails,
  FloatingPanelStage,
  FloatingPanelStageChangeDetails,
  FloatingPanelStageTriggerProps,
  FloatingPanelTitleProps,
  FloatingPanelTriggerProps,
  UseFloatingPanelContext,
  UseFloatingPanelProps,
  UseFloatingPanelReturn,
} from '@ark-ui/react/floating-panel';