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
    withArrow?: boolean;
    arrow?: boolean | React.ReactNode;
    withBackdrop?: boolean;
  };

type PreviewCardPositionerControlProps = Pick<
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
  const { container: portalPropsContainer, ...restPortalProps } = slotProps?.portal ?? {};
  const positionerProps = slotProps?.positioner;
  const portalContainer = container ?? portalPropsContainer;
  const resolvedPositionerProps: PreviewCardPositionerControlProps = {
    disableAnchorTracking: disableAnchorTracking ?? positionerProps?.disableAnchorTracking,
    side: side ?? positionerProps?.side,
    sideOffset: sideOffset ?? positionerProps?.sideOffset ?? 8,
    align: align ?? positionerProps?.align,
    alignOffset: alignOffset ?? positionerProps?.alignOffset,
    arrowPadding: arrowPadding ?? positionerProps?.arrowPadding,
    anchor: anchor ?? positionerProps?.anchor,
    collisionAvoidance: collisionAvoidance ?? positionerProps?.collisionAvoidance,
    collisionBoundary: collisionBoundary ?? positionerProps?.collisionBoundary,
    collisionPadding: collisionPadding ?? positionerProps?.collisionPadding,
    sticky: sticky ?? positionerProps?.sticky,
    positionMethod: positionMethod ?? positionerProps?.positionMethod,
  };
  const showArrow = withArrow ?? (typeof arrow === 'boolean' ? arrow : true);
  const arrowContent = typeof arrow === 'boolean' ? undefined : arrow;

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
        {...resolvedPositionerProps}
        className={classNames?.positioner}
      >
        <PreviewCardPopup className={className} {...props}>
          {showArrow ? (
            <PreviewCardArrow className={classNames?.arrow} {...slotProps?.arrow}>
              {arrowContent}
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