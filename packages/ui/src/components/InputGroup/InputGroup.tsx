import { clsx } from 'clsx';
import * as React from 'react';
import { Button, type ButtonProps } from '@/components/Button';
import { Input, type InputProps, type InputSize } from '@/components/Input';
import styles from './InputGroup.module.css';

type InputGroupProps = React.ComponentProps<'div'> & {
  size?: InputSize;
};

type InputGroupInputProps = InputProps;
type InputGroupAddonProps = React.ComponentProps<'span'>;
type InputGroupTextProps = React.ComponentProps<'span'>;
type InputGroupButtonProps = ButtonProps;

function InputGroup({ className, size = 'md', ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group-root"
      data-size={size}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input data-slot="input-group-input" className={clsx(styles.input, className)} {...props} />
  );
}

function InputGroupAddon({ className, ...props }: InputGroupAddonProps) {
  return (
    <span data-slot="input-group-addon" className={clsx(styles.addon, className)} {...props} />
  );
}

function InputGroupText({ className, ...props }: InputGroupTextProps) {
  return <span data-slot="input-group-text" className={clsx(styles.text, className)} {...props} />;
}

function InputGroupButton({
  className,
  variant = 'ghost',
  size,
  type = 'button',
  ...props
}: InputGroupButtonProps) {
  return (
    <Button
      data-slot="input-group-button"
      className={clsx(styles.button, className)}
      variant={variant}
      size={size}
      type={type}
      {...props}
    />
  );
}

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton };

export type {
  InputGroupProps,
  InputGroupInputProps,
  InputGroupAddonProps,
  InputGroupTextProps,
  InputGroupButtonProps,
};