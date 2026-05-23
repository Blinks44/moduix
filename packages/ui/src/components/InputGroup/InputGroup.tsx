import { clsx } from 'clsx';
import * as React from 'react';
import { Button, type ButtonProps } from '@/components/Button';
import { Input, type InputProps, type InputSize } from '@/components/Input';
import styles from './InputGroup.module.css';

type InputGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  size?: InputSize;
};

type InputGroupInputProps = InputProps;
type InputGroupAddonProps = React.ComponentPropsWithoutRef<'span'>;
type InputGroupTextProps = React.ComponentPropsWithoutRef<'span'>;
type InputGroupButtonProps = ButtonProps;

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(function InputGroup(
  { className, size = 'md', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      data-slot="input-group-root"
      data-size={size}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
});

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  function InputGroupInput({ className, ...props }, ref) {
    return (
      <Input
        ref={ref}
        data-slot="input-group-input"
        className={clsx(styles.input, className)}
        {...props}
      />
    );
  },
);

const InputGroupAddon = React.forwardRef<HTMLSpanElement, InputGroupAddonProps>(
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

const InputGroupText = React.forwardRef<HTMLSpanElement, InputGroupTextProps>(
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

const InputGroupButton = React.forwardRef<HTMLButtonElement, InputGroupButtonProps>(
  function InputGroupButton(
    { className, variant = 'ghost', size, type = 'button', ...props },
    ref,
  ) {
    return (
      <Button
        ref={ref}
        data-slot="input-group-button"
        className={clsx(styles.button, className)}
        variant={variant}
        size={size}
        type={type}
        {...props}
      />
    );
  },
);

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton };

export type {
  InputGroupProps,
  InputGroupInputProps,
  InputGroupAddonProps,
  InputGroupTextProps,
  InputGroupButtonProps,
};