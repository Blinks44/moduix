import {
  Drawer as DrawerPrimitive,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from '@ark-ui/solid/drawer';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

type DrawerVariant = 'island';
type DrawerSize = 'sm' | 'md' | 'lg' | 'xl';
type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root> & OverlayPortalProps;
type DrawerRootProviderProps = ComponentProps<typeof DrawerPrimitive.RootProvider> &
  OverlayPortalProps;
type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content> & {
  /** Width preset for `start` and `end` drawers: 18rem, 22rem, 28rem, or 36rem. */
  size?: DrawerSize;
  /** `island` insets the surface from the viewport edges and rounds every corner. */
  variant?: DrawerVariant;
};
type DrawerCloseIconProps = Omit<ComponentProps<typeof DrawerPrimitive.CloseTrigger>, 'asChild'>;

function Drawer(props: DrawerRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DrawerPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DrawerPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function DrawerRootProvider(props: DrawerRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <DrawerPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </DrawerPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

const DrawerStack = DrawerPrimitive.Stack;

function DrawerTrigger(props: ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger {...props} data-slot="drawer-trigger" />;
}

function DrawerBackdrop(props: ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DrawerPrimitive.Backdrop
        class={cn(
          'fixed inset-0 z-[calc(var(--z-index,var(--moduix-z-popup))-1)] min-h-dvh bg-overlay backdrop-blur-xs [transition:opacity_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_var(--moduix-ease-out),backdrop-filter_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_var(--moduix-ease-out)] data-[state=closed]:animate-moduix-drawer-backdrop-out data-[state=open]:animate-moduix-drawer-backdrop-in data-[state=open]:data-swiping:[transition-duration:0s] motion-reduce:[transition-duration:1ms] motion-reduce:data-[state]:animate-none [&[hidden]:has(~[data-slot=drawer-positioner]:not([hidden]))]:block',
          local.class,
        )}
        {...others}
        data-slot="drawer-backdrop"
      />
    </OverlayPortal>
  );
}

function DrawerPositioner(props: ComponentProps<typeof DrawerPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DrawerPrimitive.Positioner
        class={cn(
          'fixed inset-0 z-[var(--z-index,var(--moduix-z-popup))] flex items-end justify-center overflow-hidden overscroll-contain p-0 has-[>[data-slot=drawer-content][data-variant=island]]:pt-[max(var(--moduix-spacing-4),env(safe-area-inset-top,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pr-[max(var(--moduix-spacing-4),env(safe-area-inset-right,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pb-[max(var(--moduix-spacing-4),env(safe-area-inset-bottom,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pl-[max(var(--moduix-spacing-4),env(safe-area-inset-left,0px))] data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start [&:not([hidden])_[data-slot=drawer-content][hidden]]:flex',
          local.class,
        )}
        {...others}
        data-slot="drawer-positioner"
      />
    </OverlayPortal>
  );
}

function DrawerContent(props: DrawerContentProps) {
  const [local, others] = splitProps(props, ['class', 'draggable', 'size', 'variant']);

  return (
    <DrawerPrimitive.Content
      class={cn(
        "group/drawer relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] flex h-full max-h-[80dvh] w-full max-w-[100vw] origin-bottom flex-col overscroll-contain rounded-t-xl rounded-b-none border border-border bg-popover px-6 pt-3 pb-[calc(var(--moduix-spacing-4)+env(safe-area-inset-bottom,0px))] text-popover-foreground shadow-lg outline-0 [--_drawer-bleed:var(--moduix-size-xl)] [--_drawer-island-offset:0px] [--_drawer-width:22rem] [transition:transform_calc(var(--drawer-swipe-strength,1)*var(--moduix-duration-slower))_var(--moduix-ease-out),scale_var(--moduix-transition-spring),translate_var(--moduix-transition-spring)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-(--_drawer-bleed) after:bg-inherit after:content-[''] data-dragging:select-none data-nested-drawer-swiping:[transition-duration:0s] data-[nested-drawer-open]:[scale:calc(1-0.05*var(--nested-drawers,0))] data-[size=lg]:[--_drawer-width:28rem] data-[size=sm]:[--_drawer-width:18rem] data-[size=xl]:[--_drawer-width:36rem] data-[state=closed]:animate-moduix-drawer-content-out-down data-[state=open]:animate-moduix-drawer-content-in-down data-[state=open]:data-swiping:[transition-duration:0s] data-[swipe-direction=down]:data-[nested-drawer-open]:[translate:0_calc(-1*var(--moduix-spacing-10)*var(--nested-drawers,0))] data-[swipe-direction=left]:max-h-none data-[swipe-direction=left]:w-[min(var(--_drawer-width),calc(100vw-var(--moduix-spacing-8)))] data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:rounded-l-none data-[swipe-direction=left]:rounded-r-xl data-[swipe-direction=left]:p-6 data-[swipe-direction=left]:after:inset-x-auto data-[swipe-direction=left]:after:inset-y-0 data-[swipe-direction=left]:after:right-full data-[swipe-direction=left]:after:h-auto data-[swipe-direction=left]:after:w-(--_drawer-bleed) data-[swipe-direction=left]:data-[nested-drawer-open]:[translate:calc(var(--moduix-spacing-10)*var(--nested-drawers,0))_0] data-[swipe-direction=left]:data-[state=closed]:animate-moduix-drawer-content-out-left data-[swipe-direction=left]:data-[state=open]:animate-moduix-drawer-content-in-left data-[swipe-direction=right]:max-h-none data-[swipe-direction=right]:w-[min(var(--_drawer-width),calc(100vw-var(--moduix-spacing-8)))] data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:rounded-l-xl data-[swipe-direction=right]:rounded-r-none data-[swipe-direction=right]:p-6 data-[swipe-direction=right]:after:inset-x-auto data-[swipe-direction=right]:after:inset-y-0 data-[swipe-direction=right]:after:left-full data-[swipe-direction=right]:after:h-auto data-[swipe-direction=right]:after:w-(--_drawer-bleed) data-[swipe-direction=right]:data-[nested-drawer-open]:[translate:calc(-1*var(--moduix-spacing-10)*var(--nested-drawers,0))_0] data-[swipe-direction=right]:data-[state=closed]:animate-moduix-drawer-content-out-right data-[swipe-direction=right]:data-[state=open]:animate-moduix-drawer-content-in-right data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:rounded-t-none data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:pt-[calc(var(--moduix-spacing-4)+env(safe-area-inset-top,0px))] data-[swipe-direction=up]:pb-4 data-[swipe-direction=up]:after:top-auto data-[swipe-direction=up]:after:bottom-full data-[swipe-direction=up]:data-[nested-drawer-open]:[translate:0_calc(var(--moduix-spacing-10)*var(--nested-drawers,0))] data-[swipe-direction=up]:data-[state=closed]:animate-moduix-drawer-content-out-up data-[swipe-direction=up]:data-[state=open]:animate-moduix-drawer-content-in-up data-[variant=island]:rounded-xl data-[variant=island]:after:hidden data-[variant=island]:data-[swipe-direction=down]:[--_drawer-island-offset:max(var(--moduix-spacing-4),env(safe-area-inset-bottom,0px))] data-[variant=island]:data-[swipe-direction=left]:[--_drawer-island-offset:max(var(--moduix-spacing-4),env(safe-area-inset-left,0px))] data-[variant=island]:data-[swipe-direction=right]:[--_drawer-island-offset:max(var(--moduix-spacing-4),env(safe-area-inset-right,0px))] data-[variant=island]:data-[swipe-direction=up]:[--_drawer-island-offset:max(var(--moduix-spacing-4),env(safe-area-inset-top,0px))] motion-reduce:[transition-duration:1ms] motion-reduce:data-[state]:animate-none",
        local.class,
      )}
      draggable={local.draggable ?? true}
      {...others}
      data-size={local.size ?? 'md'}
      data-variant={local.variant}
      data-slot="drawer-content"
    />
  );
}

function DrawerGrabber(props: ComponentProps<typeof DrawerPrimitive.Grabber>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Grabber
      class={cn(
        'group/grabber flex w-full shrink-0 cursor-grab items-center justify-center pb-1 select-none group-data-[swipe-direction=left]/drawer:hidden group-data-[swipe-direction=right]/drawer:hidden active:cursor-grabbing',
        local.class,
      )}
      {...others}
      data-slot="drawer-grabber"
    />
  );
}

function DrawerGrabberIndicator(props: ComponentProps<typeof DrawerPrimitive.GrabberIndicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.GrabberIndicator
      class={cn(
        'h-1 w-12 rounded-full bg-muted-foreground opacity-[0.45] transition-opacity duration-normal ease-in-out [@media(hover:hover)]:group-hover/grabber:opacity-70',
        local.class,
      )}
      {...others}
      data-slot="drawer-grabber-indicator"
    />
  );
}

function DrawerTitle(props: ComponentProps<typeof DrawerPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Title
      class={cn('text-lg font-semibold', local.class)}
      {...others}
      data-slot="drawer-title"
    />
  );
}

function DrawerDescription(props: ComponentProps<typeof DrawerPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Description
      class={cn('text-md text-muted-foreground', local.class)}
      {...others}
      data-slot="drawer-description"
    />
  );
}

function DrawerCloseTrigger(props: ComponentProps<typeof DrawerPrimitive.CloseTrigger>) {
  return <DrawerPrimitive.CloseTrigger {...props} data-slot="drawer-close-trigger" />;
}

function DrawerCloseIcon(props: DrawerCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'children', 'class']);

  return (
    <DrawerPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="drawer-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeDrawer}
          class={cn(
            'rounded-md [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
            local.class,
          )}
        >
          {local.children}
        </CloseButton>
      )}
      {...others}
    />
  );
}

function DrawerSwipeArea(props: ComponentProps<typeof DrawerPrimitive.SwipeArea>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.SwipeArea
      class={cn(
        'fixed z-50 touch-none data-disabled:pointer-events-none data-[swipe-direction=down]:inset-x-0 data-[swipe-direction=down]:top-0 data-[swipe-direction=down]:h-10 data-[swipe-direction=left]:inset-y-0 data-[swipe-direction=left]:right-0 data-[swipe-direction=left]:w-10 data-[swipe-direction=right]:inset-y-0 data-[swipe-direction=right]:left-0 data-[swipe-direction=right]:w-10 data-[swipe-direction=up]:inset-x-0 data-[swipe-direction=up]:bottom-0 data-[swipe-direction=up]:h-10',
        local.class,
      )}
      {...others}
      data-slot="drawer-swipe-area"
    />
  );
}

function DrawerIndent(props: ComponentProps<typeof DrawerPrimitive.Indent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Indent
      class={cn(
        'relative origin-top [transition:transform_var(--moduix-transition-spring),border-radius_var(--moduix-transition-spring)] data-active:[transform:translateY(calc(var(--moduix-spacing-2)*(1-var(--drawer-swipe-progress,0))))_scale(calc(0.97+0.03*var(--drawer-swipe-progress,0)))] data-active:rounded-t-lg motion-reduce:[transition-duration:1ms]',
        local.class,
      )}
      {...others}
      data-slot="drawer-indent"
    />
  );
}

function DrawerIndentBackground(props: ComponentProps<typeof DrawerPrimitive.IndentBackground>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.IndentBackground
      class={cn(
        'pointer-events-none absolute inset-0 bg-foreground opacity-0 [transition:opacity_var(--moduix-transition-spring)] data-active:opacity-[calc(1-var(--drawer-swipe-progress,0))] motion-reduce:[transition-duration:1ms]',
        local.class,
      )}
      {...others}
      data-slot="drawer-indent-background"
    />
  );
}

function DrawerHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='drawer-close-icon']]:col-start-2 [&>[data-slot='drawer-description']]:col-span-2 [&>[data-slot='drawer-title']]:col-start-1",
        local.class,
      )}
      {...others}
      data-slot="drawer-header"
    />
  );
}

function DrawerBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('mt-4 min-h-0 overflow-y-auto text-md', local.class)}
      {...others}
      data-slot="drawer-body"
    />
  );
}

function DrawerFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('mt-6 flex flex-wrap justify-end gap-2', local.class)}
      {...others}
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
export type {
  DrawerContentProps,
  DrawerRootProps,
  DrawerRootProviderProps,
  DrawerSize,
  DrawerVariant,
};