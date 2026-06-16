import { forwardRef, type ComponentRef, useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from '@/lib/moduix/icons/ui';
import { Button, type ButtonProps } from '../button';
import styles from './CopyButton.module.css';

const DEFAULT_COPIED_DURATION = 2000;
type CopyLabels = {
  copy: string;
  copied: string;
};

const DEFAULT_COPY_LABELS: CopyLabels = {
  copy: 'Copy',
  copied: 'Copied',
};

type CopyButtonProps = ButtonProps & {
  copiedDuration?: number;
  copyLabels?: CopyLabels;
  onCopy?: (value: string) => void;
  onCopyError?: (error: unknown) => void;
  value: string;
};

const CopyButton = forwardRef<ComponentRef<typeof Button>, CopyButtonProps>(function CopyButton(
  {
    children,
    copiedDuration = DEFAULT_COPIED_DURATION,
    copyLabels = DEFAULT_COPY_LABELS,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    disabled,
    onClick,
    onCopy,
    onCopyError,
    size,
    type = 'button',
    value,
    ...props
  },
  ref,
) {
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hasTextChildren = typeof children === 'string' || typeof children === 'number';
  const defaultAriaLabel =
    children == null && ariaLabelledBy == null
      ? copied
        ? copyLabels.copied
        : copyLabels.copy
      : undefined;
  const renderedChildren = copied && hasTextChildren ? copyLabels.copied : children;

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API is not available in this environment.');
      }

      await navigator.clipboard.writeText(value);

      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }

      setCopied(true);
      setAnnouncement(copyLabels.copied);
      onCopy?.(value);

      copiedTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        setAnnouncement('');
      }, copiedDuration);
    } catch (error) {
      onCopyError?.(error);

      if (!onCopyError) {
        queueMicrotask(() => {
          throw error;
        });
      }
    }
  };

  const handleClick: ButtonProps['onClick'] = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || disabled) {
      return;
    }

    void handleCopy();
  };

  return (
    <>
      <Button
        ref={ref}
        aria-label={ariaLabel ?? defaultAriaLabel}
        aria-labelledby={ariaLabelledBy}
        data-copied={copied ? '' : undefined}
        data-slot="copy-button"
        disabled={disabled}
        onClick={handleClick}
        size={size ?? (children == null ? 'icon-md' : 'md')}
        type={type}
        {...props}
      >
        {renderedChildren ?? (copied ? <CheckIcon /> : <CopyIcon />)}
      </Button>
      <span aria-live="polite" aria-atomic="true" className={styles.announcer}>
        {announcement}
      </span>
    </>
  );
});

export { CopyButton };
export type { CopyButtonProps };