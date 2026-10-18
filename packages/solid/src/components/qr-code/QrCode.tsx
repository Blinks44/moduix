import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/solid/qr-code';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './QrCode.module.css';

function QrCode(props: ComponentProps<typeof QrCodePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="qr-code-root"
    />
  );
}

function QrCodeRootProvider(props: ComponentProps<typeof QrCodePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="qr-code-root-provider"
    />
  );
}

function QrCodeFrame(props: ComponentProps<typeof QrCodePrimitive.Frame>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.Frame
      class={clsx(styles.frame, local.class)}
      {...others}
      data-slot="qr-code-frame"
    />
  );
}

function QrCodePattern(props: ComponentProps<typeof QrCodePrimitive.Pattern>) {
  return <QrCodePrimitive.Pattern {...props} data-slot="qr-code-pattern" />;
}

function QrCodeOverlay(props: ComponentProps<typeof QrCodePrimitive.Overlay>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.Overlay
      class={clsx(styles.overlay, local.class)}
      {...others}
      data-slot="qr-code-overlay"
    />
  );
}

function QrCodeDownloadTrigger(props: ComponentProps<typeof QrCodePrimitive.DownloadTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.DownloadTrigger
      class={clsx(styles.downloadTrigger, local.class)}
      {...others}
      data-slot="qr-code-download-trigger"
    />
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
} from '@ark-ui/solid/qr-code';