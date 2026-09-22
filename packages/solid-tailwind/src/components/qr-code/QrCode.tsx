import { QrCode as QrCodePrimitive, useQrCode, useQrCodeContext } from '@ark-ui/solid/qr-code';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function QrCode(props: ComponentProps<typeof QrCodePrimitive.Root>) {
  const [local, others] = splitProps(props, ['asChild', 'children', 'class']);

  return (
    <QrCodePrimitive.Root
      asChild={local.asChild}
      class={cn(
        'relative box-border inline-flex w-32 max-w-full flex-col items-center gap-3 text-foreground',
        local.class,
      )}
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
      class={cn(
        'relative box-border inline-flex w-32 max-w-full flex-col items-center gap-3 text-foreground',
        local.class,
      )}
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
      class={cn('box-border aspect-square h-auto w-full fill-current text-inherit', local.class)}
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
      class={cn('fill-inherit', local.class)}
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
      class={cn(
        'box-border inline-flex size-control-lg items-center justify-center rounded-sm bg-background p-1 text-foreground [&_img]:size-full [&_img]:object-contain [&_svg]:size-full [&_svg]:object-contain',
        local.class,
      )}
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
      class={cn(
        'box-border inline-flex min-h-control-md cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium whitespace-nowrap text-foreground transition-[border-color,background-color,color,opacity,box-shadow,transform] duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled):not([data-disabled])]:opacity-[0.94] motion-safe:[&:active:not(:disabled):not([data-disabled])]:translate-y-px motion-safe:[&:active:not(:disabled):not([data-disabled])]:scale-[0.985] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent',
        local.class,
      )}
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