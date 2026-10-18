'use client';

import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/react/qr-code';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const QrCode = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Root>,
  ComponentProps<typeof QrCodePrimitive.Root>
>(function QrCode({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Root
      ref={ref}
      className={cn(
        'inline-grid w-32 max-w-full grid-cols-1 justify-items-center gap-3',
        className,
      )}
      {...props}
      data-slot="qr-code-root"
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
      className={cn(
        'inline-grid w-32 max-w-full grid-cols-1 justify-items-center gap-3',
        className,
      )}
      {...props}
      data-slot="qr-code-root-provider"
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
      className={cn('aspect-square w-full fill-current', className)}
      {...props}
      data-slot="qr-code-frame"
    />
  );
});

const QrCodePattern = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Pattern>,
  ComponentProps<typeof QrCodePrimitive.Pattern>
>(function QrCodePattern(props, ref) {
  return <QrCodePrimitive.Pattern ref={ref} {...props} data-slot="qr-code-pattern" />;
});

const QrCodeOverlay = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Overlay>,
  ComponentProps<typeof QrCodePrimitive.Overlay>
>(function QrCodeOverlay({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Overlay
      ref={ref}
      className={cn(
        'box-border inline-flex aspect-square w-1/3 items-center justify-center rounded-sm bg-background p-1 text-foreground [grid-area:1/1/2/2] [&_img]:size-full [&_img]:object-contain [&_svg]:size-full [&_svg]:object-contain',
        className,
      )}
      {...props}
      data-slot="qr-code-overlay"
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
      className={cn(
        'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium whitespace-nowrap text-foreground transition-[background-color,opacity] duration-normal ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled)]:opacity-[0.94] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent',
        className,
      )}
      {...props}
      data-slot="qr-code-download-trigger"
    />
  );
});

const QrCodeContext = QrCodePrimitive.Context;

export {
  QrCode,
  QrCodeContext,
  QrCodeDownloadTrigger,
  QrCodeFrame,
  QrCodeOverlay,
  QrCodePattern,
  QrCodeRootProvider,
  useQrCode,
  useQrCodeContext,
};
export type {
  QrCodeContextProps,
  QrCodeDownloadTriggerProps,
  QrCodeFrameProps,
  QrCodeGenerateOptions,
  QrCodeOverlayProps,
  QrCodePatternProps,
  QrCodeRootProps,
  QrCodeRootProviderProps,
  QrCodeValueChangeDetails,
  UseQrCodeContext,
  UseQrCodeProps,
  UseQrCodeReturn,
} from '@ark-ui/react/qr-code';