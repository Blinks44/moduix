import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/solid/qr-code';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './QrCode.module.css';

function QrCode(props: ComponentProps<typeof QrCodePrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.Root
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="qr-code-root"
    >
      {local.children}
    </QrCodePrimitive.Root>
  );
}

function QrCodeRootProvider(props: ComponentProps<typeof QrCodePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.RootProvider
      asChild={local.asChild}
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="qr-code-root-provider"
    >
      {local.children}
    </QrCodePrimitive.RootProvider>
  );
}

function QrCodeFrame(props: ComponentProps<typeof QrCodePrimitive.Frame>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.Frame
      asChild={local.asChild}
      class={clsx(styles.frame, local.class)}
      {...others}
      data-slot="qr-code-frame"
    >
      {local.children}
    </QrCodePrimitive.Frame>
  );
}

function QrCodePattern(props: ComponentProps<typeof QrCodePrimitive.Pattern>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <QrCodePrimitive.Pattern
      asChild={local.asChild}
      class={clsx(styles.pattern, local.class)}
      {...others}
      data-slot="qr-code-pattern"
    />
  );
}

function QrCodeOverlay(props: ComponentProps<typeof QrCodePrimitive.Overlay>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.Overlay
      asChild={local.asChild}
      class={clsx(styles.overlay, local.class)}
      {...others}
      data-slot="qr-code-overlay"
    >
      {local.children}
    </QrCodePrimitive.Overlay>
  );
}

function QrCodeDownloadTrigger(props: ComponentProps<typeof QrCodePrimitive.DownloadTrigger>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.DownloadTrigger
      asChild={local.asChild}
      class={clsx(styles.downloadTrigger, local.class)}
      {...others}
      data-slot="qr-code-download-trigger"
    >
      {local.children}
    </QrCodePrimitive.DownloadTrigger>
  );
}

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
