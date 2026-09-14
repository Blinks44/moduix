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

function DrawerRoot({
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
      data-slot="drawer-trigger"
      className={clsx(!asChild && styles.trigger, className)}
      {...props}
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
        data-slot="drawer-backdrop"
        className={clsx(styles.backdrop, className)}
        {...props}
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
        data-slot="drawer-positioner"
        className={clsx(styles.positioner, className)}
        {...props}
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
        data-slot="drawer-content"
        data-variant={variant ?? rootVariant}
        className={clsx(styles.content, className)}
        {...props}
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
      data-slot="drawer-grabber"
      className={clsx(styles.grabber, className)}
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
      className={clsx(styles.grabberIndicator, className)}
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
      className={clsx(styles.title, className)}
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
      className={clsx(styles.description, className)}
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
      className={clsx(!asChild && styles.closeTrigger, className)}
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
        className={clsx(styles.closeIcon, className)}
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
      className={clsx(styles.swipeArea, className)}
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
      className={clsx(styles.indent, className)}
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
      className={clsx(styles.indentBackground, className)}
      {...props}
    />
  );
});

const DrawerHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DrawerHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="drawer-header"
        className={clsx(styles.header, className)}
        {...props}
      />
    );
  },
);

const DrawerBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DrawerBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="drawer-body"
        className={clsx(styles.body, className)}
        {...props}
      />
    );
  },
);

const DrawerFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function DrawerFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="drawer-footer"
        className={clsx(styles.footer, className)}
        {...props}
      />
    );
  },
);

const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  RootProvider: DrawerRootProvider,
  Context: DrawerPrimitive.Context,
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
});

export { Drawer, useDrawer, useDrawerContext, useDrawerStackContext };