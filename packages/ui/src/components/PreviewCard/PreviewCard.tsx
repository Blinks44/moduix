import type { ComponentProps } from 'react';
import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import { PopupArrowIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './PreviewCard.module.css';

const DEFAULT_SIDE_OFFSET = 8;

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
  disableAnchorTracking,
  side,
  sideOffset = DEFAULT_SIDE_OFFSET,
  align,
  alignOffset,
  arrowPadding,
  anchor,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  sticky,
  positionMethod,
  showArrow = false,
  children,
  ...props
}: PreviewCardPrimitive.Popup.Props &
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
    showArrow?: boolean;
  }) {
  return (
    <PreviewCardPortal>
      <PreviewCardPositioner
        disableAnchorTracking={disableAnchorTracking}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        anchor={anchor}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
        sticky={sticky}
        positionMethod={positionMethod}
      >
        <PreviewCardPopup className={className} {...props}>
          {showArrow ? <PreviewCardArrow /> : null}
          <PreviewCardViewport>{children}</PreviewCardViewport>
        </PreviewCardPopup>
      </PreviewCardPositioner>
    </PreviewCardPortal>
  );
}

function ArrowSvg(props: ComponentProps<'svg'>) {
  return (
    <PopupArrowIcon
      fillClassName={styles.arrowFill}
      outerStrokeClassName={styles.arrowOuterStroke}
      innerStrokeClassName={styles.arrowInnerStroke}
      {...props}
    />
  );
}

export {
  PreviewCard,
  createPreviewCardHandle,
  PreviewCardTrigger,
  PreviewCardPortal,
  PreviewCardBackdrop,
  PreviewCardPositioner,
  PreviewCardPopup,
  PreviewCardArrow,
  PreviewCardViewport,
  PreviewCardContent,
};