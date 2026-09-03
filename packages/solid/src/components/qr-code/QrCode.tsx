import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/solid/qr-code';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './QrCode.module.css';

function QrCodeRoot(props: ComponentProps<typeof QrCodePrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.Root
      asChild={local.asChild}
      data-slot="qr-code-root"
      class={clsx(styles.root, local.class)}
      {...others}
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
      data-slot="qr-code-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
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
      data-slot="qr-code-frame"
      class={clsx(styles.frame, local.class)}
      {...others}
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
      data-slot="qr-code-pattern"
      class={clsx(styles.pattern, local.class)}
      {...others}
    />
  );
}

function QrCodeOverlay(props: ComponentProps<typeof QrCodePrimitive.Overlay>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.Overlay
      asChild={local.asChild}
      data-slot="qr-code-overlay"
      class={clsx(styles.overlay, local.class)}
      {...others}
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
      data-slot="qr-code-download-trigger"
      class={clsx(styles.downloadTrigger, local.class)}
      {...others}
    >
      {local.children}
    </QrCodePrimitive.DownloadTrigger>
  );
}

type QrCodeComponent = typeof QrCodeRoot & {
  Root: typeof QrCodeRoot;
  RootProvider: typeof QrCodeRootProvider;
  Context: typeof QrCodePrimitive.Context;
  Frame: typeof QrCodeFrame;
  Pattern: typeof QrCodePattern;
  Overlay: typeof QrCodeOverlay;
  DownloadTrigger: typeof QrCodeDownloadTrigger;
};

const QrCode: QrCodeComponent = Object.assign(QrCodeRoot, {
  Root: QrCodeRoot,
  RootProvider: QrCodeRootProvider,
  Context: QrCodePrimitive.Context,
  Frame: QrCodeFrame,
  Pattern: QrCodePattern,
  Overlay: QrCodeOverlay,
  DownloadTrigger: QrCodeDownloadTrigger,
});

export { QrCode, useQrCode, useQrCodeContext };