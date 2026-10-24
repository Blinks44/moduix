import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/solid/qr-code';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function QrCode(props: ComponentProps<typeof QrCodePrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.Root
      class={cn('inline-grid w-32 max-w-full grid-cols-1 justify-items-center gap-3', local.class)}
      {...others}
      data-slot="qr-code-root"
    />
  );
}

function QrCodeRootProvider(props: ComponentProps<typeof QrCodePrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.RootProvider
      class={cn('inline-grid w-32 max-w-full grid-cols-1 justify-items-center gap-3', local.class)}
      {...others}
      data-slot="qr-code-root-provider"
    />
  );
}

function QrCodeFrame(props: ComponentProps<typeof QrCodePrimitive.Frame>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.Frame
      class={cn('aspect-square w-full fill-current', local.class)}
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
      class={cn(
        'box-border inline-flex aspect-square w-1/3 items-center justify-center rounded-sm bg-background p-1 text-foreground [grid-area:1/1/2/2] [&_img]:size-full [&_img]:object-contain [&_svg]:size-full [&_svg]:object-contain',
        local.class,
      )}
      {...others}
      data-slot="qr-code-overlay"
    />
  );
}

function QrCodeDownloadTrigger(props: ComponentProps<typeof QrCodePrimitive.DownloadTrigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <QrCodePrimitive.DownloadTrigger
      class={cn(
        'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium whitespace-nowrap text-foreground transition-[background-color,opacity] duration-normal ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled)]:opacity-[0.94] [@media(hover:hover)]:[&:not(:disabled):hover]:bg-accent',
        local.class,
      )}
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