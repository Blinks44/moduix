'use client';

import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import { Popover as PopoverPrimitive, usePopover, usePopoverContext } from '@ark-ui/react/popover';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
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

function PopoverRoot({
  lazyMount = true,
  modal,
  portalled,
  portalRef,
  unmountOnExit = true,
  ...props
}: PopoverRootProps) {
  const resolvedPortalled = modal || portalled;

  return (
    <OverlayPortalProvider portalled={resolvedPortalled} portalRef={portalRef}>
      <PopoverPrimitive.Root
        lazyMount={lazyMount}
        modal={modal}
        portalled={resolvedPortalled}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

function PopoverRootProvider({
  lazyMount = true,
  portalRef,
  unmountOnExit = true,
  value,
  ...props
}: PopoverRootProviderProps) {
  return (
    <OverlayPortalProvider portalled={value.portalled} portalRef={portalRef}>
      <PopoverPrimitive.RootProvider
        value={value}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
      />
    </OverlayPortalProvider>
  );
}

const PopoverAnchor = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Anchor>,
  ComponentProps<typeof PopoverPrimitive.Anchor>
>(function PopoverAnchor({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Anchor
      ref={ref}
      data-slot="popover-anchor"
      className={className}
      {...props}
    />
  );
});

const PopoverTrigger = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Trigger>,
  ComponentProps<typeof PopoverPrimitive.Trigger>
>(function PopoverTrigger({ asChild, className, ...props }, ref) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      data-slot="popover-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-[state=open]:not-data-[value]:bg-accent data-[current]:data-[state=open]:bg-accent motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
    />
  );
});

const PopoverIndicator = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Indicator>,
  ComponentProps<typeof PopoverPrimitive.Indicator>
>(function PopoverIndicator({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Indicator
      ref={ref}
      data-slot="popover-indicator"
      className={className}
      {...props}
    />
  );
});

const PopoverPositioner = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Positioner>,
  ComponentProps<typeof PopoverPrimitive.Positioner>
>(function PopoverPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <PopoverPrimitive.Positioner
        ref={ref}
        data-slot="popover-positioner"
        className={cn(
          'z-[var(--z-index,var(--moduix-z-popup))] max-w-[var(--available-width)] outline-0',
          className,
        )}
        {...props}
      />
    </OverlayPortal>
  );
});

const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Content>,
  ComponentProps<typeof PopoverPrimitive.Content>
>(function PopoverContent({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Content
      ref={ref}
      data-slot="popover-content"
      className={cn(
        'group/popover-content relative z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] max-h-[min(24rem,var(--available-height,100dvh))] max-w-[min(28rem,var(--available-width))] min-w-[min(16rem,var(--available-width))] origin-[var(--transform-origin)] overflow-visible rounded-md bg-popover p-4 wrap-anywhere text-popover-foreground shadow-lg outline-1 outline-border has-[>[data-slot=popover-body]]:flex has-[>[data-slot=popover-body]]:flex-col data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:animate-none has-[>[data-slot=popover-body]]:[&>[data-slot=popover-body]]:overflow-auto',
        className,
      )}
      {...props}
    />
  );
});

const PopoverArrow = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Arrow>,
  ComponentProps<typeof PopoverPrimitive.Arrow>
>(function PopoverArrow({ className, children, ...props }, ref) {
  return (
    <PopoverPrimitive.Arrow
      ref={ref}
      data-slot="popover-arrow"
      className={cn('[--arrow-background:var(--color-popover)] [--arrow-size:0.625rem]', className)}
      {...props}
    >
      {children ?? <PopoverArrowTip />}
    </PopoverPrimitive.Arrow>
  );
});

const PopoverArrowTip = forwardRef<
  ComponentRef<typeof PopoverPrimitive.ArrowTip>,
  ComponentProps<typeof PopoverPrimitive.ArrowTip>
>(function PopoverArrowTip({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.ArrowTip
      ref={ref}
      data-slot="popover-arrow-tip"
      className={cn('border-t border-l border-border', className)}
      {...props}
    />
  );
});

const PopoverTitle = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Title>,
  ComponentProps<typeof PopoverPrimitive.Title>
>(function PopoverTitle({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Title
      ref={ref}
      data-slot="popover-title"
      className={cn('text-md leading-6 font-semibold text-popover-foreground', className)}
      {...props}
    />
  );
});

const PopoverDescription = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Description>,
  ComponentProps<typeof PopoverPrimitive.Description>
>(function PopoverDescription({ className, ...props }, ref) {
  return (
    <PopoverPrimitive.Description
      ref={ref}
      data-slot="popover-description"
      className={cn('text-sm leading-5 text-muted-foreground', className)}
      {...props}
    />
  );
});

const PopoverCloseTrigger = forwardRef<
  ComponentRef<typeof PopoverPrimitive.CloseTrigger>,
  ComponentProps<typeof PopoverPrimitive.CloseTrigger>
>(function PopoverCloseTrigger({ asChild, className, ...props }, ref) {
  return (
    <PopoverPrimitive.CloseTrigger
      ref={ref}
      data-slot="popover-close-trigger"
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-0 transition-[background-color,border-color,color] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-accent disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [@media(hover:hover)]:hover:bg-accent',
        className,
      )}
      {...props}
    />
  );
});

const PopoverCloseIcon = forwardRef<
  ComponentRef<typeof CloseButton.Root>,
  Omit<ComponentProps<typeof PopoverPrimitive.CloseTrigger>, 'asChild'>
>(function PopoverCloseIcon(
  { className, children, 'aria-label': ariaLabel = DEFAULT_CLOSE_BUTTON_LABEL, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.CloseTrigger asChild {...props}>
      <CloseButton.Root
        ref={ref}
        data-slot="popover-close-icon"
        aria-label={ariaLabel}
        className={cn(
          'absolute end-3 top-3 size-7 rounded-sm bg-transparent text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring motion-reduce:transition-none [&>svg]:size-3.5 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-accent [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-popover-foreground',
          className,
        )}
      >
        {children}
      </CloseButton.Root>
    </PopoverPrimitive.CloseTrigger>
  );
});

const PopoverHeader = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function PopoverHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="popover-header"
        className={cn(
          'grid gap-1 group-has-[>[data-slot=popover-close-icon]]/popover-content:pe-10',
          className,
        )}
        {...props}
      />
    );
  },
);

const PopoverBody = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function PopoverBody({ className, ...props }, ref) {
    return (
      <ark.div ref={ref} data-slot="popover-body" className={cn('min-h-0', className)} {...props} />
    );
  },
);

const PopoverFooter = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function PopoverFooter({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-slot="popover-footer"
        className={cn('mt-3 flex items-center justify-end gap-2', className)}
        {...props}
      />
    );
  },
);

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