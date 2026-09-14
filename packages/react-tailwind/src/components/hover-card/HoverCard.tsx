'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  HoverCard as HoverCardPrimitive,
  useHoverCard,
  useHoverCardContext,
} from '@ark-ui/react/hover-card';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';

type HoverCardRootProps = ComponentProps<typeof HoverCardPrimitive.Root> & OverlayPortalProps;
type HoverCardRootProviderProps = ComponentProps<typeof HoverCardPrimitive.RootProvider> &
  OverlayPortalProps;

function HoverCardRoot({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: HoverCardRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <HoverCardPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

function HoverCardRootProvider({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: HoverCardRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <HoverCardPrimitive.RootProvider
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const HoverCardTrigger = forwardRef<
  ComponentRef<typeof HoverCardPrimitive.Trigger>,
  ComponentProps<typeof HoverCardPrimitive.Trigger>
>(function HoverCardTrigger({ asChild, className, ...props }, ref) {
  return (
    <HoverCardPrimitive.Trigger
      ref={ref}
      data-slot="hover-card-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'inline-flex cursor-pointer items-center gap-1 text-primary underline decoration-primary/60 decoration-1 underline-offset-2 outline-0 transition-[color,text-decoration-color] duration-150 ease-in-out focus-visible:rounded-xs focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=open]:decoration-primary motion-reduce:transition-none [@media(hover:hover)]:hover:decoration-primary',
        className,
      )}
      {...props}
    />
  );
});

const HoverCardPositioner = forwardRef<
  ComponentRef<typeof HoverCardPrimitive.Positioner>,
  ComponentProps<typeof HoverCardPrimitive.Positioner>
>(function HoverCardPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <HoverCardPrimitive.Positioner
        ref={ref}
        data-slot="hover-card-positioner"
        className={cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-[var(--available-width)] outline-0',
          className,
        )}
        {...props}
      />
    </OverlayPortal>
  );
});

const HoverCardContent = forwardRef<
  ComponentRef<typeof HoverCardPrimitive.Content>,
  ComponentProps<typeof HoverCardPrimitive.Content>
>(function HoverCardContent({ className, ...props }, ref) {
  return (
    <HoverCardPrimitive.Content
      ref={ref}
      data-slot="hover-card-content"
      className={cn(
        'relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(24rem,var(--available-width))] min-w-[min(14rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-lg border border-border bg-popover p-2 wrap-anywhere text-popover-foreground shadow-lg outline-0 has-[>[data-slot=hover-card-body]]:flex has-[>[data-slot=hover-card-body]]:flex-col data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none has-[>[data-slot=hover-card-body]]:[&>[data-slot=hover-card-body]]:overflow-auto',
        className,
      )}
      {...props}
    />
  );
});

const HoverCardArrow = forwardRef<
  ComponentRef<typeof HoverCardPrimitive.Arrow>,
  ComponentProps<typeof HoverCardPrimitive.Arrow>
>(function HoverCardArrow({ className, children, ...props }, ref) {
  return (
    <HoverCardPrimitive.Arrow
      ref={ref}
      data-slot="hover-card-arrow"
      className={cn(
        '[--arrow-background:var(--color-popover)] [--arrow-shadow-color:var(--color-border)] [--arrow-size:0.625rem]',
        className,
      )}
      {...props}
    >
      {children ?? <HoverCardArrowTip />}
    </HoverCardPrimitive.Arrow>
  );
});

const HoverCardArrowTip = forwardRef<
  ComponentRef<typeof HoverCardPrimitive.ArrowTip>,
  ComponentProps<typeof HoverCardPrimitive.ArrowTip>
>(function HoverCardArrowTip({ className, ...props }, ref) {
  return (
    <HoverCardPrimitive.ArrowTip
      ref={ref}
      data-slot="hover-card-arrow-tip"
      className={cn('border-t border-l border-border', className)}
      {...props}
    />
  );
});

const HoverCardBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function HoverCardBody({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="hover-card-body"
        className={cn('min-h-0', className)}
        {...props}
      />
    );
  },
);

const HoverCard = Object.assign(HoverCardRoot, {
  Root: HoverCardRoot,
  RootProvider: HoverCardRootProvider,
  Trigger: HoverCardTrigger,
  Positioner: HoverCardPositioner,
  Content: HoverCardContent,
  Arrow: HoverCardArrow,
  ArrowTip: HoverCardArrowTip,
  Body: HoverCardBody,
  Context: HoverCardPrimitive.Context,
});

export { HoverCard, useHoverCard, useHoverCardContext };