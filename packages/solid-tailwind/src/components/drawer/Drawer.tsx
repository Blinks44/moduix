import {
  Drawer as DrawerPrimitive,
  useDrawer,
  useDrawerContext,
  useDrawerStackContext,
} from '@ark-ui/solid/drawer';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { ComponentProps } from 'solid-js';
import { children as resolveChildren, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close drawer';

type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root> & OverlayPortalProps;
type DrawerRootProviderProps = ComponentProps<typeof DrawerPrimitive.RootProvider> &
  OverlayPortalProps;
type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content> & {
  variant?: 'island';
};
type DrawerCloseIconProps = Omit<ComponentProps<typeof DrawerPrimitive.CloseTrigger>, 'asChild'>;

function DrawerRoot(props: DrawerRootProps) {
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DrawerPrimitive.Trigger
      asChild={local.asChild}
      data-slot="drawer-trigger"
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerBackdrop(props: ComponentProps<typeof DrawerPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DrawerPrimitive.Backdrop
        data-slot="drawer-backdrop"
        class={cn(
          'fixed inset-0 z-[calc(40+var(--layer-index,0))] min-h-dvh bg-overlay backdrop-blur-xs [transition:opacity_calc(var(--drawer-swipe-strength,1)*450ms)_ease-out,backdrop-filter_calc(var(--drawer-swipe-strength,1)*450ms)_ease-out] data-[state=closed]:animate-moduix-drawer-backdrop-out data-[state=open]:animate-moduix-drawer-backdrop-in data-[state=open]:data-swiping:[transition-duration:0s] motion-reduce:[transition-duration:1ms] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms] [&[hidden]:has(~[data-slot=drawer-positioner]:not([hidden]))]:block',
          local.class,
        )}
        {...others}
      />
    </OverlayPortal>
  );
}

function DrawerPositioner(props: ComponentProps<typeof DrawerPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <DrawerPrimitive.Positioner
        data-slot="drawer-positioner"
        class={cn(
          'fixed inset-0 z-[calc(50+var(--layer-index,0))] box-border flex items-end justify-center overflow-hidden overscroll-contain p-0 has-[>[data-slot=drawer-content][data-variant=island]]:pt-[max(1rem,env(safe-area-inset-top,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pr-[max(1rem,env(safe-area-inset-right,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pb-[max(1rem,env(safe-area-inset-bottom,0px))] has-[>[data-slot=drawer-content][data-variant=island]]:pl-[max(1rem,env(safe-area-inset-left,0px))] data-[swipe-direction=left]:items-stretch data-[swipe-direction=left]:justify-start data-[swipe-direction=right]:items-stretch data-[swipe-direction=right]:justify-end data-[swipe-direction=up]:items-start [&:not([hidden])_[data-slot=drawer-content][hidden]]:flex',
          local.class,
        )}
        {...others}
      />
    </OverlayPortal>
  );
}

function DrawerContent(props: DrawerContentProps) {
  const [local, others] = splitProps(props, ['class', 'draggable', 'variant']);

  return (
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      data-variant={local.variant}
      class={cn(
        "group/drawer relative box-border flex h-full max-h-[80dvh] w-full max-w-[100vw] origin-bottom [translate:0_0] [scale:1] flex-col overscroll-contain rounded-t-xl rounded-b-none border border-border bg-popover px-6 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] text-popover-foreground shadow-lg outline-0 [transition:transform_calc(var(--drawer-swipe-strength,1)*450ms)_ease-out,scale_450ms_ease-spring,translate_450ms_ease-spring] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-control-xl after:bg-inherit after:content-[''] data-dragging:select-none data-nested-drawer-swiping:[transition-duration:0s] data-[nested-drawer-open]:[scale:calc(1-0.05*var(--nested-drawers,0))] data-[state=closed]:animate-moduix-drawer-content-out-down data-[state=open]:animate-moduix-drawer-content-in-down data-[state=open]:data-swiping:[transition-duration:0s] data-[swipe-direction=down]:data-[nested-drawer-open]:[translate:0_calc(-1*40px*var(--nested-drawers,0))] data-[swipe-direction=left]:h-full data-[swipe-direction=left]:max-h-none data-[swipe-direction=left]:w-[min(22rem,calc(100vw-2rem))] data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:rounded-s-none data-[swipe-direction=left]:rounded-e-xl data-[swipe-direction=left]:p-6 data-[swipe-direction=left]:after:inset-x-auto data-[swipe-direction=left]:after:top-0 data-[swipe-direction=left]:after:right-full data-[swipe-direction=left]:after:h-auto data-[swipe-direction=left]:after:w-control-xl data-[swipe-direction=left]:data-[nested-drawer-open]:[translate:calc(40px*var(--nested-drawers,0))_0] data-[swipe-direction=left]:data-[state=closed]:animate-moduix-drawer-content-out-left data-[swipe-direction=left]:data-[state=open]:animate-moduix-drawer-content-in-left data-[swipe-direction=right]:h-full data-[swipe-direction=right]:max-h-none data-[swipe-direction=right]:w-[min(22rem,calc(100vw-2rem))] data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:rounded-s-xl data-[swipe-direction=right]:rounded-e-none data-[swipe-direction=right]:p-6 data-[swipe-direction=right]:after:inset-x-auto data-[swipe-direction=right]:after:top-0 data-[swipe-direction=right]:after:left-full data-[swipe-direction=right]:after:h-auto data-[swipe-direction=right]:after:w-control-xl data-[swipe-direction=right]:data-[nested-drawer-open]:[translate:calc(-1*40px*var(--nested-drawers,0))_0] data-[swipe-direction=right]:data-[state=closed]:animate-moduix-drawer-content-out-right data-[swipe-direction=right]:data-[state=open]:animate-moduix-drawer-content-in-right data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:rounded-t-none data-[swipe-direction=up]:rounded-b-xl data-[swipe-direction=up]:pt-[calc(1rem+env(safe-area-inset-top,0px))] data-[swipe-direction=up]:pb-4 data-[swipe-direction=up]:after:top-auto data-[swipe-direction=up]:after:bottom-full data-[swipe-direction=up]:data-[nested-drawer-open]:[translate:0_calc(40px*var(--nested-drawers,0))] data-[swipe-direction=up]:data-[state=closed]:animate-moduix-drawer-content-out-up data-[swipe-direction=up]:data-[state=open]:animate-moduix-drawer-content-in-up data-[variant=island]:rounded-xl data-[variant=island]:after:hidden motion-reduce:[transition-duration:1ms] motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]",
        local.class,
      )}
      draggable={local.draggable ?? true}
      {...others}
    />
  );
}

function DrawerGrabber(props: ComponentProps<typeof DrawerPrimitive.Grabber>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Grabber
      data-slot="drawer-grabber"
      class={cn(
        'group/grabber flex w-full shrink-0 cursor-grab items-center justify-center pb-1 select-none group-data-[swipe-direction=left]/drawer:hidden group-data-[swipe-direction=right]/drawer:hidden active:cursor-grabbing',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerGrabberIndicator(props: ComponentProps<typeof DrawerPrimitive.GrabberIndicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.GrabberIndicator
      data-slot="drawer-grabber-indicator"
      class={cn(
        'h-1 w-12 rounded-full bg-muted-foreground opacity-[0.45] transition-[background-color,opacity] duration-200 ease-in-out motion-reduce:transition-none [@media(hover:hover)]:group-hover/grabber:opacity-70',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerTitle(props: ComponentProps<typeof DrawerPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      class={cn('text-lg font-semibold text-popover-foreground', local.class)}
      {...others}
    />
  );
}

function DrawerDescription(props: ComponentProps<typeof DrawerPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      class={cn('text-md leading-6 text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function DrawerCloseTrigger(props: ComponentProps<typeof DrawerPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <DrawerPrimitive.CloseTrigger
      asChild={local.asChild}
      data-slot="drawer-close-trigger"
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerCloseIcon(props: DrawerCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = resolveChildren(() => local.children);

  return (
    <DrawerPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="drawer-close-icon"
          aria-label={
            local['aria-label'] ??
            (local['aria-labelledby'] == null ? DEFAULT_CLOSE_BUTTON_LABEL : undefined)
          }
          aria-labelledby={local['aria-labelledby']}
          class={cn(
            'absolute end-4 top-4 z-2 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
            local.class,
          )}
        >
          {resolvedChildren()}
        </CloseButton.Root>
      )}
      {...others}
    />
  );
}

function DrawerSwipeArea(props: ComponentProps<typeof DrawerPrimitive.SwipeArea>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.SwipeArea
      data-slot="drawer-swipe-area"
      class={cn(
        'fixed z-50 touch-none data-disabled:pointer-events-none data-[swipe-direction=down]:start-0 data-[swipe-direction=down]:end-0 data-[swipe-direction=down]:top-0 data-[swipe-direction=down]:h-10 data-[swipe-direction=left]:end-0 data-[swipe-direction=left]:top-0 data-[swipe-direction=left]:bottom-0 data-[swipe-direction=left]:w-10 data-[swipe-direction=right]:start-0 data-[swipe-direction=right]:top-0 data-[swipe-direction=right]:bottom-0 data-[swipe-direction=right]:w-10 data-[swipe-direction=up]:start-0 data-[swipe-direction=up]:end-0 data-[swipe-direction=up]:bottom-0 data-[swipe-direction=up]:h-10',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerIndent(props: ComponentProps<typeof DrawerPrimitive.Indent>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.Indent
      data-slot="drawer-indent"
      class={cn(
        'relative origin-top [translate:0_0] [scale:1] transition-[transform,border-radius] duration-[450ms] ease-spring data-active:[translate:0_calc(8px*(1-var(--drawer-swipe-progress,0)))] data-active:[scale:calc(0.97+(1-0.97)*var(--drawer-swipe-progress,0))] data-active:rounded-t-lg data-active:rounded-b-none motion-reduce:[transition-duration:1ms]',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerIndentBackground(props: ComponentProps<typeof DrawerPrimitive.IndentBackground>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <DrawerPrimitive.IndentBackground
      data-slot="drawer-indent-background"
      class={cn(
        'pointer-events-none absolute inset-0 bg-foreground opacity-0 transition-opacity duration-[450ms] ease-spring data-active:opacity-[calc(1-var(--drawer-swipe-progress,0))] motion-reduce:[transition-duration:1ms]',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="drawer-header"
      class={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-1 [&>[data-slot='drawer-close-icon']]:col-start-2 [&>[data-slot='drawer-close-icon']]:justify-self-end [&>[data-slot='drawer-close-trigger']]:col-start-2 [&>[data-slot='drawer-close-trigger']]:justify-self-end [&>[data-slot='drawer-description']]:col-span-2 [&>[data-slot='drawer-title']]:col-start-1",
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="drawer-body"
      class={cn(
        'mt-4 min-h-0 overflow-y-auto text-md leading-6 text-muted-foreground',
        local.class,
      )}
      {...others}
    />
  );
}

function DrawerFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="drawer-footer"
      class={cn('mt-6 flex justify-end gap-2', local.class)}
      {...others}
    />
  );
}

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