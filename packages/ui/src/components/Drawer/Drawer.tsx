import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import { clsx } from 'clsx';
import * as React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@/primitives';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Drawer.module.css';

type DrawerContentClassNames = {
  portal?: DrawerPrimitive.Portal.Props['className'];
  backdrop?: DrawerPrimitive.Backdrop.Props['className'];
  viewport?: DrawerPrimitive.Viewport.Props['className'];
  content?: DrawerPrimitive.Content.Props['className'];
  handle?: React.ComponentProps<'div'>['className'];
};

type DrawerContentSlotProps = {
  portal?: Omit<DrawerPrimitive.Portal.Props, 'className' | 'children'>;
  backdrop?: Omit<DrawerPrimitive.Backdrop.Props, 'className'>;
  viewport?: Omit<DrawerPrimitive.Viewport.Props, 'className' | 'children'>;
  content?: Omit<DrawerPrimitive.Content.Props, 'className' | 'children'>;
  handle?: Omit<React.ComponentProps<'div'>, 'className'>;
};

type DrawerContentProps = Omit<DrawerPrimitive.Popup.Props, 'className'> & {
  className?: DrawerPrimitive.Popup.Props['className'];
  classNames?: DrawerContentClassNames;
  slotProps?: DrawerContentSlotProps;
  container?: DrawerPrimitive.Portal.Props['container'];
  withBackdrop?: boolean;
  withHandle?: boolean;
  snapLayout?: boolean;
  variant?: 'bleed' | 'island';
  disableInitialAnimation?: boolean;
};

type DrawerProps<Payload = unknown> = DrawerPrimitive.Root.Props<Payload> & {
  persistent?: boolean;
};

function Drawer<Payload = unknown>({
  persistent = false,
  onOpenChange,
  onSnapPointChange,
  ...props
}: DrawerProps<Payload>) {
  const handleOpenChange: DrawerPrimitive.Root.Props<Payload>['onOpenChange'] = (
    open,
    eventDetails,
  ) => {
    if (persistent && !open) {
      eventDetails.cancel();
      return;
    }

    onOpenChange?.(open, eventDetails);
  };

  const handleSnapPointChange: DrawerPrimitive.Root.Props<Payload>['onSnapPointChange'] = (
    snapPoint,
    eventDetails,
  ) => {
    if (persistent && snapPoint === null) {
      eventDetails.cancel();
      return;
    }

    onSnapPointChange?.(snapPoint, eventDetails);
  };

  return (
    <DrawerPrimitive.Root
      onOpenChange={handleOpenChange}
      onSnapPointChange={handleSnapPointChange}
      {...props}
    />
  );
}

const DrawerProvider = DrawerPrimitive.Provider;
const createDrawerHandle = DrawerPrimitive.createHandle;

function DrawerIndent({ className, ...props }: DrawerPrimitive.Indent.Props) {
  return (
    <DrawerPrimitive.Indent
      data-slot="drawer-indent"
      className={mergeClassName(className, styles.indent)}
      {...props}
    />
  );
}

function DrawerIndentBackground({ className, ...props }: DrawerPrimitive.IndentBackground.Props) {
  return (
    <DrawerPrimitive.IndentBackground
      data-slot="drawer-indent-background"
      className={mergeClassName(className, styles.indentBackground)}
      {...props}
    />
  );
}

function DrawerTrigger({ className, render, ...props }: DrawerPrimitive.Trigger.Props) {
  const triggerClassName = render ? className : mergeClassName(className, styles.trigger);

  return (
    <DrawerPrimitive.Trigger
      data-slot="drawer-trigger"
      render={render}
      className={triggerClassName}
      {...props}
    />
  );
}

function DrawerSwipeArea({ className, ...props }: DrawerPrimitive.SwipeArea.Props) {
  return (
    <DrawerPrimitive.SwipeArea
      data-slot="drawer-swipe-area"
      className={mergeClassName(className, styles.swipeArea)}
      {...props}
    />
  );
}

function DrawerPortal({ className, ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" className={className} {...props} />;
}

function DrawerBackdrop({ className, ...props }: DrawerPrimitive.Backdrop.Props) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-backdrop"
      className={mergeClassName(className, styles.backdrop)}
      {...props}
    />
  );
}

function DrawerViewport({ className, ...props }: DrawerPrimitive.Viewport.Props) {
  return (
    <DrawerPrimitive.Viewport
      data-slot="drawer-viewport"
      className={mergeClassName(className, styles.viewport)}
      {...props}
    />
  );
}

function DrawerPopup({ className, style, ...props }: DrawerPrimitive.Popup.Props) {
  return (
    <DrawerPrimitive.Popup
      data-slot="drawer-popup"
      className={mergeClassName(className, styles.popup)}
      style={{ outline: 'none', ...style }}
      {...props}
    />
  );
}

function DrawerContentSlot({ className, ...props }: DrawerPrimitive.Content.Props) {
  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={mergeClassName(className, styles.content)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={mergeClassName(className, styles.title)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={mergeClassName(className, styles.description)}
      {...props}
    />
  );
}

function DrawerClose({ className, ...props }: DrawerPrimitive.Close.Props) {
  return (
    <DrawerPrimitive.Close
      data-slot="drawer-close"
      className={mergeClassName(className, styles.close)}
      {...props}
    />
  );
}

type DrawerSnapToggleProps = React.ComponentProps<'button'> & {
  expanded: boolean;
};

function DrawerSnapToggle({
  expanded,
  className,
  children,
  type = 'button',
  ...props
}: DrawerSnapToggleProps) {
  return (
    <button
      data-slot="drawer-snap-toggle"
      data-base-ui-swipe-ignore=""
      aria-label={expanded ? 'Collapse drawer' : 'Expand drawer'}
      aria-pressed={expanded}
      type={type}
      className={clsx(styles.snapToggle, className)}
      {...props}
    >
      {children ?? (expanded ? <ChevronDownIcon /> : <ChevronUpIcon />)}
    </button>
  );
}

function DrawerHandle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-handle" className={clsx(styles.handle, className)} {...props} />;
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={clsx(styles.header, className)} {...props} />;
}

function DrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-body" className={clsx(styles.body, className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={clsx(styles.footer, className)} {...props} />;
}

function DrawerContent({
  withBackdrop = true,
  withHandle = true,
  snapLayout = false,
  variant = 'bleed',
  disableInitialAnimation = false,
  className,
  classNames,
  slotProps,
  container,
  children,
  ...props
}: DrawerContentProps) {
  const [mountReady, setMountReady] = React.useState(!disableInitialAnimation);

  React.useEffect(() => {
    if (!disableInitialAnimation) {
      setMountReady(true);
      return;
    }

    setMountReady(false);
    let frame = 0;
    frame = window.requestAnimationFrame(() => {
      setMountReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [disableInitialAnimation]);

  const { container: slotPortalContainer, ...restPortalSlotProps } = slotProps?.portal ?? {};
  const portalContainer = container ?? slotPortalContainer;

  return (
    <DrawerPortal
      className={classNames?.portal}
      container={portalContainer}
      {...restPortalSlotProps}
    >
      {withBackdrop ? (
        <DrawerBackdrop className={classNames?.backdrop} {...slotProps?.backdrop} />
      ) : null}
      <DrawerViewport className={classNames?.viewport} {...slotProps?.viewport}>
        <DrawerPopup
          data-snap-layout={snapLayout ? '' : undefined}
          data-variant={variant}
          data-disable-initial-animation={disableInitialAnimation ? 'true' : undefined}
          data-mount-ready={mountReady ? 'true' : 'false'}
          className={className}
          {...props}
        >
          {withHandle ? (
            <DrawerHandle className={classNames?.handle} {...slotProps?.handle} />
          ) : null}
          <DrawerContentSlot className={classNames?.content} {...slotProps?.content}>
            {children}
          </DrawerContentSlot>
        </DrawerPopup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

type DrawerHandle<Payload = unknown> = DrawerPrimitive.Handle<Payload>;
type DrawerTriggerProps = DrawerPrimitive.Trigger.Props;
type DrawerSwipeAreaProps = DrawerPrimitive.SwipeArea.Props;
type DrawerTitleProps = DrawerPrimitive.Title.Props;
type DrawerDescriptionProps = DrawerPrimitive.Description.Props;
type DrawerCloseProps = DrawerPrimitive.Close.Props;
type DrawerHeaderProps = React.ComponentProps<'div'>;
type DrawerBodyProps = React.ComponentProps<'div'>;
type DrawerFooterProps = React.ComponentProps<'div'>;
type DrawerSnapPoint = NonNullable<DrawerProps['snapPoints']>[number];

export {
  Drawer,
  DrawerProvider,
  createDrawerHandle,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerTrigger,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerSnapToggle,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
};

export type {
  DrawerProps,
  DrawerHandle,
  DrawerTriggerProps,
  DrawerSwipeAreaProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerCloseProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
  DrawerContentProps,
  DrawerContentClassNames,
  DrawerContentSlotProps,
  DrawerSnapToggleProps,
  DrawerSnapPoint,
};