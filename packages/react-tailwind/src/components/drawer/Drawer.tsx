'use client';

import {
  Drawer as DrawerPrimitive,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from '@ark-ui/react/drawer';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

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
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
        className={cn(
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] min-h-dvh bg-overlay backdrop-blur-xs [transition:opacity_calc(var(--drawer-swipe-strength,1)*450ms)_ease-out,backdrop-filter_calc(var(--drawer-swipe-strength,1)*450ms)_ease-out] data-[state=closed]:animate-moduix-drawer-backdrop-out data-[state=open]:animate-moduix-drawer-backdrop-in data-[state=open]:data-swiping:[transition-duration:0s] motion-reduce:[transition-duration:1ms] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms] [&[hidden]:has(~[data-slot=drawer-positioner]:not([hidden]))]:block',
          className,
        )}
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
        className={cn(
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] box-border flex items-end justify-center overflow-hidden overscroll-contain p-0 has-[>[data-slot=drawer-content][data-variant=island]]:pt-[max(1rem,env(safe-area-inset-top,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pr-[max(1rem,env(safe-area-inset-right,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pb-[max(1rem,env(safe-area-inset-bottom,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pl-[max(1rem,env(safe-area-inset-left,0px))] data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start [&:not([hidden])_[data-slot=drawer-content][hidden]]:flex',
          className,
        )}
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
        className={cn(
          "group/drawer relative box-border flex h-full max-h-[80dvh] w-full max-w-[100vw] origin-bottom [translate:0_0] [scale:1] flex-col overscroll-contain rounded-t-xl rounded-b-none border border-border bg-popover px-6 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] text-popover-foreground shadow-lg outline-0 [transition:transform_calc(var(--drawer-swipe-strength,1)*450ms)_cubic-bezier(0,0,0.2,1),scale_450ms_cubic-bezier(0.32,0.72,0,1),translate_450ms_cubic-bezier(0.32,0.72,0,1)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-control-xl after:bg-inherit after:content-[''] data-dragging:select-none data-nested-drawer-swiping:[transition-duration:0s] data-[nested-drawer-open]:[scale:calc(1-0.05*var(--nested-drawers,0))] data-[state=closed]:animate-moduix-drawer-content-out-down data-[state=open]:animate-moduix-drawer-content-in-down data-[state=open]:data-swiping:[transition-duration:0s] data-[swipe-direction=down]:data-[nested-drawer-open]:[translate:0_calc(-1*40px*var(--nested-drawers,0))] data-[swipe-direction=left]:h-full data-[swipe-direction=left]:max-h-none data-[swipe-direction=left]:w-[min(22rem,calc(100vw-2rem))] data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:rounded-s-none data-[swipe-direction=left]:rounded-e-xl data-[swipe-direction=left]:p-6 data-[swipe-direction=left]:after:inset-x-auto data-[swipe-direction=left]:after:inset-y-0 data-[swipe-direction=left]:after:top-0 data-[swipe-direction=left]:after:right-full data-[swipe-direction=left]:after:h-auto data-[swipe-direction=left]:after:w-control-xl data-[swipe-direction=left]:data-[nested-drawer-open]:[translate:calc(40px*var(--nested-drawers,0))_0] data-[swipe-direction=left]:data-[state=closed]:animate-moduix-drawer-content-out-left data-[swipe-direction=left]:data-[state=open]:animate-moduix-drawer-content-in-left data-[swipe-direction=right]:h-full data-[swipe-direction=right]:max-h-none data-[swipe-direction=right]:w-[min(22rem,calc(100vw-2rem))] data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:rounded-s-xl data-[swipe-direction=right]:rounded-e-none data-[swipe-direction=right]:p-6 data-[swipe-direction=right]:after:inset-x-auto data-[swipe-direction=right]:after:inset-y-0 data-[swipe-direction=right]:after:top-0 data-[swipe-direction=right]:after:left-full data-[swipe-direction=right]:after:h-auto data-[swipe-direction=right]:after:w-control-xl data-[swipe-direction=right]:data-[nested-drawer-open]:[translate:calc(-1*40px*var(--nested-drawers,0))_0] data-[swipe-direction=right]:data-[state=closed]:animate-moduix-drawer-content-out-right data-[swipe-direction=right]:data-[state=open]:animate-moduix-drawer-content-in-right data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:rounded-t-none data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:pt-[calc(1rem+env(safe-area-inset-top,0px))] data-[swipe-direction=up]:pb-4 data-[swipe-direction=up]:after:top-auto data-[swipe-direction=up]:after:bottom-full data-[swipe-direction=up]:data-[nested-drawer-open]:[translate:0_calc(40px*var(--nested-drawers,0))] data-[swipe-direction=up]:data-[state=closed]:animate-moduix-drawer-content-out-up data-[swipe-direction=up]:data-[state=open]:animate-moduix-drawer-content-in-up data-[variant=island]:rounded-xl data-[variant=island]:after:hidden motion-reduce:[transition-duration:1ms] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]",
          className,
        )}
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
      className={cn(
        'group/grabber flex w-full shrink-0 cursor-grab items-center justify-center pb-1 select-none group-data-[swipe-direction=left]/drawer:hidden group-data-[swipe-direction=right]/drawer:hidden active:cursor-grabbing',
        className,
      )}
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
      className={cn(
        'h-1 w-12 rounded-full bg-muted-foreground opacity-[0.45] transition-[background-color,opacity] duration-200 ease-in-out motion-reduce:transition-none [@media(hover:hover)]:group-hover/grabber:opacity-70',
        className,
      )}
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
      className={cn('text-lg font-semibold text-popover-foreground', className)}
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
      className={cn('text-md leading-6 text-muted-foreground', className)}
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
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
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
        className={cn(
          'absolute end-4 top-4 z-2 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
          className,
        )}
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
      className={cn(
        'fixed z-50 touch-none data-disabled:pointer-events-none data-[swipe-direction=down]:start-0 data-[swipe-direction=down]:end-0 data-[swipe-direction=down]:top-0 data-[swipe-direction=down]:h-10 data-[swipe-direction=left]:end-0 data-[swipe-direction=left]:top-0 data-[swipe-direction=left]:bottom-0 data-[swipe-direction=left]:w-10 data-[swipe-direction=right]:start-0 data-[swipe-direction=right]:top-0 data-[swipe-direction=right]:bottom-0 data-[swipe-direction=right]:w-10 data-[swipe-direction=up]:start-0 data-[swipe-direction=up]:end-0 data-[swipe-direction=up]:bottom-0 data-[swipe-direction=up]:h-10',
        className,
      )}
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
      className={cn(
        'relative origin-top [translate:0_0] [scale:1] transition-[transform,border-radius] duration-[450ms] ease-spring data-active:[translate:0_calc(8px*(1-var(--drawer-swipe-progress,0)))] data-active:[scale:calc(0.97+(1-0.97)*var(--drawer-swipe-progress,0))] data-active:rounded-t-lg data-active:rounded-b-none motion-reduce:[transition-duration:1ms]',
        className,
      )}
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
      className={cn(
        'pointer-events-none absolute inset-0 bg-foreground opacity-0 transition-opacity duration-[450ms] ease-spring data-active:opacity-[calc(1-var(--drawer-swipe-progress,0))] motion-reduce:[transition-duration:1ms]',
        className,
      )}
      {...props}
      data-slot="drawer-indent-background"
    />
  );
});

function DrawerHeader({ className, ...props }: HTMLArkProps<'div'>) {
  return (
    <ark.div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='drawer-close-icon']]:col-start-2 [&>[data-slot='drawer-close-icon']]:justify-self-end [&>[data-slot='drawer-close-trigger']]:col-start-2 [&>[data-slot='drawer-close-trigger']]:justify-self-end [&>[data-slot='drawer-description']]:col-span-2 [&>[data-slot='drawer-title']]:col-start-1",
        className,
      )}
      {...props}
      data-slot="drawer-header"
    />
  );
}

function DrawerBody({ className, ...props }: HTMLArkProps<'div'>) {
  return (
    <ark.div
      className={cn(
        'mt-4 min-h-0 overflow-y-auto text-md leading-6 text-muted-foreground',
        className,
      )}
      {...props}
      data-slot="drawer-body"
    />
  );
}

function DrawerFooter({ className, ...props }: HTMLArkProps<'div'>) {
  return (
    <ark.div
      className={cn('mt-6 flex justify-end gap-2', className)}
      {...props}
      data-slot="drawer-footer"
    />
  );
}

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