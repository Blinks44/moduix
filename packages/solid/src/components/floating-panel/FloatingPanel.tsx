import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  FloatingPanel as FloatingPanelPrimitive,
  useFloatingPanel,
  useFloatingPanelContext,
  type FloatingPanelResizeTriggerAxis,
  type FloatingPanelStage,
} from '@ark-ui/solid/floating-panel';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { For, children, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { GripIcon, MaximizeIcon, MinusIcon, RestoreIcon } from '@/lib/moduix/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './FloatingPanel.module.css';

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
      class={clsx(styles.content, local.class)}
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
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <FloatingPanelPrimitive.StageTrigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.controlButton, local.class)}
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
      class={clsx(!local.asChild && styles.controlButton, local.class)}
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
          class={clsx(styles.controlButton, local.class)}
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