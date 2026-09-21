import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/solid/clipboard';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui/Icons';
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
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Input
      class={clsx(styles.input, local.class)}
      {...others}
      data-slot="clipboard-input"
    />
  );
}

function ClipboardTrigger(props: ComponentProps<typeof ClipboardPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Trigger
      class={clsx(styles.trigger, local.class)}
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
      copied={
        local.copied ?? (
          <span aria-hidden="true" data-slot="clipboard-indicator-copied-icon" class={styles.icon}>
            <CheckIcon />
          </span>
        )
      }
      {...others}
      data-slot="clipboard-indicator"
    >
      {resolvedChildren() ?? (
        <span aria-hidden="true" data-slot="clipboard-indicator-idle-icon" class={styles.icon}>
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
      class={clsx(styles.valueText, local.class)}
      {...others}
      data-slot="clipboard-value-text"
    />
  );
}

function ClipboardCopyText(props: ComponentProps<typeof ClipboardPrimitive.Indicator>) {
  const [local, others] = splitProps(props, ['children', 'class', 'copied']);
  const resolvedChildren = children(() => local.children);

  return (
    <ClipboardPrimitive.Indicator
      class={clsx(styles.indicator, local.class)}
      copied={local.copied === undefined ? 'Copied' : local.copied}
      {...others}
      data-slot="clipboard-copy-text"
    >
      {resolvedChildren() === undefined ? 'Copy' : resolvedChildren()}
    </ClipboardPrimitive.Indicator>
  );
}

const ClipboardContext = ClipboardPrimitive.Context;

export {
  Clipboard,
  ClipboardContext,
  ClipboardControl,
  ClipboardCopyText,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardRootProvider,
  ClipboardTrigger,
  ClipboardValueText,
  useClipboard,
  useClipboardContext,
};