import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/solid/clipboard';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';
import styles from './Clipboard.module.css';

function Clipboard(props: ComponentProps<typeof ClipboardPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Root
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="clipboard-root"
    />
  );
}

function ClipboardRootProvider(props: ComponentProps<typeof ClipboardPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.RootProvider
      class={clsx(styles.root, local.class)}
      {...others}
      data-slot="clipboard-root-provider"
    />
  );
}

function ClipboardLabel(props: ComponentProps<typeof ClipboardPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Label
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="clipboard-label"
    />
  );
}

function ClipboardControl(props: ComponentProps<typeof ClipboardPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Control
      class={clsx(styles.control, local.class)}
      {...others}
      data-slot="clipboard-control"
    />
  );
}

function ClipboardInput(props: ComponentProps<typeof ClipboardPrimitive.Input>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ClipboardPrimitive.Input
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.input, local.class)}
      {...others}
      data-slot="clipboard-input"
    />
  );
}

function ClipboardTrigger(props: ComponentProps<typeof ClipboardPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ClipboardPrimitive.Trigger
      asChild={local.asChild}
      class={clsx(!local.asChild && styles.trigger, local.class)}
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
      class={clsx(styles.indicator, local.class)}
      copied={local.copied ?? <CheckIcon />}
      {...others}
      data-slot="clipboard-indicator"
    >
      {resolvedChildren() ?? <CopyIcon />}
    </ClipboardPrimitive.Indicator>
  );
}

function ClipboardValueText(props: ComponentProps<typeof ClipboardPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.ValueText
      class={clsx(styles.valueText, local.class)}
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