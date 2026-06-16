import type { ComponentProps } from 'react';
import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { clsx } from 'clsx';
import { PopupArrowIcon } from '@/lib/moduix/icons/ui';
import { mergeClassName } from '@/lib/moduix/mergeClassName';
import styles from './Popover.module.css';

type PopoverContentProps = PopoverPrimitive.Popup.Props & {
  showArrow?: boolean;
  side?: PopoverPrimitive.Positioner.Props['side'];
  sideOffset?: PopoverPrimitive.Positioner.Props['sideOffset'];
  align?: PopoverPrimitive.Positioner.Props['align'];
  alignOffset?: PopoverPrimitive.Positioner.Props['alignOffset'];
  arrowPadding?: PopoverPrimitive.Positioner.Props['arrowPadding'];
  collisionAvoidance?: PopoverPrimitive.Positioner.Props['collisionAvoidance'];
  collisionBoundary?: PopoverPrimitive.Positioner.Props['collisionBoundary'];
  collisionPadding?: PopoverPrimitive.Positioner.Props['collisionPadding'];
};

const POPOVER_CONTENT_SIDE_OFFSET = 8;
const Popover = PopoverPrimitive.Root;
const createPopoverHandle = PopoverPrimitive.createHandle;

function PopoverTrigger({ className, render, ...props }: PopoverPrimitive.Trigger.Props) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      render={render}
      className={render ? className : mergeClassName(className, styles.trigger)}
      {...props}
    />
  );
}

function PopoverPortal({ className, ...props }: PopoverPrimitive.Portal.Props) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" className={className} {...props} />;
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
      {children ?? (
        <PopupArrowIcon
          className={styles.arrowSvg}
          fillClassName={styles.arrowFill}
          outerStrokeClassName={styles.arrowOuterStroke}
          innerStrokeClassName={styles.arrowInnerStroke}
        />
      )}
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
  children,
  showArrow = false,
  side,
  sideOffset = POPOVER_CONTENT_SIDE_OFFSET,
  align,
  alignOffset,
  arrowPadding,
  collisionAvoidance,
  collisionBoundary,
  collisionPadding,
  ...popupProps
}: PopoverContentProps) {
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