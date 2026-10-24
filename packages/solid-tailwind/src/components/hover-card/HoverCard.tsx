import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  HoverCard as HoverCardPrimitive,
  useHoverCard,
  useHoverCardContext,
} from '@ark-ui/solid/hover-card';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';

type HoverCardRootProps = ComponentProps<typeof HoverCardPrimitive.Root> & OverlayPortalProps;
type HoverCardRootProviderProps = ComponentProps<typeof HoverCardPrimitive.RootProvider> &
  OverlayPortalProps;

function HoverCard(props: HoverCardRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <HoverCardPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </HoverCardPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function HoverCardRootProvider(props: HoverCardRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <HoverCardPrimitive.RootProvider
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </HoverCardPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function HoverCardTrigger(props: ComponentProps<typeof HoverCardPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <HoverCardPrimitive.Trigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'inline-flex cursor-pointer items-center gap-1 text-primary underline decoration-current/60 decoration-1 underline-offset-2 outline-0 transition-[text-decoration-color] duration-fast ease-in-out focus-visible:rounded-xs focus-visible:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-[state=open]:decoration-current [@media(hover:hover)]:hover:decoration-current',
        local.class,
      )}
      {...others}
      data-slot="hover-card-trigger"
    />
  );
}

function HoverCardPositioner(props: ComponentProps<typeof HoverCardPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <HoverCardPrimitive.Positioner
        class={cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-[var(--available-width)] outline-0',
          local.class,
        )}
        {...others}
        data-slot="hover-card-positioner"
      />
    </OverlayPortal>
  );
}

function HoverCardContent(props: ComponentProps<typeof HoverCardPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <HoverCardPrimitive.Content
      class={cn(
        'relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(24rem,var(--available-width))] min-w-[min(14rem,var(--available-width))] origin-[var(--transform-origin)] rounded-lg border border-border bg-popover p-2 wrap-anywhere text-popover-foreground shadow-lg outline-0 has-[>[data-slot=hover-card-body]]:flex has-[>[data-slot=hover-card-body]]:flex-col data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="hover-card-content"
    />
  );
}

function HoverCardArrow(props: ComponentProps<typeof HoverCardPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <HoverCardPrimitive.Arrow
      class={cn(
        '[--arrow-background:var(--color-popover)] [--arrow-shadow-color:var(--color-border)] [--arrow-size:0.625rem]',
        local.class,
      )}
      {...others}
      data-slot="hover-card-arrow"
    >
      {resolvedChildren() ?? <HoverCardArrowTip />}
    </HoverCardPrimitive.Arrow>
  );
}

function HoverCardArrowTip(props: ComponentProps<typeof HoverCardPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <HoverCardPrimitive.ArrowTip
      class={cn('border-t border-l border-border', local.class)}
      {...others}
      data-slot="hover-card-arrow-tip"
    />
  );
}

function HoverCardBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('min-h-0 overflow-auto', local.class)}
      {...others}
      data-slot="hover-card-body"
    />
  );
}

const HoverCardContext = HoverCardPrimitive.Context;

export {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardBody,
  HoverCardContent,
  HoverCardContext,
  HoverCardPositioner,
  HoverCardRootProvider,
  HoverCardTrigger,
  useHoverCard,
  useHoverCardContext,
};
export type { HoverCardRootProps, HoverCardRootProviderProps };

export type {
  HoverCardArrowProps,
  HoverCardArrowTipProps,
  HoverCardContentProps,
  HoverCardContextProps,
  HoverCardFocusOutsideEvent,
  HoverCardInteractOutsideEvent,
  HoverCardOpenChangeDetails,
  HoverCardPointerDownOutsideEvent,
  HoverCardPositionerProps,
  HoverCardTriggerProps,
  HoverCardTriggerValueChangeDetails,
  UseHoverCardContext,
  UseHoverCardProps,
  UseHoverCardReturn,
} from '@ark-ui/solid/hover-card';