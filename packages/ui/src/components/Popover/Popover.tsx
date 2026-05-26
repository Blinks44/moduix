import type { ComponentProps } from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { clsx } from 'clsx';
import { PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Popover.module.css';

const Popover = PopoverPrimitive.Root;
const createPopoverHandle = PopoverPrimitive.createHandle;

function PopoverTrigger({ className, render, ...props }: PopoverPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function PopoverPortal({ className, ...props }: PopoverPrimitive.Portal.Props) {
  return (
    <PopoverPrimitive.Portal
      data-slot="popover-portal"
      className={mergeClassName(className, styles.portal)}
      {...props}
    />
  );
}

function PopoverBackdrop({ className, ...props }: PopoverPrimitive.Backdrop.Props) {
  return (
    <PopoverPrimitive.Backdrop
      data-slot="popover-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function PopoverPositioner({ className, ...props }: PopoverPrimitive.Positioner.Props) {
  return (
    <PopoverPrimitive.Positioner
      data-slot="popover-positioner"
      className={mergeClassName(className, styles.positioner)}
      {...props}
    />
  );
}

function PopoverPopup({ className, ...props }: PopoverPrimitive.Popup.Props) {
  return (
    <PopoverPrimitive.Popup
      data-slot="popover-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
}

function PopoverViewport({ className, ...props }: PopoverPrimitive.Viewport.Props) {
  return (
    <PopoverPrimitive.Viewport
      data-slot="popover-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function PopoverArrow({ className, children, ...props }: PopoverPrimitive.Arrow.Props) {
  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      className={mergeClassName(className, styles.arrow)}
      {...props}
    >
      {children ?? <ArrowSvg className={styles.arrowSvg} />}
    </PopoverPrimitive.Arrow>
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={mergeClassName(className, styles.title)}
      {...props}
    />
  );
}

function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
}

function PopoverHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="popover-header" className={clsx(styles.header, className)} {...props} />;
}

function PopoverBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="popover-body" className={clsx(styles.body, className)} {...props} />;
}

function PopoverFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="popover-footer" className={clsx(styles.footer, className)} {...props} />;
}

function PopoverClose({ className, ...props }: PopoverPrimitive.Close.Props) {
  return (
    <PopoverPrimitive.Close
      data-slot="popover-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
}

function PopoverContent({
  className,
  showArrow = false,
  sideOffset = 8,
  side,
  align,
  alignOffset,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  children,
  ...popupProps
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
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
    <PopoverPortal>
      <PopoverPositioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        arrowPadding={arrowPadding}
        collisionAvoidance={collisionAvoidance}
        collisionBoundary={collisionBoundary}
        collisionPadding={collisionPadding}
      >
        <PopoverPopup className={className} {...popupProps}>
          {showArrow ? <PopoverArrow /> : null}
          {children}
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
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
  Popover,
  createPopoverHandle,
  PopoverTrigger,
  PopoverPortal,
  PopoverBackdrop,
  PopoverPositioner,
  PopoverPopup,
  PopoverViewport,
  PopoverArrow,
  PopoverTitle,
  PopoverDescription,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverClose,
  PopoverContent,
};