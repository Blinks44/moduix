import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { clsx } from 'clsx';
import * as React from 'react';
import { PopupArrowIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Popover.module.css';

type PopoverContentClassNames = {
  portal?: PopoverPrimitive.Portal.Props['className'];
  backdrop?: PopoverPrimitive.Backdrop.Props['className'];
  positioner?: PopoverPrimitive.Positioner.Props['className'];
  viewport?: PopoverPrimitive.Viewport.Props['className'];
  arrow?: PopoverPrimitive.Arrow.Props['className'];
};

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
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
    classNames?: PopoverContentClassNames;
    container?: PopoverPrimitive.Portal.Props['container'];
    positionerProps?: Omit<PopoverPrimitive.Positioner.Props, 'className' | 'children'>;
    arrowProps?: Omit<PopoverPrimitive.Arrow.Props, 'className' | 'children'>;
    arrow?: React.ReactNode;
    showArrow?: boolean;
    portalProps?: Omit<PopoverPrimitive.Portal.Props, 'className' | 'children'>;
    backdropProps?: Omit<PopoverPrimitive.Backdrop.Props, 'className'>;
    viewportProps?: Omit<PopoverPrimitive.Viewport.Props, 'className' | 'children'>;
    withBackdrop?: boolean;
    withViewport?: boolean;
  };

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

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-header" className={clsx(styles.header, className)} {...props} />;
}

function PopoverBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="popover-body" className={clsx(styles.body, className)} {...props} />;
}

function PopoverFooter({ className, ...props }: React.ComponentProps<'div'>) {
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
  classNames,
  container,
  arrowProps,
  arrow,
  showArrow = true,
  portalProps,
  backdropProps,
  viewportProps,
  withBackdrop = false,
  withViewport = false,
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
}: PopoverContentProps) {
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
    <PopoverPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      {withBackdrop ? (
        <PopoverBackdrop className={classNames?.backdrop} {...backdropProps} />
      ) : null}
      <PopoverPositioner
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
        <PopoverPopup className={className} {...props}>
          {showArrow ? (
            <PopoverArrow className={classNames?.arrow} {...arrowProps}>
              {arrow ?? <ArrowSvg className={styles.arrowSvg} />}
            </PopoverArrow>
          ) : null}
          {withViewport ? (
            <PopoverViewport className={classNames?.viewport} {...viewportProps}>
              {props.children}
            </PopoverViewport>
          ) : (
            props.children
          )}
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
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

type PopoverProps<Payload = unknown> = PopoverPrimitive.Root.Props<Payload>;
type PopoverHandle<Payload = unknown> = PopoverPrimitive.Handle<Payload>;
type PopoverTriggerProps = PopoverPrimitive.Trigger.Props;
type PopoverViewportProps = PopoverPrimitive.Viewport.Props;
type PopoverArrowProps = PopoverPrimitive.Arrow.Props;
type PopoverTitleProps = PopoverPrimitive.Title.Props;
type PopoverDescriptionProps = PopoverPrimitive.Description.Props;
type PopoverHeaderProps = React.ComponentProps<'div'>;
type PopoverBodyProps = React.ComponentProps<'div'>;
type PopoverFooterProps = React.ComponentProps<'div'>;
type PopoverCloseProps = PopoverPrimitive.Close.Props;

export {
  Popover,
  createPopoverHandle,
  PopoverTrigger,
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

export type {
  PopoverProps,
  PopoverHandle,
  PopoverTriggerProps,
  PopoverViewportProps,
  PopoverArrowProps,
  PopoverTitleProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverBodyProps,
  PopoverFooterProps,
  PopoverCloseProps,
  PopoverContentClassNames,
  PopoverContentProps,
};