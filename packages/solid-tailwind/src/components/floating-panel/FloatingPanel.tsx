import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
  type FloatingPanelResizeTriggerAxis,
  type FloatingPanelStage,
} from '@ark-ui/solid/floating-panel';
import type { ComponentProps } from 'solid-js';
import { For, children, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
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

const stageIcons = {
  default: RestoreIcon,
  maximized: MaximizeIcon,
  minimized: MinusIcon,
} satisfies Record<FloatingPanelStage, unknown>;

const controlButtonClass =
  'inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,opacity] duration-normal ease-in-out select-none focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-disabled [&>svg]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent';

type FloatingPanelRootProps = ComponentProps<typeof FloatingPanelPrimitive.Root> &
  OverlayPortalProps;
type FloatingPanelRootProviderProps = ComponentProps<typeof FloatingPanelPrimitive.RootProvider> &
  OverlayPortalProps;
type FloatingPanelCloseIconProps = Omit<
  ComponentProps<typeof FloatingPanelPrimitive.CloseTrigger>,
  'asChild'
>;

function FloatingPanel(props: FloatingPanelRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'closeOnEscape',
    'lazyMount',
    'persistRect',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <FloatingPanelPrimitive.Root
        closeOnEscape={local.closeOnEscape ?? true}
        lazyMount={local.lazyMount ?? true}
        persistRect={local.persistRect ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </FloatingPanelPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function FloatingPanelRootProvider(props: FloatingPanelRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <FloatingPanelPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </FloatingPanelPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function FloatingPanelTrigger(props: ComponentProps<typeof FloatingPanelPrimitive.Trigger>) {
  return <FloatingPanelPrimitive.Trigger {...props} data-slot="floating-panel-trigger" />;
}

function FloatingPanelPositioner(props: ComponentProps<typeof FloatingPanelPrimitive.Positioner>) {
  return (
    <OverlayPortal>
      <FloatingPanelPrimitive.Positioner {...props} data-slot="floating-panel-positioner" />
    </OverlayPortal>
  );
}

function FloatingPanelContent(props: ComponentProps<typeof FloatingPanelPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Content
      class={cn(
        'relative flex flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-behind:opacity-[0.55] data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="floating-panel-content"
    />
  );
}

function FloatingPanelDragTrigger(
  props: ComponentProps<typeof FloatingPanelPrimitive.DragTrigger>,
) {
  return <FloatingPanelPrimitive.DragTrigger {...props} data-slot="floating-panel-drag-trigger" />;
}

function FloatingPanelHeader(props: ComponentProps<typeof FloatingPanelPrimitive.Header>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Header
      class={cn(
        'flex min-h-control-xl cursor-grab items-center justify-between gap-3 border-b border-border bg-muted px-3 py-2 select-none data-dragging:cursor-grabbing data-minimized:border-b-transparent',
        local.class,
      )}
      {...others}
      data-slot="floating-panel-header"
    />
  );
}

function FloatingPanelTitle(props: ComponentProps<typeof FloatingPanelPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Title
      class={cn('inline-flex min-w-0 items-center gap-2 text-sm font-semibold', local.class)}
      {...others}
      data-slot="floating-panel-title"
    />
  );
}

function FloatingPanelControl(props: ComponentProps<typeof FloatingPanelPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Control
      class={cn('inline-flex flex-none items-center gap-1', local.class)}
      {...others}
      data-slot="floating-panel-control"
    />
  );
}

function FloatingPanelStageTrigger(
  props: ComponentProps<typeof FloatingPanelPrimitive.StageTrigger>,
) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <FloatingPanelPrimitive.StageTrigger
      asChild={local.asChild}
      class={cn(!local.asChild && controlButtonClass, local.class)}
      {...others}
      data-slot="floating-panel-stage-trigger"
    >
      {resolvedChildren() ??
        (local.asChild ? null : <Dynamic component={stageIcons[props.stage]} />)}
    </FloatingPanelPrimitive.StageTrigger>
  );
}

function FloatingPanelCloseTrigger(
  props: ComponentProps<typeof FloatingPanelPrimitive.CloseTrigger>,
) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FloatingPanelPrimitive.CloseTrigger
      asChild={local.asChild}
      class={cn(!local.asChild && controlButtonClass, local.class)}
      {...others}
      data-slot="floating-panel-close-trigger"
    />
  );
}

function FloatingPanelCloseIcon(props: FloatingPanelCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);

  return (
    <FloatingPanelPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="floating-panel-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closePanel}
          aria-labelledby={local['aria-labelledby']}
          class={cn(controlButtonClass, local.class)}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
  );
}

function FloatingPanelBody(props: ComponentProps<typeof FloatingPanelPrimitive.Body>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Body
      class={cn('min-h-0 flex-auto overflow-auto p-4 text-sm', local.class)}
      {...others}
      data-slot="floating-panel-body"
    />
  );
}

function FloatingPanelFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);
  const floatingPanel = useFloatingPanelContext();

  return (
    <ark.div
      {...others}
      data-slot="floating-panel-footer"
      data-minimized={
        (
          floatingPanel().getContentProps() as {
            'data-minimized'?: string;
          }
        )['data-minimized']
      }
      class={cn(
        'flex flex-none items-center justify-end gap-2 border-t border-border px-3 py-1 text-xs text-muted-foreground data-minimized:hidden',
        local.class,
      )}
    />
  );
}

function FloatingPanelResizeTrigger(
  props: ComponentProps<typeof FloatingPanelPrimitive.ResizeTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.ResizeTrigger
      class={cn(
        'data-disabled:pointer-events-none data-[axis=e]:w-2 data-[axis=n]:h-2 data-[axis=ne]:size-3 data-[axis=nw]:size-3 data-[axis=s]:h-2 data-[axis=se]:size-3 data-[axis=sw]:size-3 data-[axis=w]:w-2',
        local.class,
      )}
      {...others}
      data-slot="floating-panel-resize-trigger"
    />
  );
}

function FloatingPanelResizeTriggerGroup(props: {
  axes?: readonly FloatingPanelResizeTriggerAxis[];
}) {
  return (
    <For each={props.axes ?? resizeTriggerAxes}>
      {(axis) => <FloatingPanelResizeTrigger axis={axis} />}
    </For>
  );
}

function FloatingPanelDragIndicator(props: ComponentProps<'span'>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <span
      aria-hidden="true"
      class={cn('inline-flex flex-none text-muted-foreground [&>svg]:size-4', local.class)}
      {...others}
      data-slot="floating-panel-drag-indicator"
    >
      {resolvedChildren() ?? <GripIcon />}
    </span>
  );
}

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
};
export type { FloatingPanelRootProps, FloatingPanelRootProviderProps };
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
} from '@ark-ui/solid/floating-panel';