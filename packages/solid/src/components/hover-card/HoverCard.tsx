import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import {
  HoverCard as HoverCardPrimitive,
  useHoverCard,
  useHoverCardContext,
} from '@ark-ui/solid/hover-card';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import styles from './HoverCard.module.css';

type HoverCardRootProps = ComponentProps<typeof HoverCardPrimitive.Root> & OverlayPortalProps;
type HoverCardRootProviderProps = ComponentProps<typeof HoverCardPrimitive.RootProvider> &
  OverlayPortalProps;

function HoverCardRoot(props: HoverCardRootProps) {
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
      class={clsx(!local.asChild && styles.trigger, local.class)}
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
        class={clsx(styles.positioner, local.class)}
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
      class={clsx(styles.content, local.class)}
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
      class={clsx(styles.arrow, local.class)}
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
      class={clsx(styles.arrowTip, local.class)}
      {...others}
      data-slot="hover-card-arrow-tip"
    />
  );
}

function HoverCardBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.div
      asChild={local.asChild}
      class={clsx(styles.body, local.class)}
      {...others}
      data-slot="hover-card-body"
    />
  );
}

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
export type { HoverCardRootProps, HoverCardRootProviderProps };