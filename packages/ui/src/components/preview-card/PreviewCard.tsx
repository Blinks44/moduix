import type { ComponentProps } from 'react';
import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card';
import { PopupArrowIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './PreviewCard.module.css';

type PreviewCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    | 'side'
    | 'sideOffset'
    | 'align'
    | 'alignOffset'
    | 'arrowPadding'
    | 'collisionAvoidance'
    | 'collisionBoundary'
    | 'collisionPadding'
  > & {
    showArrow?: boolean;
  };

const DEFAULT_SIDE_OFFSET = 8;

const PreviewCard = PreviewCardPrimitive.Root;
const createPreviewCardHandle = PreviewCardPrimitive.createHandle;

function PreviewCardTrigger<Payload = unknown>({
  className,
  render,
  ...props
}: PreviewCardPrimitive.Trigger.Props<Payload>) {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="preview-card-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
}

function PreviewCardPortal(props: PreviewCardPrimitive.Portal.Props) {
  return <PreviewCardPrimitive.Portal data-slot="preview-card-portal" {...props} />;
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
  sideOffset = DEFAULT_SIDE_OFFSET,
  side,
  align,
  alignOffset,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  showArrow = false,
  children,
  ...props
}: PreviewCardContentProps) {
  return (
    <PreviewCardPortal>
      <PreviewCardPositioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
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