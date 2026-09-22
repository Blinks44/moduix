'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
  type FloatingPanelResizeTriggerAxis,
} from '@ark-ui/react/floating-panel';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { GripIcon, MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

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
>(function FloatingPanelTrigger({ asChild, className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-[state=open]:bg-accent motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
        className={cn('z-[var(--z-index)] outline-0', className)}
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
        'relative box-border flex min-h-40 min-w-64 origin-[var(--transform-origin)] flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-behind:opacity-[0.55] data-minimized:min-h-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
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
>(function FloatingPanelDragTrigger({ className, ...props }, ref) {
  return (
    <FloatingPanelPrimitive.DragTrigger
      ref={ref}
      className={cn('block', className)}
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
        'box-border flex min-h-control-xl cursor-grab items-center justify-between gap-3 border-b border-border bg-muted px-3 py-2 select-none data-[dragging]:cursor-grabbing data-[minimized]:border-b-transparent',
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
      className={cn(
        'inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-popover-foreground',
        className,
      )}
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
      className={cn(
        !asChild &&
          'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
      className={cn(
        !asChild &&
          'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
      data-slot="floating-panel-close-trigger"
    />
  );
});

const FloatingPanelCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof FloatingPanelPrimitive.CloseTrigger>, 'asChild'>
>(function FloatingPanelCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <FloatingPanelPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="floating-panel-close-icon"
        aria-label={ariaLabel}
        className={cn(
          'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent',
          className,
        )}
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
      className={cn(
        'min-h-0 flex-auto overflow-auto p-4 text-sm text-popover-foreground data-minimized:hidden',
        className,
      )}
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
        className={cn(
          'flex flex-none items-center justify-end gap-2 border-t border-border px-3 py-2 text-xs text-muted-foreground data-minimized:hidden',
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
        'absolute data-disabled:pointer-events-none data-[axis=e]:inset-y-3 data-[axis=e]:-right-1 data-[axis=e]:w-2 data-[axis=n]:inset-x-3 data-[axis=n]:-top-1 data-[axis=n]:h-2 data-[axis=ne]:-top-1.5 data-[axis=ne]:-right-1.5 data-[axis=ne]:size-3 data-[axis=nw]:-top-1.5 data-[axis=nw]:-left-1.5 data-[axis=nw]:size-3 data-[axis=s]:inset-x-3 data-[axis=s]:-bottom-1 data-[axis=s]:h-2 data-[axis=se]:-right-1.5 data-[axis=se]:-bottom-1.5 data-[axis=se]:size-3 data-[axis=sw]:-bottom-1.5 data-[axis=sw]:-left-1.5 data-[axis=sw]:size-3 data-[axis=w]:inset-y-3 data-[axis=w]:-left-1 data-[axis=w]:w-2',
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
        className={cn(
          'inline-flex flex-none items-center justify-center text-muted-foreground [&>svg]:size-4',
          className,
        )}
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