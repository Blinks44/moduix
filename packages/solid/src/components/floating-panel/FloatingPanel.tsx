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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <FloatingPanelPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
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
        class={clsx(styles.positioner, local.class)}
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
      class={clsx(styles.content, local.class)}
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
      class={clsx(styles.dragTrigger, local.class)}
      {...others}
      data-slot="floating-panel-drag-trigger"
    />
  );
}

function FloatingPanelHeader(props: ComponentProps<typeof FloatingPanelPrimitive.Header>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Header
      class={clsx(styles.header, local.class)}
      {...others}
      data-slot="floating-panel-header"
    />
  );
}

function FloatingPanelTitle(props: ComponentProps<typeof FloatingPanelPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Title
      class={clsx(styles.title, local.class)}
      {...others}
      data-slot="floating-panel-title"
    />
  );
}

function FloatingPanelControl(props: ComponentProps<typeof FloatingPanelPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <FloatingPanelPrimitive.Control
      class={clsx(styles.control, local.class)}
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
      class={clsx(!local.asChild && styles.controlButton, local.class)}
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
      class={clsx(!local.asChild && styles.controlButton, local.class)}
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
          class={clsx(styles.controlButton, local.class)}
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
      class={clsx(styles.body, local.class)}
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
      class={clsx(styles.resizeTrigger, local.class)}
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
      class={clsx(styles.dragIndicator, local.class)}
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