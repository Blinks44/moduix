import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import * as React from 'react';
import { PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './PreviewCard.module.css';

type PreviewCardContentClassNames = {
  portal?: PreviewCardPrimitive.Portal.Props['className'];
  backdrop?: PreviewCardPrimitive.Backdrop.Props['className'];
  positioner?: PreviewCardPrimitive.Positioner.Props['className'];
  arrow?: PreviewCardPrimitive.Arrow.Props['className'];
  viewport?: PreviewCardPrimitive.Viewport.Props['className'];
};

type PreviewCardContentSlotProps = {
  portal?: Omit<PreviewCardPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<PreviewCardPrimitive.Backdrop.Props, 'className'>;
  positioner?: Omit<PreviewCardPrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<PreviewCardPrimitive.Arrow.Props, 'className' | 'children'>;
  viewport?: Omit<PreviewCardPrimitive.Viewport.Props, 'className' | 'children'>;
};

type PreviewCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
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
    classNames?: PreviewCardContentClassNames;
    slotProps?: PreviewCardContentSlotProps;
    container?: PreviewCardPrimitive.Portal.Props['container'];
    arrow?: React.ReactNode;
    showArrow?: boolean;
    withBackdrop?: boolean;
  };

const PreviewCard = PreviewCardPrimitive.Root;
const createPreviewCardHandle = PreviewCardPrimitive.createHandle;

function PreviewCardTrigger({ className, render, ...props }: PreviewCardPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <PreviewCardPrimitive.Trigger
      data-slot="preview-card-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function PreviewCardPortal({ className, ...props }: PreviewCardPrimitive.Portal.Props) {
  return (
    <PreviewCardPrimitive.Portal
      data-slot="preview-card-portal"
      className={mergeClassName(className, styles.portal)}
      {...props}
    />
  );
}

function PreviewCardBackdrop({ className, ...props }: PreviewCardPrimitive.Backdrop.Props) {
  return (
    <PreviewCardPrimitive.Backdrop
      data-slot="preview-card-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function PreviewCardPositioner({ className, ...props }: PreviewCardPrimitive.Positioner.Props) {
  return (
    <PreviewCardPrimitive.Positioner
      data-slot="preview-card-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function PreviewCardPopup({ className, ...props }: PreviewCardPrimitive.Popup.Props) {
  return (
    <PreviewCardPrimitive.Popup
      data-slot="preview-card-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function PreviewCardArrow({ className, children, ...props }: PreviewCardPrimitive.Arrow.Props) {
  return (
    <PreviewCardPrimitive.Arrow
      data-slot="preview-card-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </PreviewCardPrimitive.Arrow>
  );
}

function PreviewCardViewport({ className, ...props }: PreviewCardPrimitive.Viewport.Props) {
  return (
    <PreviewCardPrimitive.Viewport
      data-slot="preview-card-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function PreviewCardContent({
  className,
  classNames,
  slotProps,
  container,
  arrow,
  showArrow = true,
  withBackdrop = false,
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
  ...props
}: PreviewCardContentProps) {
  const { container: portalPropsContainer, ...restPortalProps } = slotProps?.portal ?? {};
  const positionerProps = slotProps?.positioner;
  const portalContainer = container ?? portalPropsContainer;
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

  return (
    <PreviewCardPortal
      className={classNames?.portal}
      container={portalContainer}
      {...restPortalProps}
    >
      {withBackdrop ? (
        <PreviewCardBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <PreviewCardPositioner
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
        <PreviewCardPopup className={className} {...props}>
          {showArrow ? (
            <PreviewCardArrow className={classNames?.arrow} {...slotProps?.arrow}>
              {arrow ?? <ArrowSvg className={styles.arrowSvg} />}
            </PreviewCardArrow>
          ) : null}
          <PreviewCardViewport className={classNames?.viewport} {...slotProps?.viewport}>
            {children}
          </PreviewCardViewport>
        </PreviewCardPopup>
      </PreviewCardPositioner>
    </PreviewCardPortal>
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

type PreviewCardProps<Payload = unknown> = PreviewCardPrimitive.Root.Props<Payload>;
type PreviewCardHandle<Payload = unknown> = PreviewCardPrimitive.Handle<Payload>;
type PreviewCardTriggerProps = PreviewCardPrimitive.Trigger.Props;

export { PreviewCard, createPreviewCardHandle, PreviewCardTrigger, PreviewCardContent };

export type {
  PreviewCardProps,
  PreviewCardHandle,
  PreviewCardTriggerProps,
  PreviewCardContentProps,
  PreviewCardContentClassNames,
  PreviewCardContentSlotProps,
};