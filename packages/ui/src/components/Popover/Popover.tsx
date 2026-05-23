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

type PopoverContentPositionerProps = Pick<
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
>;

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  PopoverContentPositionerProps & {
    classNames?: PopoverContentClassNames;
    slotProps?: PopoverContentSlotProps;
    container?: PopoverPrimitive.Portal.Props['container'];
    withArrow?: boolean;
    arrowContent?: React.ReactNode;
    withBackdrop?: boolean;
    withViewport?: boolean;
  };

const Popover = PopoverPrimitive.Root;
const createPopoverHandle = PopoverPrimitive.createHandle;

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverPrimitive.Trigger.Props
>(function PopoverTrigger({ className, render, ...props }, ref) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <PopoverPrimitive.Trigger
      ref={ref as never}
      data-slot="popover-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
});

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

const PopoverPopup = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Popup>,
  PopoverPrimitive.Popup.Props
>(function PopoverPopup({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Popup
      ref={ref}
      data-slot="popover-popup"
      className={mergeClassName(className, styles.popup)}
      {...props}
    />
  );
});

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

const PopoverTitle = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Title>,
  PopoverPrimitive.Title.Props
>(function PopoverTitle({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Title
      ref={ref}
      data-slot="popover-title"
      className={mergeClassName(className, styles.title)}
      {...props}
    />
  );
});

const PopoverDescription = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Description>,
  PopoverPrimitive.Description.Props
>(function PopoverDescription({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      data-slot="popover-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
});

const PopoverHeader = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function PopoverHeader({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="popover-header"
        className={clsx(styles.header, className)}
        {...props}
      />
    );
  },
);

const PopoverBody = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function PopoverBody({ className, ...props }, ref) {
    return (
      <div ref={ref} data-slot="popover-body" className={clsx(styles.body, className)} {...props} />
    );
  },
);

const PopoverFooter = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  function PopoverFooter({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="popover-footer"
        className={clsx(styles.footer, className)}
        {...props}
      />
    );
  },
);

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  PopoverPrimitive.Close.Props
>(function PopoverClose({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Close
      ref={ref}
      data-slot="popover-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
});

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Popup>,
  PopoverContentProps
>(function PopoverContent(
  {
    className,
    classNames,
    slotProps,
    container,
    withArrow,
    arrowContent,
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
  },
  ref,
) {
  const portalProps = slotProps?.portal;
  const backdropProps = slotProps?.backdrop;
  const positionerProps = slotProps?.positioner;
  const arrowProps = slotProps?.arrow;
  const viewportProps = slotProps?.viewport;
  const { container: portalPropsContainer, ...restPortalProps } = portalProps ?? {};
  const portalContainer = container ?? portalPropsContainer;
  const resolvedPositionerProps: PopoverContentPositionerProps = {
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
  const showArrow = withArrow ?? true;

  return (
    <PopoverPortal className={classNames?.portal} container={portalContainer} {...restPortalProps}>
      {withBackdrop ? (
        <PopoverBackdrop className={classNames?.backdrop} {...backdropProps} />
      ) : null}
      <PopoverPositioner
        {...positionerProps}
        {...resolvedPositionerProps}
        className={classNames?.positioner}
      >
        <PopoverPopup ref={ref} className={className} {...props}>
          {showArrow ? (
            <PopoverArrow className={classNames?.arrow} {...arrowProps}>
              {arrowContent}
            </PopoverArrow>
          ) : null}
          {withViewport ? (
            <PopoverViewport className={classNames?.viewport} {...viewportProps}>
              {children}
            </PopoverViewport>
          ) : (
            children
          )}
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
  );
});

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
type PopoverHeaderProps = React.ComponentPropsWithoutRef<'div'>;
type PopoverBodyProps = React.ComponentPropsWithoutRef<'div'>;
type PopoverFooterProps = React.ComponentPropsWithoutRef<'div'>;
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