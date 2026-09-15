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

function TourRoot(props: TourRootProps) {
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
          'z-[calc(50+var(--tour-layer,0)+var(--layer-index,0))] bg-overlay backdrop-blur-xs data-[state=closed]:animate-[moduix-fade-out_200ms_ease-in-out_forwards] data-[state=open]:animate-[moduix-fade-in_200ms_ease-in-out] motion-reduce:animate-none',
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
        class={cn('z-[calc(50+var(--tour-layer,0))] ring-2 ring-ring', local.class)}
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
          'z-[calc(50+var(--tour-layer,0)+var(--layer-index,0))] max-h-[var(--available-height)] max-w-[var(--available-width)] outline-0 [--tour-z-index:var(--moduix-tour-z-index,var(--moduix-z-modal))] data-[type=dialog]:fixed data-[type=dialog]:inset-0 data-[type=dialog]:grid data-[type=dialog]:place-items-center data-[type=dialog]:overflow-y-auto data-[type=dialog]:overscroll-contain data-[type=dialog]:p-4 data-[type=floating]:fixed data-[type=floating]:max-h-[calc(100dvh-3rem)] data-[type=floating]:max-w-[calc(100vw-3rem)] data-[type=floating]:data-[placement=bottom]:start-1/2 data-[type=floating]:data-[placement=bottom]:bottom-6 data-[type=floating]:data-[placement=bottom]:-translate-x-1/2 data-[type=floating]:data-[placement=bottom-end]:end-6 data-[type=floating]:data-[placement=bottom-end]:bottom-6 data-[type=floating]:data-[placement=bottom-start]:start-6 data-[type=floating]:data-[placement=bottom-start]:bottom-6 data-[type=floating]:data-[placement=center]:inset-1/2 data-[type=floating]:data-[placement=center]:-translate-x-1/2 data-[type=floating]:data-[placement=center]:-translate-y-1/2 data-[type=floating]:data-[placement=left]:start-6 data-[type=floating]:data-[placement=left]:top-1/2 data-[type=floating]:data-[placement=left]:-translate-y-1/2 data-[type=floating]:data-[placement=left-end]:start-6 data-[type=floating]:data-[placement=left-end]:bottom-6 data-[type=floating]:data-[placement=left-start]:start-6 data-[type=floating]:data-[placement=left-start]:top-6 data-[type=floating]:data-[placement=right]:end-6 data-[type=floating]:data-[placement=right]:top-1/2 data-[type=floating]:data-[placement=right]:-translate-y-1/2 data-[type=floating]:data-[placement=right-end]:end-6 data-[type=floating]:data-[placement=right-end]:bottom-6 data-[type=floating]:data-[placement=right-start]:end-6 data-[type=floating]:data-[placement=right-start]:top-6 data-[type=floating]:data-[placement=top]:start-1/2 data-[type=floating]:data-[placement=top]:top-6 data-[type=floating]:data-[placement=top]:-translate-x-1/2 data-[type=floating]:data-[placement=top-end]:end-6 data-[type=floating]:data-[placement=top-end]:top-6 data-[type=floating]:data-[placement=top-start]:start-6 data-[type=floating]:data-[placement=top-start]:top-6',
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
        'relative z-60 flex max-h-[min(24rem,var(--available-height,100dvh))] w-80 max-w-[min(calc(100vw-2rem),var(--available-width,100vw))] origin-[var(--transform-origin)] flex-col gap-1 overflow-visible rounded-lg border border-border bg-popover p-5 text-popover-foreground shadow-lg outline-0 has-[>[data-slot=tour-body]]:grid has-[>[data-slot=tour-body]]:grid-rows-[minmax(0,1fr)_auto] data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open data-[type=dialog]:w-[min(26rem,calc(100vw-2rem))] data-[type=floating]:w-[min(22rem,calc(100vw-2rem))] motion-reduce:animate-none',
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
    <TourPrimitive.Arrow class={cn('!size-2.5', local.class)} {...others} data-slot="tour-arrow">
      {resolvedChildren() ?? <TourArrowTip />}
    </TourPrimitive.Arrow>
  );
}

function TourArrowTip(props: ComponentProps<typeof TourPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ArrowTip
      class={cn('border-t border-l border-border !bg-popover', local.class)}
      {...others}
      data-slot="tour-arrow-tip"
    />
  );
}

function TourTitle(props: ComponentProps<typeof TourPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Title
      class={cn('pe-6 text-md leading-6 font-semibold text-popover-foreground', local.class)}
      {...others}
      data-slot="tour-title"
    />
  );
}

function TourDescription(props: ComponentProps<typeof TourPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Description
      class={cn('text-sm leading-5 text-muted-foreground', local.class)}
      {...others}
      data-slot="tour-description"
    />
  );
}

function TourProgressText(props: ComponentProps<typeof TourPrimitive.ProgressText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.ProgressText
      class={cn('order-1 mt-2 text-xs leading-4 text-muted-foreground', local.class)}
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
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <TourPrimitive.CloseTrigger
      asChild={local.asChild}
      class={cn(
        !local.asChild &&
          'absolute end-4 top-4 inline-flex size-7 cursor-pointer items-center justify-center rounded-md leading-none text-muted-foreground outline-0 focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring [&>svg]:size-3 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-popover-foreground',
        local.class,
      )}
      {...others}
      data-slot="tour-close-trigger"
    />
  );
}

function TourCloseIcon(props: TourCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <TourPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="tour-close-icon"
          aria-label={local['aria-label'] ?? DEFAULT_CLOSE_BUTTON_LABEL}
          aria-labelledby={local['aria-labelledby']}
          class={cn(
            'absolute end-4 top-4 size-7 rounded-md bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
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

function TourControl(props: ComponentProps<typeof TourPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Control
      class={cn('order-2 mt-3 flex flex-wrap justify-end gap-2', local.class)}
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
          "inline-flex min-h-control-sm cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm leading-5 font-medium whitespace-nowrap text-foreground no-underline outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[type=close]:border-primary data-[type=close]:bg-primary data-[type=close]:text-primary-foreground data-[type=next]:border-primary data-[type=next]:bg-primary data-[type=next]:text-primary-foreground motion-reduce:transition-none [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):not([data-disabled]):hover]:border-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:is([data-type='next'],[data-type='close']):not(:disabled):not([data-disabled]):hover]:bg-[color-mix(in_oklab,var(--color-primary),black_12%)] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent",
        local.class,
      )}
      {...others}
      data-slot="tour-action-trigger"
    />
  );
}

const TourActions = TourPrimitive.Actions;

function TourActionList(props: { class?: string }) {
  const [local] = splitProps(props, ['class']);

  return (
    <TourPrimitive.Actions>
      {(actions) => (
        <For each={actions()}>
          {(action) => <TourActionTrigger action={action} class={local.class} />}
        </For>
      )}
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