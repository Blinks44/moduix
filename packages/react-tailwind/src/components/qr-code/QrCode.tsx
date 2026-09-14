'use client';

import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/react/qr-code';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const QrCodeRoot = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Root>,
  ComponentProps<typeof QrCodePrimitive.Root>
>(function QrCodeRoot({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Root
      ref={ref}
      data-slot="qr-code-root"
      className={cn(
        'relative box-border inline-flex w-32 max-w-full flex-col items-center gap-3 text-foreground',
        className,
      )}
      {...props}
    />
  );
});

const QrCodeRootProvider = forwardRef<
  ComponentRef<typeof QrCodePrimitive.RootProvider>,
  ComponentProps<typeof QrCodePrimitive.RootProvider>
>(function QrCodeRootProvider({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.RootProvider
      ref={ref}
      data-slot="qr-code-root-provider"
      className={cn(
        'relative box-border inline-flex w-32 max-w-full flex-col items-center gap-3 text-foreground',
        className,
      )}
      {...props}
    />
  );
});

const QrCodeFrame = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Frame>,
  ComponentProps<typeof QrCodePrimitive.Frame>
>(function QrCodeFrame({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Frame
      ref={ref}
      data-slot="qr-code-frame"
      className={cn('box-border aspect-square h-auto w-full fill-current text-inherit', className)}
      {...props}
    />
  );
});

const QrCodePattern = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Pattern>,
  ComponentProps<typeof QrCodePrimitive.Pattern>
>(function QrCodePattern({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Pattern
      ref={ref}
      data-slot="qr-code-pattern"
      className={cn('fill-inherit', className)}
      {...props}
    />
  );
});

const QrCodeOverlay = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Overlay>,
  ComponentProps<typeof QrCodePrimitive.Overlay>
>(function QrCodeOverlay({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Overlay
      ref={ref}
      data-slot="qr-code-overlay"
      className={cn(
        'box-border inline-flex size-control-lg items-center justify-center rounded-sm bg-background p-1 text-foreground [&_img]:size-full [&_img]:object-contain [&_svg]:size-full [&_svg]:object-contain',
        className,
      )}
      {...props}
    />
  );
});

const QrCodeDownloadTrigger = forwardRef<
  ComponentRef<typeof QrCodePrimitive.DownloadTrigger>,
  ComponentProps<typeof QrCodePrimitive.DownloadTrigger>
>(function QrCodeDownloadTrigger({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.DownloadTrigger
      ref={ref}
      data-slot="qr-code-download-trigger"
      className={cn(
        'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition-[border-color,background-color,color,opacity,box-shadow,transform] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled):not([data-disabled])]:opacity-[0.94] motion-safe:[&:active:not(:disabled):not([data-disabled])]:translate-y-px motion-safe:[&:active:not(:disabled):not([data-disabled])]:scale-[0.985] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent',
        className,
      )}
      {...props}
    />
  );
});

const QrCode = Object.assign(QrCodeRoot, {
  Root: QrCodeRoot,
  RootProvider: QrCodeRootProvider,
  Context: QrCodePrimitive.Context,
  Frame: QrCodeFrame,
  Pattern: QrCodePattern,
  Overlay: QrCodeOverlay,
  DownloadTrigger: QrCodeDownloadTrigger,
});

export { QrCode, useQrCode, useQrCodeContext };