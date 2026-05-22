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

type PopoverContentSlotProps = {
  portal?: Omit<PopoverPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<PopoverPrimitive.Backdrop.Props, 'className'>;
  positioner?: Omit<PopoverPrimitive.Positioner.Props, 'className' | 'children'>;
  arrow?: Omit<PopoverPrimitive.Arrow.Props, 'className' | 'children'>;
  viewport?: Omit<PopoverPrimitive.Viewport.Props, 'className' | 'children'>;
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
    slotProps?: PopoverContentSlotProps;
    container?: PopoverPrimitive.Portal.Props['container'];
    withArrow?: boolean;
    arrow?: boolean | React.ReactNode;
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
  slotProps,
  container,
  withArrow,
  arrow,
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
  children,
  ...props
}: PopoverContentProps) {
  const positionerProps = slotProps?.positioner;
  const resolvedPositionerProps: PopoverPrimitive.Positioner.Props = {
    ...positionerProps,
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
  const { container: portalPropsContainer, ...restPortalProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? portalPropsContainer;
  const showArrow = withArrow ?? (typeof arrow === 'boolean' ? arrow : true);
  const arrowContent = typeof arrow === 'boolean' ? null : arrow;

  return (
    <PopoverPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      {withBackdrop ? (
        <PopoverBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <PopoverPositioner {...resolvedPositionerProps} className={classNames?.positioner}>
        <PopoverPopup className={className} {...props}>
          {showArrow ? (
            <PopoverArrow className={classNames?.arrow} {...slotProps?.arrow}>
              {arrowContent}
            </PopoverArrow>
          ) : null}
          {withViewport ? (
            <PopoverViewport className={classNames?.viewport} {...slotProps?.viewport}>
              {children}
            </PopoverViewport>
          ) : (
            children
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
  PopoverTitleProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverBodyProps,
  PopoverFooterProps,
  PopoverCloseProps,
  PopoverContentClassNames,
  PopoverContentSlotProps,
  PopoverContentProps,
};