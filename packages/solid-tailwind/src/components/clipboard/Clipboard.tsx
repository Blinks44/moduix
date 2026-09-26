import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/solid/clipboard';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui/Icons';

function Clipboard(props: ComponentProps<typeof ClipboardPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Root
      class={cn('flex w-full flex-col gap-1.5 text-foreground', local.class)}
      {...others}
      data-slot="clipboard-root"
    />
  );
}

function ClipboardRootProvider(props: ComponentProps<typeof ClipboardPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.RootProvider
      class={cn('flex w-full flex-col gap-1.5 text-foreground', local.class)}
      {...others}
      data-slot="clipboard-root-provider"
    />
  );
}

function ClipboardLabel(props: ComponentProps<typeof ClipboardPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Label
      class={cn('text-sm leading-5 font-medium', local.class)}
      {...others}
      data-slot="clipboard-label"
    />
  );
}

function ClipboardControl(props: ComponentProps<typeof ClipboardPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Control
      class={cn('flex w-full items-center gap-2', local.class)}
      {...others}
      data-slot="clipboard-control"
    />
  );
}

function ClipboardInput(props: ComponentProps<typeof ClipboardPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Input
      class={cn(
        'box-border min-h-control-md w-full min-w-0 rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        local.class,
      )}
      {...others}
      data-slot="clipboard-input"
    />
  );
}

function ClipboardTrigger(props: ComponentProps<typeof ClipboardPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Trigger
      class={cn(
        'box-border inline-flex min-h-control-md shrink-0 cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled):not([data-disabled])]:opacity-[0.94] motion-safe:[&:active:not(:disabled):not([data-disabled])]:translate-y-px motion-safe:[&:active:not(:disabled):not([data-disabled])]:scale-[0.985] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent',
        local.class,
      )}
      {...others}
      data-slot="clipboard-trigger"
    />
  );
}

function ClipboardIndicator(props: ComponentProps<typeof ClipboardPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'copied']);
  const resolvedChildren = children(() => local.children);

  return (
    <ClipboardPrimitive.Indicator
      class={cn('inline-flex shrink-0 items-center justify-center', local.class)}
      copied={
        local.copied ?? (
          <span
            aria-hidden="true"
            data-slot="clipboard-indicator-copied-icon"
            class="inline-flex shrink-0 items-center justify-center"
          >
            <CheckIcon />
          </span>
        )
      }
      {...others}
      data-slot="clipboard-indicator"
    >
      {resolvedChildren() ?? (
        <span
          aria-hidden="true"
          data-slot="clipboard-indicator-idle-icon"
          class="inline-flex shrink-0 items-center justify-center"
        >
          <CopyIcon />
        </span>
      )}
    </ClipboardPrimitive.Indicator>
  );
}

function ClipboardValueText(props: ComponentProps<typeof ClipboardPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.ValueText
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
      data-slot="clipboard-value-text"
    />
  );
}

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