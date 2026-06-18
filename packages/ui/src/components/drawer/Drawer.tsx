import type { ComponentProps, ComponentRef } from 'react';
import {
  Drawer as DrawerPrimitive,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from '@ark-ui/react/drawer';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { CloseButton } from '../close-button';
import styles from './Drawer.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close drawer';

function DrawerRoot({
  lazyMount = true,
  unmountOnExit = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />;
}

function DrawerRootProvider({
  lazyMount = true,
  unmountOnExit = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.RootProvider>) {
  return (
    <DrawerPrimitive.RootProvider lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
  );
}

function DrawerStack(props: ComponentProps<typeof DrawerPrimitive.Stack>) {
  return <DrawerPrimitive.Stack {...props} />;
}

const DrawerTrigger = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Trigger>,
  ComponentProps<typeof DrawerPrimitive.Trigger>
>(function DrawerTrigger({ asChild, className, ...props }, ref) {
  return (
    <DrawerPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      data-slot="drawer-trigger"
      className={clsx(!asChild && styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerBackdrop = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Backdrop>,
  ComponentProps<typeof DrawerPrimitive.Backdrop>
>(function DrawerBackdrop({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Backdrop
      ref={ref}
      data-slot="drawer-backdrop"
      className={clsx(styles.backdrop, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerPositioner = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Positioner>,
  ComponentProps<typeof DrawerPrimitive.Positioner>
>(function DrawerPositioner({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Positioner
      ref={ref}
      data-slot="drawer-positioner"
      className={clsx(styles.positioner, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerContent = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Content>,
  ComponentProps<typeof DrawerPrimitive.Content>
>(function DrawerContent({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerGrabber = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Grabber>,
  ComponentProps<typeof DrawerPrimitive.Grabber>
>(function DrawerGrabber({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Grabber
      ref={ref}
      data-slot="drawer-grabber"
      className={clsx(styles.grabber, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerGrabberIndicator = forwardRef<
  ComponentRef<typeof DrawerPrimitive.GrabberIndicator>,
  ComponentProps<typeof DrawerPrimitive.GrabberIndicator>
>(function DrawerGrabberIndicator({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.GrabberIndicator
      ref={ref}
      data-slot="drawer-grabber-indicator"
      className={clsx(styles.grabberIndicator, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerTitle = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Title>,
  ComponentProps<typeof DrawerPrimitive.Title>
>(function DrawerTitle({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      data-slot="drawer-title"
      className={clsx(styles.title, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerDescription = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Description>,
  ComponentProps<typeof DrawerPrimitive.Description>
>(function DrawerDescription({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      data-slot="drawer-description"
      className={clsx(styles.description, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerCloseTrigger = forwardRef<
  ComponentRef<typeof DrawerPrimitive.CloseTrigger>,
  ComponentProps<typeof DrawerPrimitive.CloseTrigger>
>(function DrawerCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <DrawerPrimitive.CloseTrigger
      ref={ref}
      asChild={asChild}
      data-slot="drawer-close-trigger"
      className={clsx(!asChild && styles.closeTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof DrawerPrimitive.CloseTrigger>, 'asChild'>
>(function DrawerCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <DrawerPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="drawer-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, normalizeClassName(className))}
      >
        {children}
      </CloseButton.Root>
    </DrawerPrimitive.CloseTrigger>
  );
});

const DrawerSwipeArea = forwardRef<
  ComponentRef<typeof DrawerPrimitive.SwipeArea>,
  ComponentProps<typeof DrawerPrimitive.SwipeArea>
>(function DrawerSwipeArea({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.SwipeArea
      ref={ref}
      data-slot="drawer-swipe-area"
      className={clsx(styles.swipeArea, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerIndent = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Indent>,
  ComponentProps<typeof DrawerPrimitive.Indent>
>(function DrawerIndent({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Indent
      ref={ref}
      data-slot="drawer-indent"
      className={clsx(styles.indent, normalizeClassName(className))}
      {...props}
    />
  );
});

const DrawerIndentBackground = forwardRef<
  ComponentRef<typeof DrawerPrimitive.IndentBackground>,
  ComponentProps<typeof DrawerPrimitive.IndentBackground>
>(function DrawerIndentBackground({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.IndentBackground
      ref={ref}
      data-slot="drawer-indent-background"
      className={clsx(styles.indentBackground, normalizeClassName(className))}
      {...props}
    />
  );
});

function DrawerHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="drawer-header" className={clsx(styles.header, className)} {...props} />;
}

function DrawerBody({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="drawer-body" className={clsx(styles.body, className)} {...props} />;
}

function DrawerFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="drawer-footer" className={clsx(styles.footer, className)} {...props} />;
}

const DrawerContext = DrawerPrimitive.Context;

const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  RootProvider: DrawerRootProvider,
  Stack: DrawerStack,
  Trigger: DrawerTrigger,
  Backdrop: DrawerBackdrop,
  Positioner: DrawerPositioner,
  Content: DrawerContent,
  Grabber: DrawerGrabber,
  GrabberIndicator: DrawerGrabberIndicator,
  Title: DrawerTitle,
  Description: DrawerDescription,
  CloseTrigger: DrawerCloseTrigger,
  CloseIcon: DrawerCloseIcon,
  SwipeArea: DrawerSwipeArea,
  Indent: DrawerIndent,
  IndentBackground: DrawerIndentBackground,
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
  Context: DrawerContext,
});

export { Drawer, useDrawer, useDrawerContext, useDrawerStackContext };
export type {
  DrawerBackdropProps,
  DrawerCloseTriggerProps,
  DrawerContentProps,
  DrawerContextProps,
  DrawerDescriptionProps,
  DrawerGrabberIndicatorProps,
  DrawerGrabberProps,
  DrawerIndentBackgroundProps,
  DrawerIndentProps,
  DrawerOpenChangeDetails,
  DrawerPositionerProps,
  DrawerRootProps,
  DrawerRootProviderProps,
  DrawerSnapPointChangeDetails,
  DrawerStackProps,
  DrawerSwipeAreaProps,
  DrawerTitleProps,
  DrawerTriggerProps,
  DrawerTriggerValueChangeDetails,
  UseDrawerContext,
  UseDrawerProps,
  UseDrawerReturn,
  UseDrawerStackContext,
} from '@ark-ui/react/drawer';