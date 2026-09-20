'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import {
  Tour as TourPrimitive,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
} from '@ark-ui/react/tour';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close tour';

type TourRootProps = ComponentProps<typeof TourPrimitive.Root> & OverlayPortalProps;
type TourCloseIconProps = Omit<ComponentProps<typeof TourPrimitive.CloseTrigger>, 'asChild'>;

function TourRoot({
  lazyMount = true,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: TourRootProps) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <TourPrimitive.Root lazyMount={lazyMount} unmountOnExit={unmountOnExit} {...props} />
    </OverlayPortalProvider>
  );
}

const TourBackdrop = forwardRef<
  ComponentRef<typeof TourPrimitive.Backdrop>,
  ComponentProps<typeof TourPrimitive.Backdrop>
>(function TourBackdrop({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TourPrimitive.Backdrop
        ref={ref}
        className={cn(
          'z-[calc(50+var(--tour-layer,0)+var(--layer-index,0))] bg-overlay backdrop-blur-xs data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:animate-none',
          className,
        )}
        {...props}
        data-slot="tour-backdrop"
      />
    </OverlayPortal>
  );
});

const TourSpotlight = forwardRef<
  ComponentRef<typeof TourPrimitive.Spotlight>,
  ComponentProps<typeof TourPrimitive.Spotlight>
>(function TourSpotlight({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TourPrimitive.Spotlight
        ref={ref}
        className={cn(
          'z-[calc(50+var(--tour-layer,0)+var(--layer-index,0))] ring-2 ring-ring',
          className,
        )}
        {...props}
        data-slot="tour-spotlight"
      />
    </OverlayPortal>
  );
});

const TourPositioner = forwardRef<
  ComponentRef<typeof TourPrimitive.Positioner>,
  ComponentProps<typeof TourPrimitive.Positioner>
>(function TourPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <TourPrimitive.Positioner
        ref={ref}
        className={cn(
          'z-[calc(50+var(--tour-layer,0)+var(--layer-index,0))] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0 [--tour-z-index:var(--moduix-tour-z-index,var(--moduix-z-modal))] data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:grid data-[type=dialog]:place-items-center data-[type=dialog]:overflow-y-auto data-[type=dialog]:overscroll-contain data-[type=dialog]:p-4 data-[type=floating]:fixed data-[type=floating]:max-h-[calc(100dvh-3rem)] data-[type=floating]:max-w-[calc(100vw-3rem)] data-[type=floating]:data-[placement=bottom]:start-1/2 data-[type=floating]:data-[placement=bottom]:bottom-6 data-[type=floating]:data-[placement=bottom]:-translate-x-1/2 data-[type=floating]:data-[placement=bottom-end]:end-6 data-[type=floating]:data-[placement=bottom-end]:bottom-6 data-[type=floating]:data-[placement=bottom-start]:start-6 data-[type=floating]:data-[placement=bottom-start]:bottom-6 data-[type=floating]:data-[placement=center]:inset-1/2 data-[type=floating]:data-[placement=center]:-translate-x-1/2 data-[type=floating]:data-[placement=center]:-translate-y-1/2 data-[type=floating]:data-[placement=left]:start-6 data-[type=floating]:data-[placement=left]:top-1/2 data-[type=floating]:data-[placement=left]:-translate-y-1/2 data-[type=floating]:data-[placement=left-end]:start-6 data-[type=floating]:data-[placement=left-end]:bottom-6 data-[type=floating]:data-[placement=left-start]:start-6 data-[type=floating]:data-[placement=left-start]:top-6 data-[type=floating]:data-[placement=right]:end-6 data-[type=floating]:data-[placement=right]:top-1/2 data-[type=floating]:data-[placement=right]:-translate-y-1/2 data-[type=floating]:data-[placement=right-end]:end-6 data-[type=floating]:data-[placement=right-end]:bottom-6 data-[type=floating]:data-[placement=right-start]:end-6 data-[type=floating]:data-[placement=right-start]:top-6 data-[type=floating]:data-[placement=top]:start-1/2 data-[type=floating]:data-[placement=top]:top-6 data-[type=floating]:data-[placement=top]:-translate-x-1/2 data-[type=floating]:data-[placement=top-end]:end-6 data-[type=floating]:data-[placement=top-end]:top-6 data-[type=floating]:data-[placement=top-start]:start-6 data-[type=floating]:data-[placement=top-start]:top-6',
          className,
        )}
        {...props}
        data-slot="tour-positioner"
      />
    </OverlayPortal>
  );
});

const TourContent = forwardRef<
  ComponentRef<typeof TourPrimitive.Content>,
  ComponentProps<typeof TourPrimitive.Content>
>(function TourContent({ className, ...props }, ref) {
  return (
    <TourPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-60 flex max-h-[min(24rem,var(--available-height,100dvh))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100vw))] origin-[var(--transform-origin)] flex-col gap-1 overflow-visible rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg outline-0 has-[>[data-slot=tour-body]]:grid has-[>[data-slot=tour-body]]:grid-rows-[minmax(0,1fr)_auto] data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open data-[type=dialog]:w-[min(26rem,calc(100vw-2rem))] data-[type=floating]:w-[min(22rem,calc(100vw-2rem))] motion-reduce:animate-none',
        className,
      )}
      {...props}
      data-slot="tour-content"
    />
  );
});

const TourArrow = forwardRef<
  ComponentRef<typeof TourPrimitive.Arrow>,
  ComponentProps<typeof TourPrimitive.Arrow>
>(function TourArrow({ className, children, ...props }, ref) {
  return (
    <TourPrimitive.Arrow
      ref={ref}
      className={cn('!size-2.5', className)}
      {...props}
      data-slot="tour-arrow"
    >
      {children ?? <TourArrowTip />}
    </TourPrimitive.Arrow>
  );
});

const TourArrowTip = forwardRef<
  ComponentRef<typeof TourPrimitive.ArrowTip>,
  ComponentProps<typeof TourPrimitive.ArrowTip>
>(function TourArrowTip({ className, ...props }, ref) {
  return (
    <TourPrimitive.ArrowTip
      ref={ref}
      className={cn('border-t border-l border-border !bg-popover', className)}
      {...props}
      data-slot="tour-arrow-tip"
    />
  );
});

const TourTitle = forwardRef<
  ComponentRef<typeof TourPrimitive.Title>,
  ComponentProps<typeof TourPrimitive.Title>
>(function TourTitle({ className, ...props }, ref) {
  return (
    <TourPrimitive.Title
      ref={ref}
      className={cn('pe-6 text-md leading-6 font-semibold text-popover-foreground', className)}
      {...props}
      data-slot="tour-title"
    />
  );
});

const TourDescription = forwardRef<
  ComponentRef<typeof TourPrimitive.Description>,
  ComponentProps<typeof TourPrimitive.Description>
>(function TourDescription({ className, ...props }, ref) {
  return (
    <TourPrimitive.Description
      ref={ref}
      className={cn('text-sm leading-5 text-muted-foreground', className)}
      {...props}
      data-slot="tour-description"
    />
  );
});

const TourProgressText = forwardRef<
  ComponentRef<typeof TourPrimitive.ProgressText>,
  ComponentProps<typeof TourPrimitive.ProgressText>
>(function TourProgressText({ className, ...props }, ref) {
  return (
    <TourPrimitive.ProgressText
      ref={ref}
      className={cn('order-1 mt-2 text-xs leading-4 text-muted-foreground', className)}
      {...props}
      data-slot="tour-progress-text"
    />
  );
});

const TourBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(function TourBody(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      className={cn('flex min-h-0 flex-col gap-1 overflow-auto', className)}
      {...props}
      data-slot="tour-body"
    />
  );
});

const TourCloseTrigger = forwardRef<
  ComponentRef<typeof TourPrimitive.CloseTrigger>,
  ComponentProps<typeof TourPrimitive.CloseTrigger>
>(function TourCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <TourPrimitive.CloseTrigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'absolute end-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md leading-none text-muted-foreground outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [&>svg]:size-3 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-popover-foreground',
        className,
      )}
      {...props}
      data-slot="tour-close-trigger"
    />
  );
});

const TourCloseIcon = forwardRef<ComponentRef<typeof CloseButton.Root>, TourCloseIconProps>(
  function TourCloseIcon(
    { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
    ref,
  ) {
    return (
      <TourPrimitive.CloseTrigger asChild {...props}>
        <CloseButton.Root
          ref={ref}
          data-slot="tour-close-icon"
          aria-label={ariaLabel}
          className={cn(
            'absolute end-4 top-4 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
            className,
          )}
        >
          {children}
        </CloseButton.Root>
      </TourPrimitive.CloseTrigger>
    );
  },
);

const TourControl = forwardRef<
  ComponentRef<typeof TourPrimitive.Control>,
  ComponentProps<typeof TourPrimitive.Control>
>(function TourControl({ className, ...props }, ref) {
  return (
    <TourPrimitive.Control
      ref={ref}
      className={cn('order-2 mt-3 flex flex-wrap justify-end gap-2', className)}
      {...props}
      data-slot="tour-control"
    />
  );
});

const TourActionTrigger = forwardRef<
  ComponentRef<typeof TourPrimitive.ActionTrigger>,
  ComponentProps<typeof TourPrimitive.ActionTrigger>
>(function TourActionTrigger({ asChild, className, ...props }, ref) {
  return (
    <TourPrimitive.ActionTrigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          "inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 font-medium whitespace-nowrap text-foreground no-underline outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[type=close]:border-primary data-[type=close]:bg-primary data-[type=close]:text-primary-foreground data-[type=next]:border-primary data-[type=next]:bg-primary data-[type=next]:text-primary-foreground motion-reduce:transition-none [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):not([data-disabled]):hover]:border-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):not([data-disabled]):hover]:bg-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent",
        className,
      )}
      {...props}
      data-slot="tour-action-trigger"
    />
  );
});

const TourActions = TourPrimitive.Actions;

function TourActionList({ className }: { className?: string }) {
  return (
    <TourPrimitive.Actions>
      {(actions) =>
        actions.map((action, index) => (
          <TourActionTrigger
            key={`${action.label}-${index}`}
            action={action}
            className={className}
          />
        ))
      }
    </TourPrimitive.Actions>
  );
}

const Tour = Object.assign(TourRoot, {
  Root: TourRoot,
  Context: TourPrimitive.Context,
  Backdrop: TourBackdrop,
  Spotlight: TourSpotlight,
  Positioner: TourPositioner,
  Content: TourContent,
  Arrow: TourArrow,
  ArrowTip: TourArrowTip,
  Title: TourTitle,
  Description: TourDescription,
  ProgressText: TourProgressText,
  Body: TourBody,
  CloseTrigger: TourCloseTrigger,
  CloseIcon: TourCloseIcon,
  Control: TourControl,
  Actions: TourActions,
  ActionList: TourActionList,
  ActionTrigger: TourActionTrigger,
});

export {
  Tour,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
};

export type { TourCloseIconProps, TourRootProps };