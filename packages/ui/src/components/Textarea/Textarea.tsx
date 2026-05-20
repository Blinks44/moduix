import clsx from 'clsx';
import * as React from 'react';
import styles from './Textarea.module.css';

type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  size?: TextareaSize;
  resize?: TextareaResize;
  autoResize?: boolean;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, size = 'md', resize = 'vertical', autoResize = false, onChange, ...props },
  forwardedRef,
) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const assignRef = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      textareaRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
        return;
      }

      if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  const updateHeight = React.useCallback(() => {
    if (!autoResize || !textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [autoResize]);

  React.useLayoutEffect(() => {
    updateHeight();
  }, [updateHeight, props.value, props.defaultValue]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        event.currentTarget.style.height = 'auto';
        event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
      }

      onChange?.(event);
    },
    [autoResize, onChange],
  );

  return (
    <textarea
      ref={assignRef}
      data-slot="textarea-root"
      data-size={size}
      data-resize={resize}
      data-auto-resize={autoResize ? '' : undefined}
      className={clsx(styles.root, className)}
      onChange={handleChange}
      {...props}
    />
  );
});

export { Textarea };

export type { TextareaProps, TextareaResize, TextareaSize };