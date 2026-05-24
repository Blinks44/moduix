import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import * as React from 'react';
import { PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Tooltip.module.css';

type TooltipContentClassNames = {
  portal?: TooltipPrimitive.Portal.Props['className'];
  positioner?: TooltipPrimitive.Positioner.Props['className'];
  arrow?: TooltipPrimitive.Arrow.Props['className'];
  viewport?: TooltipPrimitive.Viewport.Props['className'];
};

type TooltipContentSlotProps = {
  portal?: Omit<TooltipPrimitive.Portal.Props, 'className' | 'children'>;
  positioner?: Omit<TooltipPrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<TooltipPrimitive.Arrow.Props, 'className' | 'children'>;
  viewport?: Omit<TooltipPrimitive.Viewport.Props, 'className' | 'children'>;
};

type TooltipContentPositionerProps = Pick<
  TooltipPrimitive.Positioner.Props,
  | 'disableAnchorTracking'
  | 'side'
  | 'sideOffset'
  | 'align'
  | 'alignOffset'
  | 'arrowPadding'
  | 'anchor'
  | 'collisionAvoidance'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'sticky'
  | 'positionMethod'
>;

type TooltipContentProps = TooltipPrimitive.Popup.Props &
  TooltipContentPositionerProps & {
    classNames?: TooltipContentClassNames;
    slotProps?: TooltipContentSlotProps;
    container?: TooltipPrimitive.Portal.Props['container'];
    withArrow?: boolean;
    arrow?: React.ReactNode;
  };

const Tooltip = TooltipPrimitive.Root;
const TooltipProvider = TooltipPrimitive.Provider;
const createTooltipHandle = TooltipPrimitive.createHandle;

function TooltipTrigger<Payload = unknown>({
  className,
  render,
  ...props
}: TooltipPrimitive.Trigger.Props<Payload>) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function TooltipPortal({ className, ...props }: TooltipPrimitive.Portal.Props) {
  return (
    <TooltipPrimitive.Portal
      data-slot="tooltip-portal"
      className={mergeClassName(className, styles.portal)}
      {...props}
    />
  );
}

function TooltipPositioner({ className, ...props }: TooltipPrimitive.Positioner.Props) {
  return (
    <TooltipPrimitive.Positioner
      data-slot="tooltip-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function TooltipPopup({ className, ...props }: TooltipPrimitive.Popup.Props) {
  return (
    <TooltipPrimitive.Popup
      data-slot="tooltip-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function TooltipArrow({ className, children, ...props }: TooltipPrimitive.Arrow.Props) {
  return (
    <TooltipPrimitive.Arrow
      data-slot="tooltip-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </TooltipPrimitive.Arrow>
  );
}

function TooltipViewport({ className, ...props }: TooltipPrimitive.Viewport.Props) {
  return (
    <TooltipPrimitive.Viewport
      data-slot="tooltip-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function TooltipContent({
  className,
  classNames,
  slotProps,
  container,
  withArrow,
  arrow,
  disableAnchorTracking,
  side,
  sideOffset,
  align,
  alignOffset,
  arrowPadding,
  anchor,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  sticky,
  positionMethod,
  children,
  ...popupProps
}: TooltipContentProps) {
  const {
    portal: portalSlotProps,
    positioner: positionerSlotProps,
    arrow: arrowSlotProps,
    viewport: viewportSlotProps,
  } = slotProps ?? {};

  const resolvedPositionerProps: TooltipContentPositionerProps = {
    ...positionerSlotProps,
    disableAnchorTracking: disableAnchorTracking ?? positionerSlotProps?.disableAnchorTracking,
    side: side ?? positionerSlotProps?.side,
    sideOffset: sideOffset ?? positionerSlotProps?.sideOffset ?? 8,
    align: align ?? positionerSlotProps?.align,
    alignOffset: alignOffset ?? positionerSlotProps?.alignOffset,
    arrowPadding: arrowPadding ?? positionerSlotProps?.arrowPadding,
    anchor: anchor ?? positionerSlotProps?.anchor,
    collisionAvoidance: collisionAvoidance ?? positionerSlotProps?.collisionAvoidance,
    collisionBoundary: collisionBoundary ?? positionerSlotProps?.collisionBoundary,
    collisionPadding: collisionPadding ?? positionerSlotProps?.collisionPadding,
    sticky: sticky ?? positionerSlotProps?.sticky,
    positionMethod: positionMethod ?? positionerSlotProps?.positionMethod,
  };

  const { container: portalSlotContainer, ...restPortalSlotProps } = portalSlotProps ?? {};
  const portalContainer = container ?? portalSlotContainer;
  const showArrow = withArrow ?? true;

  return (
    <TooltipPortal
      className={classNames?.portal}
      container={portalContainer}
      {...restPortalSlotProps}
    >
      <TooltipPositioner {...resolvedPositionerProps} className={classNames?.positioner}>
        <TooltipPopup className={className} {...popupProps}>
          {showArrow ? (
            <TooltipArrow className={classNames?.arrow} {...arrowSlotProps}>
              {arrow}
            </TooltipArrow>
          ) : null}
          <TooltipViewport className={classNames?.viewport} {...viewportSlotProps}>
            {children}
          </TooltipViewport>
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
  );
}

function ArrowSvg(props: React.ComponentProps<'svg'>) {
  return (
    <PopupArrowIcon
      fillClassName={styles.arrowFill}
      outerStrokeClassName={styles.arrowOuterStroke}
      innerStrokeClassName={styles.arrowInnerStroke}
      {...props}
    />
  );
}

type TooltipProps<Payload = unknown> = TooltipPrimitive.Root.Props<Payload>;
type TooltipProviderProps = TooltipPrimitive.Provider.Props;
type TooltipHandle<Payload = unknown> = TooltipPrimitive.Handle<Payload>;
type TooltipTriggerProps<Payload = unknown> = TooltipPrimitive.Trigger.Props<Payload>;

export { Tooltip, TooltipProvider, createTooltipHandle, TooltipTrigger, TooltipContent };

export type {
  TooltipProps,
  TooltipProviderProps,
  TooltipHandle,
  TooltipTriggerProps,
  TooltipContentClassNames,
  TooltipContentSlotProps,
  TooltipContentProps,
};