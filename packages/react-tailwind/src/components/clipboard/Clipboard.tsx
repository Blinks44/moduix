'use client';

import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/react/clipboard';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';

const rootClass = 'flex w-full flex-col gap-1.5 text-foreground';

const Clipboard = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Root>,
  ComponentProps<typeof ClipboardPrimitive.Root>
>(function Clipboard({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Root
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-slot="clipboard-root"
    />
  );
});

const ClipboardRootProvider = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.RootProvider>,
  ComponentProps<typeof ClipboardPrimitive.RootProvider>
>(function ClipboardRootProvider({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.RootProvider
      ref={ref}
      className={cn(rootClass, className)}
      {...props}
      data-slot="clipboard-root-provider"
    />
  );
});

const ClipboardLabel = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Label>,
  ComponentProps<typeof ClipboardPrimitive.Label>
>(function ClipboardLabel({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Label
      ref={ref}
      className={cn('text-sm leading-5 font-medium', className)}
      {...props}
      data-slot="clipboard-label"
    />
  );
});

const ClipboardControl = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Control>,
  ComponentProps<typeof ClipboardPrimitive.Control>
>(function ClipboardControl({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Control
      ref={ref}
      className={cn('flex w-full items-center gap-2', className)}
      {...props}
      data-slot="clipboard-control"
    />
  );
});

const ClipboardInput = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Input>,
  ComponentProps<typeof ClipboardPrimitive.Input>
>(function ClipboardInput({ asChild, className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Input
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border min-h-control-md w-full min-w-0 rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
      data-slot="clipboard-input"
    />
  );
});

const ClipboardTrigger = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Trigger>,
  ComponentProps<typeof ClipboardPrimitive.Trigger>
>(function ClipboardTrigger({ asChild, className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Trigger
      ref={ref}
      asChild={asChild}
      className={cn(
        !asChild &&
          'box-border inline-flex min-h-control-md shrink-0 cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition duration-normal ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled)]:opacity-[0.94] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent',
        className,
      )}
      {...props}
      data-slot="clipboard-trigger"
    />
  );
});

const ClipboardIndicator = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Indicator>,
  ComponentProps<typeof ClipboardPrimitive.Indicator>
>(function ClipboardIndicator({ className, children, copied, ...props }, ref) {
  return (
    <ClipboardPrimitive.Indicator
      ref={ref}
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
      copied={copied ?? <CheckIcon />}
      {...props}
      data-slot="clipboard-indicator"
    >
      {children ?? <CopyIcon />}
    </ClipboardPrimitive.Indicator>
  );
});

const ClipboardValueText = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.ValueText>,
  ComponentProps<typeof ClipboardPrimitive.ValueText>
>(function ClipboardValueText({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.ValueText
      ref={ref}
      className={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
      {...props}
      data-slot="clipboard-value-text"
    />
  );
});

const ClipboardContext = ClipboardPrimitive.Context;

export {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
  useClipboard,
  useClipboardContext,
};