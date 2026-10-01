'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ComponentRef,
} from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { Button } from '../button';
import { CloseButton } from '../close-button';
import { Input } from '../input';
import styles from './InputGroup.module.css';

type InputGroupSize = NonNullable<ComponentProps<typeof Input>['size']>;

const InputGroupSizeContext = createContext<InputGroupSize>('md');

const InputGroup = forwardRef<
  HTMLDivElement,
  HTMLArkProps<'div'> & {
    size?: InputGroupSize;
  }
>(function InputGroup({ children, className, size = 'md', ...props }, ref) {
  return (
    <InputGroupSizeContext.Provider value={size}>
      <ark.div
        ref={ref}
        {...props}
        data-scope="input-group"
        data-part="root"
        data-slot="input-group-root"
        data-size={size}
        className={clsx(styles.root, className)}
      >
        {children}
      </ark.div>
    </InputGroupSizeContext.Provider>
  );
});

const InputGroupInput = forwardRef<ComponentRef<typeof Input>, ComponentProps<typeof Input>>(
  function InputGroupInput({ className, size, ...props }, ref) {
    const groupSize = useContext(InputGroupSizeContext);

    return (
      <Input
        ref={ref}
        className={clsx(styles.input, className)}
        size={size ?? groupSize}
        {...props}
      />
    );
  },
);

const InputGroupAddon = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function InputGroupAddon(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="input-group"
      data-part="addon"
      data-slot="input-group-addon"
      className={clsx(styles.addon, className)}
    />
  );
});

const InputGroupText = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function InputGroupText(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="input-group"
      data-part="text"
      data-slot="input-group-text"
      className={clsx(styles.text, className)}
    />
  );
});

const InputGroupButton = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  function InputGroupButton(
    { className, variant = 'ghost', size, type = 'button', ...props },
    ref,
  ) {
    const groupSize = useContext(InputGroupSizeContext);

    return (
      <Button
        ref={ref}
        {...props}
        data-slot="input-group-button"
        className={clsx(styles.button, className)}
        variant={variant}
        size={size ?? groupSize}
        type={type}
      />
    );
  },
);

const InputGroupClearTrigger = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof CloseButton> & { size?: InputGroupSize }
>(function InputGroupClearTrigger(
  {
    className,
    children,
    size,
    type = 'button',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const groupSize = useContext(InputGroupSizeContext);
  return (
    <CloseButton
      ref={ref}
      {...props}
      data-scope="input-group"
      data-part="clear-trigger"
      data-slot="input-group-clear-trigger"
      data-size={size ?? groupSize}
      className={clsx(styles.clearTrigger, className)}
      type={type}
      aria-label={ariaLabel ?? (ariaLabelledBy == null ? a11yLabels.clearInput : undefined)}
      aria-labelledby={ariaLabelledBy}
    >
      {children ?? <CloseIcon />}
    </CloseButton>
  );
});

export {
  InputGroup,
  InputGroupClearTrigger,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
};