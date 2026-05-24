import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import * as React from 'react';
import { PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './PreviewCard.module.css';

const DEFAULT_SIDE_OFFSET = 8;

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

type PreviewCardContentPositionerProps = Pick<
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
>;

type PreviewCardContentProps = PreviewCardPrimitive.Popup.Props &
  PreviewCardContentPositionerProps & {
    classNames?: PreviewCardContentClassNames;
    slotProps?: PreviewCardContentSlotProps;
    container?: PreviewCardPrimitive.Portal.Props['container'];
    withArrow?: boolean;
    arrow?: React.ReactNode;
    withBackdrop?: boolean;
  };

const PreviewCard = PreviewCardPrimitive.Root;
const createPreviewCardHandle = PreviewCardPrimitive.createHandle;

function PreviewCardTrigger({ className, render, ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="preview-card-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
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
  withArrow,
  arrow,
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
  const {
    portal: portalSlotProps,
    backdrop: backdropSlotProps,
    positioner: positionerSlotProps,
    arrow: arrowSlotProps,
    viewport: viewportSlotProps,
  } = slotProps ?? {};
  const { container: slotPortalContainer, ...restPortalSlotProps } = portalSlotProps ?? {};
  const resolvedContainer = container ?? slotPortalContainer;
  const resolvedPositionerProps: PreviewCardContentPositionerProps = {
    disableAnchorTracking: disableAnchorTracking ?? positionerSlotProps?.disableAnchorTracking,
    side: side ?? positionerSlotProps?.side,
    sideOffset: sideOffset ?? positionerSlotProps?.sideOffset ?? DEFAULT_SIDE_OFFSET,
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
  const showArrow = withArrow ?? true;

  return (
    <PreviewCardPortal
      className={classNames?.portal}
      container={resolvedContainer}
      {...restPortalSlotProps}
    >
      {withBackdrop ? (
        <PreviewCardBackdrop className={classNames?.backdrop} {...backdropSlotProps} />
      ) : null}
      <PreviewCardPositioner
        {...positionerSlotProps}
        {...resolvedPositionerProps}
        className={classNames?.positioner}
      >
        <PreviewCardPopup className={className} {...props}>
          {showArrow ? (
            <PreviewCardArrow className={classNames?.arrow} {...arrowSlotProps}>
              {arrow}
            </PreviewCardArrow>
          ) : null}
          <PreviewCardViewport className={classNames?.viewport} {...viewportSlotProps}>
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