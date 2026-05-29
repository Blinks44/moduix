import type { ComponentProps } from 'react';
import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { PopupArrowIcon } from '@/icons/ui';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Tooltip.module.css';

const DEFAULT_SIDE_OFFSET = 8;

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
  return <TooltipPrimitive.Portal data-slot="tooltip-portal" className={className} {...props} />;
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
  showArrow = false,
  sideOffset = DEFAULT_SIDE_OFFSET,
  side,
  align,
  alignOffset,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  children,
  ...popupProps
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
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
  }) {
  return (
    <TooltipPortal>
      <TooltipPositioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
      >
        <TooltipPopup className={className} {...popupProps}>
          {showArrow ? <TooltipArrow /> : null}
          <TooltipViewport>{children}</TooltipViewport>
        </TooltipPopup>
      </TooltipPositioner>
    </TooltipPortal>
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
  Tooltip,
  TooltipProvider,
  createTooltipHandle,
  TooltipTrigger,
  TooltipPortal,
  TooltipPositioner,
  TooltipPopup,
  TooltipArrow,
  TooltipViewport,
  TooltipContent,
};