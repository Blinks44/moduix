'use client';

import {
  Clipboard as ClipboardPrimitive,
  useClipboard,
  useClipboardContext,
} from '@ark-ui/react/clipboard';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';
import styles from './Clipboard.module.css';

const Clipboard = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Root>,
  ComponentProps<typeof ClipboardPrimitive.Root>
>(function Clipboard({ className, ...props }, ref) {
  return (
    <ClipboardPrimitive.Root
      ref={ref}
      className={clsx(styles.root, className)}
      {...props}
      data-slot="clipboard-root"
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
      className={clsx(styles.root, className)}
      {...props}
      data-slot="clipboard-root-provider"
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
      className={clsx(styles.label, className)}
      {...props}
      data-slot="clipboard-label"
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
      className={clsx(styles.control, className)}
      {...props}
      data-slot="clipboard-control"
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
      className={clsx(styles.input, className)}
      {...props}
      data-slot="clipboard-input"
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
      className={clsx(styles.trigger, className)}
      {...props}
      data-slot="clipboard-trigger"
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
      className={clsx(styles.indicator, className)}
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
      data-slot="clipboard-indicator"
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
      className={clsx(styles.valueText, className)}
      {...props}
      data-slot="clipboard-value-text"
    />
  );
});

const ClipboardCopyText = forwardRef<
  ComponentRef<typeof ClipboardPrimitive.Indicator>,
  ComponentProps<typeof ClipboardPrimitive.Indicator>
>(function ClipboardCopyText({ className, copied = 'Copied', children = 'Copy', ...props }, ref) {
  return (
    <ClipboardPrimitive.Indicator
      ref={ref}
      className={clsx(styles.indicator, className)}
      copied={copied}
      {...props}
      data-slot="clipboard-copy-text"
    >
      {children}
    </ClipboardPrimitive.Indicator>
  );
});

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