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
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

type TourRootProps = ComponentProps<typeof TourPrimitive.Root> & OverlayPortalProps;
type TourCloseIconProps = Omit<ComponentProps<typeof TourPrimitive.CloseTrigger>, 'asChild'>;
type TourActionListProps = { className?: string };

function Tour({
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
          'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
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
          'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] ring-2 ring-ring',
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
          'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] max-h-(--available-height) max-w-(--available-width) outline-0 [--tour-z-index:var(--moduix-z-tour)] data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:grid data-[type=dialog]:place-items-center-safe data-[type=dialog]:overflow-y-auto data-[type=dialog]:overscroll-contain data-[type=dialog]:p-4 data-[type=floating]:fixed data-[type=floating]:max-h-[calc(100dvh-2*var(--moduix-spacing-6))] data-[type=floating]:max-w-[calc(100vw-2*var(--moduix-spacing-6))] data-[type=floating]:data-[placement=bottom]:left-1/2 data-[type=floating]:data-[placement=bottom]:-translate-x-1/2 data-[type=floating]:data-[placement=bottom-end]:end-6 data-[type=floating]:data-[placement=bottom-start]:start-6 data-[type=floating]:data-[placement=center]:top-1/2 data-[type=floating]:data-[placement=center]:left-1/2 data-[type=floating]:data-[placement=center]:-translate-x-1/2 data-[type=floating]:data-[placement=center]:-translate-y-1/2 data-[type=floating]:data-[placement=left]:top-1/2 data-[type=floating]:data-[placement=left]:-translate-y-1/2 data-[type=floating]:data-[placement=left-end]:bottom-6 data-[type=floating]:data-[placement=left-start]:top-6 data-[type=floating]:data-[placement=right]:top-1/2 data-[type=floating]:data-[placement=right]:-translate-y-1/2 data-[type=floating]:data-[placement=right-end]:bottom-6 data-[type=floating]:data-[placement=right-start]:top-6 data-[type=floating]:data-[placement=top]:left-1/2 data-[type=floating]:data-[placement=top]:-translate-x-1/2 data-[type=floating]:data-[placement=top-end]:end-6 data-[type=floating]:data-[placement=top-start]:start-6 data-[type=floating]:data-[placement^=bottom]:bottom-6 data-[type=floating]:data-[placement^=left]:left-6 data-[type=floating]:data-[placement^=right]:right-6 data-[type=floating]:data-[placement^=top]:top-6',
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
        'relative flex max-h-[min(24rem,var(--available-height,100dvh))] w-[20rem] max-w-[min(calc(100vw-var(--moduix-spacing-8)),var(--available-width,100vw))] origin-(--transform-origin) flex-col gap-1 rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-popup-out data-[state=open]:pointer-events-auto data-[state=open]:animate-moduix-popup-in data-[type=dialog]:w-[26rem] data-[type=floating]:w-[22rem] motion-reduce:data-[state]:animate-none',
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
      className={cn(
        '[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]',
        className,
      )}
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
      className={cn('border-t border-l border-border', className)}
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
      className={cn('pe-6 text-md font-semibold', className)}
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
      className={cn('text-sm text-muted-foreground', className)}
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
      className={cn('mt-2 text-xs text-muted-foreground', className)}
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
>(function TourCloseTrigger(props, ref) {
  return <TourPrimitive.CloseTrigger ref={ref} {...props} data-slot="tour-close-trigger" />;
});

const TourCloseIcon = forwardRef<ComponentRef<typeof CloseButton>, TourCloseIconProps>(
  function TourCloseIcon(
    { className, children, 'aria-label': ariaLabel = a11yLabels.closeTour, ...props },
    ref,
  ) {
    return (
      <TourPrimitive.CloseTrigger asChild {...props}>
        <CloseButton
          ref={ref}
          data-slot="tour-close-icon"
          aria-label={ariaLabel}
          className={cn(
            'absolute end-4 top-4 rounded-md [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
            className,
          )}
        >
          {children}
        </CloseButton>
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
      className={cn('mt-3 flex flex-wrap justify-end gap-2', className)}
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
          "inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground outline-0 transition-[background-color,color] duration-normal ease-in-out focus-visible:outline-focus-inset focus-visible:outline-offset-focus-inset focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-[type=close]:border-transparent data-[type=close]:bg-primary data-[type=close]:text-primary-foreground data-[type=next]:border-transparent data-[type=next]:bg-primary data-[type=next]:text-primary-foreground [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):hover]:bg-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent",
        className,
      )}
      {...props}
      data-slot="tour-action-trigger"
    />
  );
});

const TourActions = TourPrimitive.Actions;

function TourActionList({ className }: TourActionListProps) {
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

const TourContext = TourPrimitive.Context;

export {
  Tour,
  TourActionList,
  TourActionTrigger,
  TourActions,
  TourArrow,
  TourArrowTip,
  TourBackdrop,
  TourBody,
  TourCloseIcon,
  TourCloseTrigger,
  TourContent,
  TourContext,
  TourControl,
  TourDescription,
  TourPositioner,
  TourProgressText,
  TourSpotlight,
  TourTitle,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
};

export type { TourActionListProps, TourCloseIconProps, TourRootProps };

export type {
  TourActionTriggerProps,
  TourActionsProps,
  TourArrowProps,
  TourArrowTipProps,
  TourBackdropProps,
  TourCloseTriggerProps,
  TourContentProps,
  TourContextProps,
  TourControlProps,
  TourDescriptionProps,
  TourPositionerProps,
  TourProgressTextProps,
  TourSpotlightProps,
  TourStatusChangeDetails,
  TourStepChangeDetails,
  TourStepDetails,
  TourStepEffectArgs,
  TourTitleProps,
  UseTourContext,
  UseTourProps,
  UseTourReturn,
  WaitForEventOptions,
  WaitOptions,
} from '@ark-ui/react/tour';