import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/solid/clipboard';
import { clsx } from 'clsx';
import type { ComponentProps } from 'solid-js';
import { children, splitProps } from 'solid-js';
import { CheckIcon, CopyIcon } from '@/internal/icons/ui/Icons';
import styles from './Clipboard.module.css';

function ClipboardRoot(props: ComponentProps<typeof ClipboardPrimitive.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Root
      data-slot="clipboard-root"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function ClipboardRootProvider(props: ComponentProps<typeof ClipboardPrimitive.RootProvider>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.RootProvider
      data-slot="clipboard-root-provider"
      class={clsx(styles.root, local.class)}
      {...others}
    />
  );
}

function ClipboardLabel(props: ComponentProps<typeof ClipboardPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Label
      data-slot="clipboard-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function ClipboardControl(props: ComponentProps<typeof ClipboardPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Control
      data-slot="clipboard-control"
      class={clsx(styles.control, local.class)}
      {...others}
    />
  );
}

function ClipboardInput(props: ComponentProps<typeof ClipboardPrimitive.Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Input
      data-slot="clipboard-input"
      class={clsx(styles.input, local.class)}
      {...others}
    />
  );
}

function ClipboardTrigger(props: ComponentProps<typeof ClipboardPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ClipboardPrimitive.Trigger
      data-slot="clipboard-trigger"
      class={clsx(styles.trigger, local.class)}
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
      class={clsx(styles.indicator, local.class)}
      copied={
        local.copied ?? (
          <span aria-hidden="true" data-slot="clipboard-indicator-copied-icon" class={styles.icon}>
            <CheckIcon />
          </span>
        )
      }
      {...others}
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
      data-slot="clipboard-value-text"
      class={clsx(styles.valueText, local.class)}
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

const Clipboard = Object.assign(ClipboardRoot, {
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