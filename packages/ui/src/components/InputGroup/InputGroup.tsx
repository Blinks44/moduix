import { clsx } from 'clsx';
import * as React from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './InputGroup.module.css';

const InputGroup = React.forwardRef<
  React.ComponentRef<'div'>,
  React.ComponentProps<'div'> & {
    size?: React.ComponentProps<typeof Input>['size'];
  }
>(function InputGroup({ className, onMouseDown, size = 'md', ...props }, ref) {
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    onMouseDown?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }

    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('button, a, input, select, textarea, [role="button"], [role="link"]')) {
      return;
    }

    const input = event.currentTarget.querySelector('[data-slot="input-group-input"]');
    if (!(input instanceof HTMLInputElement) || input.disabled || input.readOnly) return;

    input.focus();
  };

  return (
    <div
      ref={ref}
      role="group"
      data-slot="input-group-root"
      data-size={size}
      className={clsx(styles.root, className)}
      onMouseDown={handleMouseDown}
      {...props}
    />
  );
});

const InputGroupInput = React.forwardRef<
  React.ComponentRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(function InputGroupInput({ className, ...props }, ref) {
  return (
    <Input
      ref={ref}
      data-slot="input-group-input"
      className={mergeClassName(className, styles.input)}
      {...props}
    />
  );
});

const InputGroupAddon = React.forwardRef<React.ComponentRef<'span'>, React.ComponentProps<'span'>>(
  function InputGroupAddon({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="input-group-addon"
        className={clsx(styles.addon, className)}
        {...props}
      />
    );
  },
);

const InputGroupText = React.forwardRef<React.ComponentRef<'span'>, React.ComponentProps<'span'>>(
  function InputGroupText({ className, ...props }, ref) {
    return (
      <span
        ref={ref}
        data-slot="input-group-text"
        className={clsx(styles.text, className)}
        {...props}
      />
    );
  },
);

const InputGroupButton = React.forwardRef<
  React.ComponentRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(function InputGroupButton(
  { className, variant = 'ghost', size, type = 'button', ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      data-slot="input-group-button"
      className={mergeClassName(className, styles.button)}
      variant={variant}
      size={size}
      type={type}
      {...props}
    />
  );
});

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton };