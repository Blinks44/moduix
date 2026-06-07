import type { ComponentProps, ComponentRef, MouseEvent } from 'react';
import { clsx } from 'clsx';
import { forwardRef, useState } from 'react';
import { EyeClosedIcon, EyeIcon } from '@/lib/moduix/icons/ui';
import { Input, type InputProps } from '../input';
import { InputGroup, InputGroupButton, InputGroupInput } from '../input-group';
import styles from './PasswordInput.module.css';

const DEFAULT_VISIBILITY_TOGGLE_LABELS = {
  show: 'Show password',
  hide: 'Hide password',
};

type PasswordInputProps = Omit<InputProps, 'className' | 'type'> & {
  className?: ComponentProps<'div'>['className'];
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  visibilityToggleLabels?: {
    show: string;
    hide: string;
  };
};

const PasswordInput = forwardRef<ComponentRef<typeof Input>, PasswordInputProps>(
  function PasswordInput(
    {
      className,
      defaultVisible = false,
      disabled,
      onVisibleChange,
      readOnly,
      size = 'md',
      visibilityToggleLabels = DEFAULT_VISIBILITY_TOGGLE_LABELS,
      ...props
    },
    ref,
  ) {
    const [visible, setVisible] = useState(defaultVisible);

    const handleToggleMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleToggleClick = () => {
      const nextVisible = !visible;

      setVisible(nextVisible);
      onVisibleChange?.(nextVisible);
    };

    return (
      <InputGroup
        data-slot="password-input-root"
        className={clsx(styles.root, className)}
        size={size}
      >
        <InputGroupInput
          ref={ref}
          {...props}
          className={styles.input}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
          type={visible ? 'text' : 'password'}
        />
        <InputGroupButton
          aria-label={visible ? visibilityToggleLabels.hide : visibilityToggleLabels.show}
          aria-pressed={visible}
          className={styles.toggle}
          data-slot="password-input-toggle"
          disabled={disabled}
          onClick={handleToggleClick}
          onMouseDown={handleToggleMouseDown}
        >
          {visible ? <EyeClosedIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroup>
    );
  },
);

export { PasswordInput };
export type { PasswordInputProps };