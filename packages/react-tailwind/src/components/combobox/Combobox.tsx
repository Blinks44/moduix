'use client';

import {
  Combobox as ComboboxPrimitive,
  type CollectionItem,
  type ComboboxRootComponent as ArkComboboxRootComponent,
  type ComboboxRootProps as ArkComboboxRootProps,
  type ComboboxRootProviderComponent as ArkComboboxRootProviderComponent,
  type ComboboxRootProviderProps as ArkComboboxRootProviderProps,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
} from '@ark-ui/react/combobox';
import { ark, type HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef, ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronUpDownIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import { CloseButton } from '../close-button';

type ComboboxRootProps<T extends CollectionItem> = ArkComboboxRootProps<T> & OverlayPortalProps;
type ComboboxRootProviderProps<T extends CollectionItem> = ArkComboboxRootProviderProps<T> &
  OverlayPortalProps;

const Combobox = forwardRef(function Combobox<T extends CollectionItem>(
  {
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  }: ComboboxRootProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ComboboxPrimitive.Root
        ref={ref}
        className={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-1.5 text-foreground',
          className,
        )}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="combobox-root"
      />
    </OverlayPortalProvider>
  );
}) as ArkComboboxRootComponent<OverlayPortalProps>;

const ComboboxRootProvider = forwardRef(function ComboboxRootProvider<T extends CollectionItem>(
  {
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  }: ComboboxRootProviderProps<T>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ComboboxPrimitive.RootProvider
        ref={ref}
        className={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-1.5 text-foreground',
          className,
        )}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="combobox-root-provider"
      />
    </OverlayPortalProvider>
  );
}) as ArkComboboxRootProviderComponent<OverlayPortalProps>;

const ComboboxLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Label>,
  ComponentProps<typeof ComboboxPrimitive.Label>
>(function ComboboxLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Label
      ref={ref}
      className={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none data-disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="combobox-label"
    />
  );
});

const ComboboxControl = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Control>,
  ComponentProps<typeof ComboboxPrimitive.Control>
>(function ComboboxControl({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Control
      ref={ref}
      className={cn(
        'group/combobox-control relative flex w-full min-w-0 items-center rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out data-disabled:opacity-50 data-focus:border-ring data-focus:outline-ring data-invalid:border-destructive data-invalid:outline-destructive data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="combobox-control"
    />
  );
});

const ComboboxInput = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Input>,
  ComponentProps<typeof ComboboxPrimitive.Input>
>(function ComboboxInput({ asChild, className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Input
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'm-0 box-border h-control-md w-full min-w-0 rounded-[inherit] border-0 bg-transparent px-3.5 text-inherit outline-0 [font:inherit] group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:pe-[4.375rem] group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-11 group-has-[>[data-slot=combobox-clear-trigger]]/combobox-control:group-has-[>[data-slot=combobox-trigger]]/combobox-control:pe-[4.375rem] placeholder:text-muted-foreground',
        className,
      )}
      {...props}
      data-slot="combobox-input"
    />
  );
});

const ComboboxClearTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ClearTrigger>,
  ComponentProps<typeof ComboboxPrimitive.ClearTrigger>
>(function ComboboxClearTrigger(
  {
    asChild,
    className,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const triggerClassName = cn(
    'absolute inset-y-0 end-[2.125rem] my-auto size-control-xs transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none [&>svg]:size-4',
    className,
  );

  return (
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      asChild
      className={triggerClassName}
      aria-label={asChild ? ariaLabel : undefined}
      aria-labelledby={asChild ? ariaLabelledBy : undefined}
      {...props}
      data-slot="combobox-clear-trigger"
    >
      {asChild ? (
        children
      ) : (
        <CloseButton
          aria-label={ariaLabel ?? (ariaLabelledBy == null ? 'Clear selection' : undefined)}
          aria-labelledby={ariaLabelledBy}
        >
          {children}
        </CloseButton>
      )}
    </ComboboxPrimitive.ClearTrigger>
  );
});

const ComboboxTrigger = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Trigger>,
  ComponentProps<typeof ComboboxPrimitive.Trigger>
>(function ComboboxTrigger({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      className={cn(
        'absolute end-2 top-1/2 m-0 box-border inline-flex size-control-xs shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 [line-height:0] text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default motion-reduce:transition-none [&>svg]:block [&>svg]:size-4 [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:text-foreground',
        className,
      )}
      {...props}
      data-slot="combobox-trigger"
    >
      {children ?? <ChevronUpDownIcon />}
    </ComboboxPrimitive.Trigger>
  );
});

const ComboboxPositioner = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Positioner>,
  ComponentProps<typeof ComboboxPrimitive.Positioner>
>(function ComboboxPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <ComboboxPrimitive.Positioner
        ref={ref}
        className={cn('z-[var(--z-index)] outline-0', className)}
        {...props}
        data-slot="combobox-positioner"
      />
    </OverlayPortal>
  );
});

const ComboboxContent = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Content>,
  ComponentProps<typeof ComboboxPrimitive.Content>
>(function ComboboxContent({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Content
      ref={ref}
      className={cn(
        'z-[calc(60+var(--layer-index,0))] box-border flex max-h-[min(24rem,var(--available-height))] max-w-[var(--available-width)] min-w-[var(--reference-width)] origin-[var(--transform-origin)] scroll-py-1 flex-col overflow-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )}
      {...props}
      data-slot="combobox-content"
    />
  );
});

const ComboboxEmpty = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Empty>,
  ComponentProps<typeof ComboboxPrimitive.Empty>
>(function ComboboxEmpty({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Empty
      ref={ref}
      className={cn('px-4 py-1 text-sm text-muted-foreground', className)}
      {...props}
      data-slot="combobox-empty"
    />
  );
});

const ComboboxStatus = forwardRef<ComponentRef<typeof ark.div>, HTMLArkProps<'div'>>(
  function ComboboxStatus({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn('px-4 py-1 text-sm text-muted-foreground', className)}
        {...props}
        data-slot="combobox-status"
      />
    );
  },
);

const ComboboxList = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.List>,
  ComponentProps<typeof ComboboxPrimitive.List>
>(function ComboboxList({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.List
      ref={ref}
      className={cn('flex min-h-0 flex-col outline-0 data-empty:hidden', className)}
      {...props}
      data-slot="combobox-list"
    />
  );
});

const ComboboxItemGroup = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemGroup>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroup>
>(function ComboboxItemGroup({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroup
      ref={ref}
      className={cn('flex flex-col [&+&]:mt-2', className)}
      {...props}
      data-slot="combobox-item-group"
    />
  );
});

const ComboboxItemGroupLabel = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemGroupLabel>,
  ComponentProps<typeof ComboboxPrimitive.ItemGroupLabel>
>(function ComboboxItemGroupLabel({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemGroupLabel
      ref={ref}
      className={cn(
        'sticky -top-1 z-1 bg-popover px-2.5 py-1 text-xs font-normal text-muted-foreground',
        className,
      )}
      {...props}
      data-slot="combobox-item-group-label"
    />
  );
});

const ComboboxItem = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.Item>,
  ComponentProps<typeof ComboboxPrimitive.Item>
>(function ComboboxItem({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.Item
      ref={ref}
      className={cn(
        'relative mx-1 box-border flex min-h-control-sm w-[calc(100%-0.5rem)] cursor-default items-center justify-between gap-2 rounded-sm border-0 bg-transparent px-3 py-1 text-sm text-popover-foreground outline-0 select-none data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-[state=checked]:text-popover-foreground',
        className,
      )}
      {...props}
      data-slot="combobox-item"
    />
  );
});

const ComboboxItemText = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemText>,
  ComponentProps<typeof ComboboxPrimitive.ItemText>
>(function ComboboxItemText({ className, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemText
      ref={ref}
      className={cn('min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
      data-slot="combobox-item-text"
    />
  );
});

const ComboboxItemIndicator = forwardRef<
  ComponentRef<typeof ComboboxPrimitive.ItemIndicator>,
  ComponentProps<typeof ComboboxPrimitive.ItemIndicator>
>(function ComboboxItemIndicator({ className, children, ...props }, ref) {
  return (
    <ComboboxPrimitive.ItemIndicator
      ref={ref}
      className={cn(
        'inline-flex size-3 shrink-0 items-center justify-center [&>svg]:size-full',
        className,
      )}
      {...props}
      data-slot="combobox-item-indicator"
    >
      {children ?? <CheckIcon />}
    </ComboboxPrimitive.ItemIndicator>
  );
});

type ComboboxOptionProps = Omit<
  ComponentProps<typeof ComboboxPrimitive.Item>,
  'asChild' | 'children'
> & {
  children: ReactNode;
  indicator?: ReactNode | false;
};

const ComboboxOption = forwardRef<ComponentRef<typeof ComboboxPrimitive.Item>, ComboboxOptionProps>(
  function ComboboxOption({ children, indicator, ...props }, ref) {
    return (
      <ComboboxItem ref={ref} {...props}>
        <ComboboxItemText>{children}</ComboboxItemText>
        {indicator !== false ? <ComboboxItemIndicator>{indicator}</ComboboxItemIndicator> : null}
      </ComboboxItem>
    );
  },
);

const ComboboxContext = ComboboxPrimitive.Context;
const ComboboxItemContext = ComboboxPrimitive.ItemContext;

export {
  Combobox,
  ComboboxClearTrigger,
  ComboboxContext,
  ComboboxContent,
  ComboboxControl,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemContext,
  ComboboxItemGroup,
  ComboboxItemGroupLabel,
  ComboboxItemIndicator,
  ComboboxItemText,
  ComboboxLabel,
  ComboboxList,
  ComboboxOption,
  ComboboxPositioner,
  ComboboxRootProvider,
  ComboboxStatus,
  ComboboxTrigger,
  useCombobox,
  useComboboxContext,
  useComboboxItemContext,
};