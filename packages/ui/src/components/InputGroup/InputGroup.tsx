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

const InputGroup = React.forwardRef(function InputGroup(
  { className, size = 'md', ...props }: InputGroupProps,
  ref: React.ForwardedRef<HTMLDivElement>,
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

const InputGroupInput = React.forwardRef(function InputGroupInput(
  { className, ...props }: InputGroupInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <Input
      ref={ref}
      data-slot="input-group-input"
      className={clsx(styles.input, className)}
      {...props}
    />
  );
});

const InputGroupAddon = React.forwardRef(function InputGroupAddon(
  { className, ...props }: InputGroupAddonProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  return (
    <span
      ref={ref}
      data-slot="input-group-addon"
      className={clsx(styles.addon, className)}
      {...props}
    />
  );
});

const InputGroupText = React.forwardRef(function InputGroupText(
  { className, ...props }: InputGroupTextProps,
  ref: React.ForwardedRef<HTMLSpanElement>,
) {
  return (
    <span
      ref={ref}
      data-slot="input-group-text"
      className={clsx(styles.text, className)}
      {...props}
    />
  );
});

const InputGroupButton = React.forwardRef(function InputGroupButton(
  { className, variant = 'ghost', size, type = 'button', ...props }: InputGroupButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
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
});

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton };

export type {
  InputGroupProps,
  InputGroupInputProps,
  InputGroupAddonProps,
  InputGroupTextProps,
  InputGroupButtonProps,
};