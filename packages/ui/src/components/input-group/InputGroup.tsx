import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ComponentRef,
  type MouseEvent,
} from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { Button, type ButtonRootProps } from '../button';
import { Input, type InputProps, type InputSize } from '../input';
import styles from './InputGroup.module.css';

type InputGroupProps = ComponentProps<typeof ark.div> & {
  size?: InputSize;
};

const InputGroupSizeContext = createContext<InputSize>('md');

const InputGroup = forwardRef<ComponentRef<typeof ark.div>, InputGroupProps>(function InputGroup(
  { children, className, onMouseDown, size = 'md', ...props },
  ref,
) {
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
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

    if (!(event.target instanceof HTMLElement)) return;
    if (
      event.target.closest('button, a, input, select, textarea, [role="button"], [role="link"]')
    ) {
      return;
    }

    const input = event.currentTarget.querySelector<HTMLInputElement>(
      '[data-slot="input-group-input"]',
    );
    if (!input || input.disabled || input.readOnly) return;

    input.focus();
  };

  return (
    <InputGroupSizeContext.Provider value={size}>
      <ark.div
        ref={ref}
        data-slot="input-group-root"
        data-size={size}
        className={clsx(styles.root, className)}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {children}
      </ark.div>
    </InputGroupSizeContext.Provider>
  );
});

const InputGroupInput = forwardRef<ComponentRef<typeof Input>, InputProps>(function InputGroupInput(
  { className, size, ...props },
  ref,
) {
  const groupSize = useContext(InputGroupSizeContext);

  return (
    <Input
      ref={ref}
      data-slot="input-group-input"
      className={clsx(styles.input, className)}
      size={size ?? groupSize}
      {...props}
    />
  );
});

const InputGroupAddon = forwardRef<ComponentRef<typeof ark.span>, ComponentProps<typeof ark.span>>(
  function InputGroupAddon({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="input-group-addon"
        className={clsx(styles.addon, className)}
        {...props}
      />
    );
  },
);

const InputGroupText = forwardRef<ComponentRef<typeof ark.span>, ComponentProps<typeof ark.span>>(
  function InputGroupText({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-slot="input-group-text"
        className={clsx(styles.text, className)}
        {...props}
      />
    );
  },
);

const InputGroupButton = forwardRef<ComponentRef<typeof Button>, ButtonRootProps>(
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

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton };