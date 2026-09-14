import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/solid/clipboard';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui/Icons';

function ClipboardRoot(props: ComponentProps<typeof ClipboardPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Root
      data-slot="clipboard-root"
      class={cn('flex w-full flex-col gap-1.5 text-foreground', local.class)}
      {...others}
    />
  );
}

function ClipboardRootProvider(props: ComponentProps<typeof ClipboardPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.RootProvider
      data-slot="clipboard-root-provider"
      class={cn('flex w-full flex-col gap-1.5 text-foreground', local.class)}
      {...others}
    />
  );
}

function ClipboardLabel(props: ComponentProps<typeof ClipboardPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Label
      data-slot="clipboard-label"
      class={cn('text-sm leading-5 font-medium', local.class)}
      {...others}
    />
  );
}

function ClipboardControl(props: ComponentProps<typeof ClipboardPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Control
      data-slot="clipboard-control"
      class={cn('flex w-full items-center gap-2', local.class)}
      {...others}
    />
  );
}

function ClipboardInput(props: ComponentProps<typeof ClipboardPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Input
      data-slot="clipboard-input"
      class={cn(
        'box-border min-h-control-md w-full min-w-0 rounded-md border border-border bg-background px-3.5 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50',
        local.class,
      )}
      {...others}
    />
  );
}

function ClipboardTrigger(props: ComponentProps<typeof ClipboardPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Trigger
      data-slot="clipboard-trigger"
      class={cn(
        'box-border inline-flex min-h-control-md shrink-0 cursor-pointer appearance-none items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm leading-5 font-medium whitespace-nowrap text-foreground transition duration-200 ease-in-out select-none focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none [&_svg]:size-4 [&_svg]:shrink-0 [&:active:not(:disabled):not([data-disabled])]:opacity-[0.94] motion-safe:[&:active:not(:disabled):not([data-disabled])]:translate-y-px motion-safe:[&:active:not(:disabled):not([data-disabled])]:scale-[0.985] [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:bg-accent',
        local.class,
      )}
      {...others}
    />
  );
}

function ClipboardIndicator(props: ComponentProps<typeof ClipboardPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'copied']);
  const resolvedChildren = children(() => local.children);

  return (
    <ClipboardPrimitive.Indicator
      data-slot="clipboard-indicator"
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
      data-slot="clipboard-value-text"
      class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', local.class)}
      {...others}
    />
  );
}

function ClipboardCopyText(props: ComponentProps<typeof ClipboardPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'copied']);
  const resolvedChildren = children(() => local.children);

  return (
    <ClipboardIndicator
      data-slot="clipboard-copy-text"
      copied={local.copied === undefined ? 'Copied' : local.copied}
      {...others}
    >
      {resolvedChildren() === undefined ? 'Copy' : resolvedChildren()}
    </ClipboardIndicator>
  );
}

type ClipboardComponent = typeof ClipboardRoot & {
  Root: typeof ClipboardRoot;
  RootProvider: typeof ClipboardRootProvider;
  Context: typeof ClipboardPrimitive.Context;
  Label: typeof ClipboardLabel;
  Control: typeof ClipboardControl;
  Input: typeof ClipboardInput;
  Trigger: typeof ClipboardTrigger;
  Indicator: typeof ClipboardIndicator;
  CopyText: typeof ClipboardCopyText;
  ValueText: typeof ClipboardValueText;
  useClipboard: typeof useClipboard;
};

const Clipboard: ClipboardComponent = Object.assign(ClipboardRoot, {
  Root: ClipboardRoot,
  RootProvider: ClipboardRootProvider,
  Context: ClipboardPrimitive.Context,
  Label: ClipboardLabel,
  Control: ClipboardControl,
  Input: ClipboardInput,
  Trigger: ClipboardTrigger,
  Indicator: ClipboardIndicator,
  CopyText: ClipboardCopyText,
  ValueText: ClipboardValueText,
  useClipboard,
});

export { Clipboard, useClipboard, useClipboardContext };