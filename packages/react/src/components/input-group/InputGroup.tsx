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
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { Button } from '../button';
import { Input } from '../input';
import styles from './InputGroup.module.css';

type InputGroupSize = NonNullable<ComponentProps<typeof Input>['size']>;

const InputGroupSizeContext = createContext<InputGroupSize>('md');

const InputGroupRoot = forwardRef<
  HTMLDivElement,
  HTMLArkProps<'div'> & {
    size?: InputGroupSize;
  }
>(function InputGroupRoot({ children, className, size = 'md', ...props }, ref) {
  return (
    <InputGroupSizeContext.Provider value={size}>
      <ark.div
        ref={ref}
        data-scope="input-group"
        data-part="root"
        data-slot="input-group-root"
        data-size={size}
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
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
        data-slot="input-group-input"
        className={clsx(styles.input, normalizeClassName(className))}
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
      data-scope="input-group"
      data-part="addon"
      data-slot="input-group-addon"
      className={clsx(styles.addon, normalizeClassName(className))}
      {...props}
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
      data-scope="input-group"
      data-part="text"
      data-slot="input-group-text"
      className={clsx(styles.text, normalizeClassName(className))}
      {...props}
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
        data-slot="input-group-button"
        className={clsx(styles.button, normalizeClassName(className))}
        variant={variant}
        size={size ?? groupSize}
        type={type}
        {...props}
      />
    );
  },
);

const InputGroup = Object.assign(InputGroupRoot, {
  Root: InputGroupRoot,
  Input: InputGroupInput,
  Addon: InputGroupAddon,
  Text: InputGroupText,
  Button: InputGroupButton,
});

export { InputGroup };