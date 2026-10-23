import { ark, type HTMLArkProps } from '@ark-ui/solid/factory';
import {
  Tour as TourPrimitive,
  useTour,
  useTourContext,
  waitForElement,
  waitForElementValue,
  waitForEvent,
  waitForPromise,
} from '@ark-ui/solid/tour';
import type { ComponentProps } from 'solid-js';
import { For, children, splitProps } from 'solid-js';
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
type TourActionListProps = { class?: string };

function Tour(props: TourRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <TourPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </TourPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function TourBackdrop(props: ComponentProps<typeof TourPrimitive.Backdrop>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Backdrop
        class={cn(
          'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] bg-overlay backdrop-blur-[4px] data-[state=closed]:animate-moduix-dialog-backdrop-out data-[state=open]:animate-moduix-dialog-backdrop-in motion-reduce:data-[state]:animate-none',
          local.class,
        )}
        {...others}
        data-slot="tour-backdrop"
      />
    </OverlayPortal>
  );
}

function TourSpotlight(props: ComponentProps<typeof TourPrimitive.Spotlight>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Spotlight
        class={cn(
          'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] ring-2 ring-ring',
          local.class,
        )}
        {...others}
        data-slot="tour-spotlight"
      />
    </OverlayPortal>
  );
}

function TourPositioner(props: ComponentProps<typeof TourPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <TourPrimitive.Positioner
        class={cn(
          'z-[calc(var(--moduix-z-tour)+var(--tour-layer,0))] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0 [--tour-z-index:var(--moduix-z-tour)] data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:grid data-[type=dialog]:place-items-center-safe data-[type=dialog]:overflow-y-auto data-[type=dialog]:overscroll-contain data-[type=dialog]:p-4 data-[type=floating]:fixed data-[type=floating]:max-h-[calc(100dvh-2*var(--moduix-spacing-6))] data-[type=floating]:max-w-[calc(100vw-2*var(--moduix-spacing-6))] data-[type=floating]:data-[placement=bottom]:left-1/2 data-[type=floating]:data-[placement=bottom]:-translate-x-1/2 data-[type=floating]:data-[placement=bottom-end]:end-6 data-[type=floating]:data-[placement=bottom-start]:start-6 data-[type=floating]:data-[placement=center]:top-1/2 data-[type=floating]:data-[placement=center]:left-1/2 data-[type=floating]:data-[placement=center]:-translate-x-1/2 data-[type=floating]:data-[placement=center]:-translate-y-1/2 data-[type=floating]:data-[placement=left]:top-1/2 data-[type=floating]:data-[placement=left]:-translate-y-1/2 data-[type=floating]:data-[placement=left-end]:bottom-6 data-[type=floating]:data-[placement=left-start]:top-6 data-[type=floating]:data-[placement=right]:top-1/2 data-[type=floating]:data-[placement=right]:-translate-y-1/2 data-[type=floating]:data-[placement=right-end]:bottom-6 data-[type=floating]:data-[placement=right-start]:top-6 data-[type=floating]:data-[placement=top]:left-1/2 data-[type=floating]:data-[placement=top]:-translate-x-1/2 data-[type=floating]:data-[placement=top-end]:end-6 data-[type=floating]:data-[placement=top-start]:start-6 data-[type=floating]:data-[placement^=bottom]:bottom-6 data-[type=floating]:data-[placement^=left]:left-6 data-[type=floating]:data-[placement^=right]:right-6 data-[type=floating]:data-[placement^=top]:top-6',
          local.class,
        )}
        {...others}
        data-slot="tour-positioner"
      />
    </OverlayPortal>
  );
}

function TourContent(props: ComponentProps<typeof TourPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Content
      class={cn(
        'relative flex max-h-[min(24rem,var(--available-height,100dvh))] w-[20rem] max-w-[min(calc(100vw-var(--moduix-spacing-8)),var(--available-width,100vw))] origin-[var(--transform-origin)] flex-col gap-1 rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-popup-out data-[state=open]:pointer-events-auto data-[state=open]:animate-moduix-popup-in data-[type=dialog]:w-[26rem] data-[type=floating]:w-[22rem] motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="tour-content"
    />
  );
}

function TourArrow(props: ComponentProps<typeof TourPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TourPrimitive.Arrow
      class={cn(
        '[--arrow-background:var(--color-popover)] [--arrow-size:var(--spacing-2_5)]',
        local.class,
      )}
      {...others}
      data-slot="tour-arrow"
    >
      {resolvedChildren() ?? <TourArrowTip />}
    </TourPrimitive.Arrow>
  );
}

function TourArrowTip(props: ComponentProps<typeof TourPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ArrowTip
      class={cn('border-t border-l border-border', local.class)}
      {...others}
      data-slot="tour-arrow-tip"
    />
  );
}

function TourTitle(props: ComponentProps<typeof TourPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Title
      class={cn('pe-6 text-md font-semibold', local.class)}
      {...others}
      data-slot="tour-title"
    />
  );
}

function TourDescription(props: ComponentProps<typeof TourPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Description
      class={cn('text-sm text-muted-foreground', local.class)}
      {...others}
      data-slot="tour-description"
    />
  );
}

function TourProgressText(props: ComponentProps<typeof TourPrimitive.ProgressText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ProgressText
      class={cn('mt-2 text-xs text-muted-foreground', local.class)}
      {...others}
      data-slot="tour-progress-text"
    />
  );
}

function TourBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={cn('flex min-h-0 flex-col gap-1 overflow-auto', local.class)}
      {...others}
      data-slot="tour-body"
    />
  );
}

function TourCloseTrigger(props: ComponentProps<typeof TourPrimitive.CloseTrigger>) {
  return <TourPrimitive.CloseTrigger {...props} data-slot="tour-close-trigger" />;
}

function TourCloseIcon(props: TourCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'children', 'class']);

  return (
    <TourPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton
          {...triggerProps()}
          data-slot="tour-close-icon"
          aria-label={local['aria-label'] ?? a11yLabels.closeTour}
          class={cn(
            'absolute end-4 top-4 rounded-md [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
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

function TourControl(props: ComponentProps<typeof TourPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Control
      class={cn('mt-3 flex flex-wrap justify-end gap-2', local.class)}
      {...others}
      data-slot="tour-control"
    />
  );
}

function TourActionTrigger(props: ComponentProps<typeof TourPrimitive.ActionTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TourPrimitive.ActionTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          "inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium whitespace-nowrap text-foreground outline-0 transition-[background-color,color] duration-normal ease-in-out focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-[type=close]:border-transparent data-[type=close]:bg-primary data-[type=close]:text-primary-foreground data-[type=next]:border-transparent data-[type=next]:bg-primary data-[type=next]:text-primary-foreground [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):hover]:bg-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent",
        local.class,
      )}
      {...others}
      data-slot="tour-action-trigger"
    />
  );
}

const TourActions = TourPrimitive.Actions;

function TourActionList(props: TourActionListProps) {
  return (
    <TourPrimitive.Actions>
      {(actions) => (
        <For each={actions()}>
          {(action) => <TourActionTrigger action={action} class={props.class} />}
        </For>
      )}
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
} from '@ark-ui/solid/tour';