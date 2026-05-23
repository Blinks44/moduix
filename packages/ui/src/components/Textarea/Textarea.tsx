import { Field as FieldPrimitive } from '@base-ui/react/field';
import { mergeProps } from '@base-ui/react/merge-props';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Textarea.module.css';

type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical';

type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> & {
  size?: TextareaSize;
  resize?: TextareaResize;
  autoResize?: boolean;
};

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

function getAutoHeight(node: HTMLTextAreaElement) {
  const computedStyle = window.getComputedStyle(node);

  if (computedStyle.boxSizing !== 'border-box') {
    return node.scrollHeight;
  }

  return (
    node.scrollHeight +
    Number.parseFloat(computedStyle.borderBlockStartWidth || computedStyle.borderTopWidth) +
    Number.parseFloat(computedStyle.borderBlockEndWidth || computedStyle.borderBottomWidth)
  );
}

function resizeToContent(node: HTMLTextAreaElement) {
  node.style.height = 'auto';
  node.style.height = `${getAutoHeight(node)}px`;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    className,
    size = 'md',
    resize = 'vertical',
    autoResize = false,
    onChange,
    value,
    defaultValue,
    ...props
  },
  forwardedRef,
) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const setTextareaRef = React.useCallback(
    (node: HTMLElement | null) => {
      const textareaNode = node instanceof HTMLTextAreaElement ? node : null;
      textareaRef.current = textareaNode;
      setForwardedRef(forwardedRef, textareaNode);
    },
    [forwardedRef],
  );

  React.useLayoutEffect(() => {
    if (!autoResize || !textareaRef.current) {
      return;
    }

    resizeToContent(textareaRef.current);
  }, [autoResize, defaultValue, value]);

  const handleAutoResizeChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        resizeToContent(event.currentTarget);
      }

      onChange?.(event);
    },
    [autoResize, onChange],
  );

  return (
    <FieldPrimitive.Control
      ref={setTextareaRef}
      data-slot="textarea-root"
      data-size={size}
      data-resize={resize}
      data-auto-resize={autoResize ? '' : undefined}
      className={mergeClassName(className, styles.root)}
      render={(controlProps) => {
        const textareaProps = mergeProps(controlProps, props, {
          value,
          defaultValue,
          onChange: handleAutoResizeChange,
        });

        return <textarea {...textareaProps} />;
      }}
    />
  );
});

export { Textarea };

export type { TextareaProps, TextareaResize, TextareaSize };