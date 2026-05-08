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

type TooltipContentProps = TooltipPrimitive.Popup.Props &
  Pick<
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
  > & {
    classNames?: TooltipContentClassNames;
    container?: TooltipPrimitive.Portal.Props['container'];
    positionerProps?: Omit<TooltipPrimitive.Positioner.Props, 'className' | 'children'>;
    arrowProps?: Omit<TooltipPrimitive.Arrow.Props, 'className' | 'children'>;
    arrow?: React.ReactNode;
    showArrow?: boolean;
    portalProps?: Omit<TooltipPrimitive.Portal.Props, 'className' | 'children'>;
    viewportProps?: Omit<TooltipPrimitive.Viewport.Props, 'className' | 'children'>;
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
  container,
  arrowProps,
  arrow,
  showArrow = true,
  portalProps,
  viewportProps,
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
  positionerProps,
  ...props
}: TooltipContentProps) {
  const resolvedDisableAnchorTracking =
    disableAnchorTracking ?? positionerProps?.disableAnchorTracking;
  const resolvedSide = side ?? positionerProps?.side;
  const resolvedSideOffset = sideOffset ?? positionerProps?.sideOffset ?? 8;
  const resolvedAlign = align ?? positionerProps?.align;
  const resolvedAlignOffset = alignOffset ?? positionerProps?.alignOffset;
  const resolvedArrowPadding = arrowPadding ?? positionerProps?.arrowPadding;
  const resolvedAnchor = anchor ?? positionerProps?.anchor;
  const resolvedCollisionAvoidance = collisionAvoidance ?? positionerProps?.collisionAvoidance;
  const resolvedCollisionBoundary = collisionBoundary ?? positionerProps?.collisionBoundary;
  const resolvedCollisionPadding = collisionPadding ?? positionerProps?.collisionPadding;
  const resolvedSticky = sticky ?? positionerProps?.sticky;
  const resolvedPositionMethod = positionMethod ?? positionerProps?.positionMethod;
  const { container: portalPropsContainer, ...restPortalProps } = portalProps ?? {};
  const portalContainer = container ?? portalPropsContainer;

  return (
    <TooltipPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      <TooltipPositioner
        {...positionerProps}
        disableAnchorTracking={resolvedDisableAnchorTracking}
        side={resolvedSide}
        sideOffset={resolvedSideOffset}
        align={resolvedAlign}
        alignOffset={resolvedAlignOffset}
        arrowPadding={resolvedArrowPadding}
        anchor={resolvedAnchor}
        collisionAvoidance={resolvedCollisionAvoidance}
        collisionBoundary={resolvedCollisionBoundary}
        collisionPadding={resolvedCollisionPadding}
        sticky={resolvedSticky}
        positionMethod={resolvedPositionMethod}
        className={classNames?.positioner}
      >
        <TooltipPopup className={className} {...props}>
          {showArrow ? (
            <TooltipArrow className={classNames?.arrow} {...arrowProps}>
              {arrow ?? <ArrowSvg className={styles.arrowSvg} />}
            </TooltipArrow>
          ) : null}
          <TooltipViewport className={classNames?.viewport} {...viewportProps}>
            {props.children}
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
  TooltipContentProps,
};