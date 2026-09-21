import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
} from '@ark-ui/solid/floating-panel';
import type { ComponentProps } from 'solid-js';
import { For, children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { GripIcon, MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close panel';
type FloatingPanelResizeTriggerAxis = NonNullable<
  ComponentProps<typeof FloatingPanelPrimitive.ResizeTrigger>['axis']
>;

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
type FloatingPanelCloseIconProps = Omit<
  ComponentProps<typeof FloatingPanelPrimitive.CloseTrigger>,
  'asChild'
>;

function FloatingPanelRoot(props: FloatingPanelRootProps) {
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FloatingPanelPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-[state=open]:bg-accent motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="floating-panel-trigger"
    />
  );
}

function FloatingPanelPositioner(props: ComponentProps<typeof FloatingPanelPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <FloatingPanelPrimitive.Positioner
        class={cn('z-[var(--z-index)] outline-0', local.class)}
        {...others}
        data-slot="floating-panel-positioner"
      />
    </OverlayPortal>
  );
}

function FloatingPanelContent(props: ComponentProps<typeof FloatingPanelPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Content
      class={cn(
        'relative box-border flex min-h-40 min-w-64 origin-[var(--transform-origin)] flex-col overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-0 data-behind:opacity-[0.55] data-minimized:min-h-0 data-[state=closed]:pointer-events-none data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none',
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
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.DragTrigger
      class={cn('block', local.class)}
      {...others}
      data-slot="floating-panel-drag-trigger"
    />
  );
}

function FloatingPanelHeader(props: ComponentProps<typeof FloatingPanelPrimitive.Header>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Header
      class={cn(
        'box-border flex min-h-control-xl cursor-grab items-center justify-between gap-3 border-b border-border bg-muted px-3 py-2 select-none data-[dragging]:cursor-grabbing data-[minimized]:border-b-transparent',
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
      class={cn(
        'inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-popover-foreground',
        local.class,
      )}
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
  const [local, others] = splitProps(props, [
    'aria-label',
    'asChild',
    'children',
    'class',
    'stage',
  ]);
  const resolvedChildren = children(() => local.children);
  const shouldRenderDefaultIcon = () => local.children == null && !local.asChild;

  return (
    <FloatingPanelPrimitive.StageTrigger
      aria-label={local['aria-label']}
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      stage={local.stage}
      {...others}
      data-slot="floating-panel-stage-trigger"
    >
      {resolvedChildren()}
      {shouldRenderDefaultIcon() && local.stage === 'minimized' ? <MinusIcon /> : null}
      {shouldRenderDefaultIcon() && local.stage === 'maximized' ? <MaximizeIcon /> : null}
      {shouldRenderDefaultIcon() && local.stage === 'default' ? <RestoreIcon /> : null}
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
      class={cn(
        !local.asChild &&
          'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="floating-panel-close-trigger"
    />
  );
}

function FloatingPanelCloseIcon(props: FloatingPanelCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <FloatingPanelPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="floating-panel-close-icon"
          aria-label={local['aria-label'] ?? DEFAULT_CLOSE_BUTTON_LABEL}
          aria-labelledby={local['aria-labelledby']}
          class={cn(
            'box-border inline-flex size-control-sm cursor-pointer items-center justify-center rounded-sm border border-border bg-background p-0 text-foreground outline-0 transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent',
            local.class,
          )}
        >
          {resolvedChildren()}
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
      class={cn(
        'min-h-0 flex-auto overflow-auto p-4 text-sm text-popover-foreground data-minimized:hidden',
        local.class,
      )}
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
        'flex flex-none items-center justify-end gap-2 border-t border-border px-3 py-2 text-xs text-muted-foreground data-minimized:hidden',
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
        'absolute data-disabled:pointer-events-none data-[axis=e]:inset-y-3 data-[axis=e]:-right-1 data-[axis=e]:w-2 data-[axis=n]:inset-x-3 data-[axis=n]:-top-1 data-[axis=n]:h-2 data-[axis=ne]:-top-1.5 data-[axis=ne]:-right-1.5 data-[axis=ne]:size-3 data-[axis=nw]:-top-1.5 data-[axis=nw]:-left-1.5 data-[axis=nw]:size-3 data-[axis=s]:inset-x-3 data-[axis=s]:-bottom-1 data-[axis=s]:h-2 data-[axis=se]:-right-1.5 data-[axis=se]:-bottom-1.5 data-[axis=se]:size-3 data-[axis=sw]:-bottom-1.5 data-[axis=sw]:-left-1.5 data-[axis=sw]:size-3 data-[axis=w]:inset-y-3 data-[axis=w]:-left-1 data-[axis=w]:w-2',
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
      class={cn(
        'inline-flex flex-none items-center justify-center text-muted-foreground [&>svg]:size-4',
        local.class,
      )}
      {...others}
      data-slot="floating-panel-drag-indicator"
    >
      {resolvedChildren() ?? <GripIcon />}
    </span>
  );
}

type FloatingPanelComponent = typeof FloatingPanelRoot & {
  Context: typeof FloatingPanelPrimitive.Context;
  Root: typeof FloatingPanelRoot;
  RootProvider: typeof FloatingPanelRootProvider;
  Trigger: typeof FloatingPanelTrigger;
  Positioner: typeof FloatingPanelPositioner;
  Content: typeof FloatingPanelContent;
  DragTrigger: typeof FloatingPanelDragTrigger;
  Header: typeof FloatingPanelHeader;
  Title: typeof FloatingPanelTitle;
  Control: typeof FloatingPanelControl;
  StageTrigger: typeof FloatingPanelStageTrigger;
  CloseTrigger: typeof FloatingPanelCloseTrigger;
  CloseIcon: typeof FloatingPanelCloseIcon;
  Body: typeof FloatingPanelBody;
  Footer: typeof FloatingPanelFooter;
  ResizeTrigger: typeof FloatingPanelResizeTrigger;
  ResizeTriggerGroup: typeof FloatingPanelResizeTriggerGroup;
  DragIndicator: typeof FloatingPanelDragIndicator;
  useFloatingPanel: typeof useFloatingPanel;
  useFloatingPanelContext: typeof useFloatingPanelContext;
};

const FloatingPanel: FloatingPanelComponent = Object.assign(FloatingPanelRoot, {
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
export type { FloatingPanelRootProps, FloatingPanelRootProviderProps };