import type { ComponentProps, ComponentRef } from 'react';
import { QrCode as QrCodePrimitive, useQrCode } from '@ark-ui/react/qr-code';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './QrCode.module.css';

const QrCodeRoot = forwardRef<
  ComponentRef<typeof QrCodePrimitive.Root>,
  ComponentProps<typeof QrCodePrimitive.Root>
>(function QrCodeRoot({ className, ...props }, ref) {
  return (
    <QrCodePrimitive.Root
      ref={ref}
      data-slot="qr-code-root"
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.root, normalizeClassName(className))}
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
      className={clsx(styles.frame, normalizeClassName(className))}
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
      className={clsx(styles.pattern, normalizeClassName(className))}
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
      className={clsx(styles.overlay, normalizeClassName(className))}
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
      className={clsx(styles.downloadTrigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const QrCode = Object.assign(QrCodeRoot, {
  Root: QrCodeRoot,
  RootProvider: QrCodeRootProvider,
  Frame: QrCodeFrame,
  Pattern: QrCodePattern,
  Overlay: QrCodeOverlay,
  DownloadTrigger: QrCodeDownloadTrigger,
});

export { QrCode, useQrCode };