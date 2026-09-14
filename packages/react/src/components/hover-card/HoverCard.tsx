'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  HoverCard as HoverCardPrimitive,
  useHoverCard,
  useHoverCardContext,
} from '@ark-ui/react/hover-card';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import styles from './HoverCard.module.css';

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
      className={clsx(!asChild && styles.trigger, className)}
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
        className={clsx(styles.positioner, className)}
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
      className={clsx(styles.content, className)}
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
      className={clsx(styles.arrow, className)}
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
      className={clsx(styles.arrowTip, className)}
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
        className={clsx(styles.body, className)}
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