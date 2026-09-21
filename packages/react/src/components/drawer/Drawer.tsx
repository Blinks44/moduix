'use client';

import {
  Drawer as DrawerPrimitive,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from '@ark-ui/react/drawer';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';
import styles from './Drawer.module.css';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close drawer';
type DrawerVariant = 'island';
const DrawerVariantContext = createContext<DrawerVariant | undefined>(undefined);

type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root> &
  OverlayPortalProps & { variant?: DrawerVariant };
type DrawerRootProviderProps = ComponentProps<typeof DrawerPrimitive.RootProvider> &
  OverlayPortalProps;
type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content> & {
  variant?: 'island';
};

function Drawer({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  variant,
  swipeDirection,
  snapPoints,
  defaultSnapPoint,
  ...props
}: DrawerRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DrawerVariantContext.Provider value={variant}>
        <DrawerPrimitive.Root
          {...props}
          lazyMount={lazyMount}
          unmountOnExit={unmountOnExit}
          swipeDirection={swipeDirection}
          snapPoints={snapPoints ?? (variant === 'island' ? [1] : undefined)}
          defaultSnapPoint={
            defaultSnapPoint !== undefined ? defaultSnapPoint : variant === 'island' ? 1 : undefined
          }
        />
      </DrawerVariantContext.Provider>
    </OverlayPortalProvider>
  );
}

function DrawerRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: DrawerRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <DrawerPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const DrawerStack = DrawerPrimitive.Stack;

const DrawerTrigger = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Trigger>,
  ComponentProps<typeof DrawerPrimitive.Trigger>
>(function DrawerTrigger({ asChild, className, ...props }, ref) {
  return (
    <DrawerPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
      data-slot="drawer-trigger"
    />
  );
});

const DrawerBackdrop = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Backdrop>,
  ComponentProps<typeof DrawerPrimitive.Backdrop>
>(function DrawerBackdrop({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DrawerPrimitive.Backdrop
        ref={ref}
        className={clsx(styles.backdrop, className)}
        {...props}
        data-slot="drawer-backdrop"
      />
    </OverlayPortal>
  );
});

const DrawerPositioner = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Positioner>,
  ComponentProps<typeof DrawerPrimitive.Positioner>
>(function DrawerPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <DrawerPrimitive.Positioner
        ref={ref}
        className={clsx(styles.positioner, className)}
        {...props}
        data-slot="drawer-positioner"
      />
    </OverlayPortal>
  );
});

const DrawerContent = forwardRef<ComponentRef<typeof DrawerPrimitive.Content>, DrawerContentProps>(
  function DrawerContent({ className, variant, ...props }, ref) {
    const rootVariant = useContext(DrawerVariantContext);

    return (
      <DrawerPrimitive.Content
        ref={ref}
        className={clsx(styles.content, className)}
        {...props}
        data-variant={variant ?? rootVariant}
        data-slot="drawer-content"
      />
    );
  },
);

const DrawerGrabber = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Grabber>,
  ComponentProps<typeof DrawerPrimitive.Grabber>
>(function DrawerGrabber({ className, ...props }, ref) {
  return (
    <DrawerPrimitive.Grabber
      ref={ref}
      className={clsx(styles.grabber, className)}
      {...props}
      data-slot="drawer-grabber"
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
      className={clsx(styles.grabberIndicator, className)}
      {...props}
      data-slot="drawer-grabber-indicator"
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
      className={clsx(styles.title, className)}
      {...props}
      data-slot="drawer-title"
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
      className={clsx(styles.description, className)}
      {...props}
      data-slot="drawer-description"
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
      className={clsx(!asChild && styles.closeTrigger, className)}
      {...props}
      data-slot="drawer-close-trigger"
    />
  );
});

const DrawerCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton>,
  Omit<ComponentProps<typeof DrawerPrimitive.CloseTrigger>, 'asChild'>
>(function DrawerCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <DrawerPrimitive.CloseTrigger asChild {...props}>
      <CloseButton
        ref={ref}
        data-slot="drawer-close-icon"
        aria-label={ariaLabel}
        className={clsx(styles.closeIcon, className)}
      >
        {children}
      </CloseButton>
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
      className={clsx(styles.swipeArea, className)}
      {...props}
      data-slot="drawer-swipe-area"
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
      className={clsx(styles.indent, className)}
      {...props}
      data-slot="drawer-indent"
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
      className={clsx(styles.indentBackground, className)}
      {...props}
      data-slot="drawer-indent-background"
    />
  );
});

const DrawerHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DrawerHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.header, className)}
        {...props}
        data-slot="drawer-header"
      />
    );
  },
);

const DrawerBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DrawerBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.body, className)}
        {...props}
        data-slot="drawer-body"
      />
    );
  },
);

const DrawerFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DrawerFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={clsx(styles.footer, className)}
        {...props}
        data-slot="drawer-footer"
      />
    );
  },
);

const DrawerContext = DrawerPrimitive.Context;

export {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseIcon,
  DrawerCloseTrigger,
  DrawerContext,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerGrabber,
  DrawerGrabberIndicator,
  DrawerHeader,
  DrawerIndent,
  DrawerIndentBackground,
  DrawerPositioner,
  DrawerRootProvider,
  DrawerStack,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
};