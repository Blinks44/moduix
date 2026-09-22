'use client';

import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/react/qr-code';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import styles from './QrCode.module.css';

const QrCode = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Root>,
  ComponentProps<typeof QrCodePrimitive.Root>
>(function QrCode({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
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
      className={clsx(styles.root, className)}
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
      className={clsx(styles.frame, className)}
      {...props}
      data-slot="qr-code-frame"
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
      className={clsx(styles.pattern, className)}
      {...props}
      data-slot="qr-code-pattern"
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
      className={clsx(styles.overlay, className)}
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
      className={clsx(styles.downloadTrigger, className)}
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
