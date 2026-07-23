import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/react/clipboard';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Clipboard.module.css';

const ClipboardRoot = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Root>,
  ComponentProps<typeof ClipboardPrimitive.Root>
>(function ClipboardRoot({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Root
      ref={ref}
      data-slot="clipboard-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ClipboardRootProvider = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.RootProvider>,
  ComponentProps<typeof ClipboardPrimitive.RootProvider>
>(function ClipboardRootProvider({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.RootProvider
      ref={ref}
      data-slot="clipboard-root-provider"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ClipboardLabel = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Label>,
  ComponentProps<typeof ClipboardPrimitive.Label>
>(function ClipboardLabel({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Label
      ref={ref}
      data-slot="clipboard-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const ClipboardControl = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Control>,
  ComponentProps<typeof ClipboardPrimitive.Control>
>(function ClipboardControl({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Control
      ref={ref}
      data-slot="clipboard-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
    />
  );
});

const ClipboardInput = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Input>,
  ComponentProps<typeof ClipboardPrimitive.Input>
>(function ClipboardInput({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Input
      ref={ref}
      data-slot="clipboard-input"
      className={clsx(styles.input, normalizeClassName(className))}
      {...props}
    />
  );
});

const ClipboardTrigger = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Trigger>,
  ComponentProps<typeof ClipboardPrimitive.Trigger>
>(function ClipboardTrigger({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Trigger
      ref={ref}
      data-slot="clipboard-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
    />
  );
});

const ClipboardIndicator = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Indicator>,
  ComponentProps<typeof ClipboardPrimitive.Indicator>
>(function ClipboardIndicator({ className, children, copied, ...props }, ref) {
  return (
    <ClipboardPrimitive.Indicator
      ref={ref}
      data-slot="clipboard-indicator"
      className={clsx(styles.indicator, normalizeClassName(className))}
      copied={
        copied ?? (
          <span
            aria-hidden="true"
            data-slot="clipboard-indicator-copied-icon"
            className={styles.icon}
          >
            <CheckIcon />
          </span>
        )
      }
      {...props}
    >
      {children ?? (
        <span aria-hidden="true" data-slot="clipboard-indicator-idle-icon" className={styles.icon}>
          <CopyIcon />
        </span>
      )}
    </ClipboardPrimitive.Indicator>
  );
});

const ClipboardValueText = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.ValueText>,
  ComponentProps<typeof ClipboardPrimitive.ValueText>
>(function ClipboardValueText({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.ValueText
      ref={ref}
      data-slot="clipboard-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
    />
  );
});

const ClipboardCopyText = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Indicator>,
  ComponentProps<typeof ClipboardPrimitive.Indicator>
>(function ClipboardCopyText({ copied = 'Copied', children = 'Copy', ...props }, ref) {
  return (
    <ClipboardIndicator ref={ref} data-slot="clipboard-copy-text" copied={copied} {...props}>
      {children}
    </ClipboardIndicator>
  );
});

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