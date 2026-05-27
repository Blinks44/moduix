import { clsx } from 'clsx';
import {
  createContext,
  forwardRef,
  useContext,
  type ComponentProps,
  type ComponentRef,
  type MouseEvent,
} from 'react';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './InputGroup.module.css';

const InputGroupSizeContext = createContext<ComponentProps<typeof Input>['size']>('md');

const InputGroup = forwardRef<
  ComponentRef<'div'>,
  ComponentProps<'div'> & {
    size?: ComponentProps<typeof Input>['size'];
  }
>(function InputGroup({ children, className, onMouseDown, size = 'md', ...props }, ref) {
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
    <InputGroupSizeContext.Provider value={size}>
      <div
        ref={ref}
        role="group"
        data-slot="input-group-root"
        data-size={size}
        className={clsx(styles.root, className)}
        onMouseDown={handleMouseDown}
        {...props}
      >
        {children}
      </div>
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
        className={mergeClassName(className, styles.input)}
        size={size ?? groupSize}
        {...props}
      />
    );
  },
);

const InputGroupAddon = forwardRef<ComponentRef<'span'>, ComponentProps<'span'>>(
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

const InputGroupText = forwardRef<ComponentRef<'span'>, ComponentProps<'span'>>(
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

const InputGroupButton = forwardRef<ComponentRef<typeof Button>, ComponentProps<typeof Button>>(
  function InputGroupButton(
    { className, variant = 'ghost', size, type = 'button', ...props },
    ref,
  ) {
    const groupSize = useContext(InputGroupSizeContext);

    return (
      <Button
        ref={ref}
        data-slot="input-group-button"
        className={mergeClassName(className, styles.button)}
        variant={variant}
        size={size ?? groupSize}
        type={type}
        {...props}
      />
    );
  },
);

export { InputGroup, InputGroupInput, InputGroupAddon, InputGroupText, InputGroupButton };