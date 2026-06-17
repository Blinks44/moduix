import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
export type ButtonRootProps = HTMLArkProps<'button'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(function ButtonRoot(
  { className, size = 'md', variant = 'default', ...props },
  ref,
) {
  return (
    <ark.button
      ref={ref}
      data-scope="button"
      data-part="root"
      data-slot="button-root"
      data-variant={variant}
      data-size={size}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export { Button };