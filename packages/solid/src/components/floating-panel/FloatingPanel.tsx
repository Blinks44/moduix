import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
} from '@ark-ui/solid/floating-panel';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { For, children, splitProps } from 'solid-js';
import { GripIcon, MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './FloatingPanel.module.css';

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
      data-slot="floating-panel-trigger"
      class={clsx(!local.asChild && styles.trigger, local.class)}
      {...others}
    />
  );
}

function FloatingPanelPositioner(props: ComponentProps<typeof FloatingPanelPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <FloatingPanelPrimitive.Positioner
        data-slot="floating-panel-positioner"
        class={clsx(styles.positioner, local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function FloatingPanelContent(props: ComponentProps<typeof FloatingPanelPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Content
      data-slot="floating-panel-content"
      class={clsx(styles.content, local.class)}
      {...others}
    />
  );
}

function FloatingPanelDragTrigger(
  props: ComponentProps<typeof FloatingPanelPrimitive.DragTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.DragTrigger
      data-slot="floating-panel-drag-trigger"
      class={clsx(styles.dragTrigger, local.class)}
      {...others}
    />
  );
}

function FloatingPanelHeader(props: ComponentProps<typeof FloatingPanelPrimitive.Header>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Header
      data-slot="floating-panel-header"
      class={clsx(styles.header, local.class)}
      {...others}
    />
  );
}

function FloatingPanelTitle(props: ComponentProps<typeof FloatingPanelPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Title
      data-slot="floating-panel-title"
      class={clsx(styles.title, local.class)}
      {...others}
    />
  );
}

function FloatingPanelControl(props: ComponentProps<typeof FloatingPanelPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Control
      data-slot="floating-panel-control"
      class={clsx(styles.control, local.class)}
      {...others}
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
      data-slot="floating-panel-stage-trigger"
      class={clsx(!local.asChild && styles.controlButton, local.class)}
      stage={local.stage}
      {...others}
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
      data-slot="floating-panel-close-trigger"
      class={clsx(!local.asChild && styles.controlButton, local.class)}
      {...others}
    />
  );
}

function FloatingPanelCloseIcon(props: FloatingPanelCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <FloatingPanelPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="floating-panel-close-icon"
          aria-label={local['aria-label'] ?? DEFAULT_CLOSE_BUTTON_LABEL}
          aria-labelledby={local['aria-labelledby']}
          class={clsx(styles.controlButton, local.class)}
        >
          {resolvedChildren()}
        </CloseButton.Root>
      )}
      {...others}
    />
  );
}

function FloatingPanelBody(props: ComponentProps<typeof FloatingPanelPrimitive.Body>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Body
      data-slot="floating-panel-body"
      class={clsx(styles.body, local.class)}
      {...others}
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
      class={clsx(styles.footer, local.class)}
    />
  );
}

function FloatingPanelResizeTrigger(
  props: ComponentProps<typeof FloatingPanelPrimitive.ResizeTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.ResizeTrigger
      data-slot="floating-panel-resize-trigger"
      class={clsx(styles.resizeTrigger, local.class)}
      {...others}
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
      data-slot="floating-panel-drag-indicator"
      class={clsx(styles.dragIndicator, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <GripIcon />}
    </span>
  );
}

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
export type { FloatingPanelRootProps, FloatingPanelRootProviderProps };