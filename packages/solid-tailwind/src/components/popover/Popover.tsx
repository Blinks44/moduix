import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { Popover as PopoverPrimitive, usePopover, usePopoverContext } from '@ark-ui/solid/popover';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

const DEFAULT_CLOSE_BUTTON_LABEL = 'Close popover';

type PopoverRootProps = ComponentProps<typeof PopoverPrimitive.Root> & OverlayPortalProps;
type PopoverRootProviderProps = ComponentProps<typeof PopoverPrimitive.RootProvider> & {
  portalRef?: OverlayPortalProps['portalRef'];
};
type PopoverCloseIconProps = Omit<ComponentProps<typeof PopoverPrimitive.CloseTrigger>, 'asChild'>;

function PopoverRoot(props: PopoverRootProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'modal',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);
  const resolvedPortalled = () => local.modal || local.portalled;

  return (
    <OverlayPortalProvider portalled={resolvedPortalled()} portalRef={local.portalRef}>
      <PopoverPrimitive.Root
        lazyMount={local.lazyMount ?? true}
        modal={local.modal}
        portalled={resolvedPortalled()}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </PopoverPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function PopoverRootProvider(props: PopoverRootProviderProps) {
  const [local, others] = splitProps(props, [
    'children',
    'lazyMount',
    'portalRef',
    'unmountOnExit',
    'value',
  ]);

  return (
    <OverlayPortalProvider portalled={props.value().portalled} portalRef={local.portalRef}>
      <PopoverPrimitive.RootProvider
        value={local.value}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </PopoverPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  const [local, others] = splitProps(props, ['class']);

  return <PopoverPrimitive.Anchor data-slot="popover-anchor" class={local.class} {...others} />;
}

function PopoverTrigger(props: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <PopoverPrimitive.Trigger
      asChild={local.asChild}
      data-slot="popover-trigger"
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=open]:not-data-[value]:bg-accent data-[current]:data-[state=open]:bg-accent motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
    />
  );
}

function PopoverIndicator(props: ComponentProps<typeof PopoverPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Indicator data-slot="popover-indicator" class={local.class} {...others} />
  );
}

function PopoverPositioner(props: ComponentProps<typeof PopoverPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        class={cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-[var(--available-width)] outline-0',
          local.class,
        )}
        {...others}
      />
    </OverlayPortal>
  );
}

function PopoverContent(props: ComponentProps<typeof PopoverPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      class={cn(
        'group/popover-content relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(28rem,var(--available-width))] min-w-[min(16rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-md bg-popover p-4 wrap-anywhere text-popover-foreground shadow-lg outline-1 outline-border has-[>[data-slot=popover-body]]:flex has-[>[data-slot=popover-body]]:flex-col data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none has-[>[data-slot=popover-body]]:[&>[data-slot=popover-body]]:overflow-auto',
        local.class,
      )}
      {...others}
    />
  );
}

function PopoverArrow(props: ComponentProps<typeof PopoverPrimitive.Arrow>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      class={cn('[--arrow-background:var(--color-popover)] [--arrow-size:0.625rem]', local.class)}
      {...others}
    >
      {resolvedChildren() ?? <PopoverArrowTip />}
    </PopoverPrimitive.Arrow>
  );
}

function PopoverArrowTip(props: ComponentProps<typeof PopoverPrimitive.ArrowTip>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.ArrowTip
      data-slot="popover-arrow-tip"
      class={cn('border-t border-l border-border', local.class)}
      {...others}
    />
  );
}

function PopoverTitle(props: ComponentProps<typeof PopoverPrimitive.Title>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      class={cn('text-md leading-6 font-semibold text-popover-foreground', local.class)}
      {...others}
    />
  );
}

function PopoverDescription(props: ComponentProps<typeof PopoverPrimitive.Description>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      class={cn('text-sm leading-5 text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function PopoverCloseTrigger(props: ComponentProps<typeof PopoverPrimitive.CloseTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <PopoverPrimitive.CloseTrigger
      asChild={local.asChild}
      data-slot="popover-close-trigger"
      class={cn(
        !local.asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        local.class,
      )}
      {...others}
    />
  );
}

function PopoverCloseIcon(props: PopoverCloseIconProps) {
  const [local, others] = splitProps(props, ['aria-label', 'aria-labelledby', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <PopoverPrimitive.CloseTrigger
      asChild={(triggerProps) => (
        <CloseButton.Root
          {...triggerProps()}
          data-slot="popover-close-icon"
          aria-label={local['aria-label'] ?? DEFAULT_CLOSE_BUTTON_LABEL}
          aria-labelledby={local['aria-labelledby']}
          class={cn(
            'absolute end-3 top-3 size-7 rounded-sm bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
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

function PopoverHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="popover-header"
      class={cn(
        'grid gap-1 group-has-[>[data-slot=popover-close-icon]]/popover-content:pe-10',
        local.class,
      )}
      {...others}
    />
  );
}

function PopoverBody(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return <ark.div data-slot="popover-body" class={cn('min-h-0', local.class)} {...others} />;
}

function PopoverFooter(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-slot="popover-footer"
      class={cn('mt-3 flex items-center justify-end gap-2', local.class)}
      {...others}
    />
  );
}

const Popover = Object.assign(PopoverRoot, {
  Root: PopoverRoot,
  RootProvider: PopoverRootProvider,
  Context: PopoverPrimitive.Context,
  Anchor: PopoverAnchor,
  Trigger: PopoverTrigger,
  Indicator: PopoverIndicator,
  Positioner: PopoverPositioner,
  Content: PopoverContent,
  Arrow: PopoverArrow,
  ArrowTip: PopoverArrowTip,
  Title: PopoverTitle,
  Description: PopoverDescription,
  CloseTrigger: PopoverCloseTrigger,
  CloseIcon: PopoverCloseIcon,
  Header: PopoverHeader,
  Body: PopoverBody,
  Footer: PopoverFooter,
});

export { Popover, usePopover, usePopoverContext };
export type { PopoverRootProps, PopoverRootProviderProps };