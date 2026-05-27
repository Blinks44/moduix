import { Field as FieldPrimitive } from '@base-ui/react/field';
import { mergeProps } from '@base-ui/react/merge-props';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Textarea.module.css';

function setForwardedRef<T>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & { autoResize?: boolean }
>(function Textarea(
  {
    autoResize = false,
    className,
    ...props
  }: React.ComponentProps<'textarea'> & {
    autoResize?: boolean;
  },
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const setTextareaRef = React.useCallback(
    (node: HTMLElement | null) => {
      setForwardedRef(forwardedRef, node instanceof HTMLTextAreaElement ? node : null);
    },
    [forwardedRef],
  );

  return (
    <FieldPrimitive.Control
      ref={setTextareaRef}
      data-slot="textarea-root"
      data-auto-resize={autoResize ? '' : undefined}
      className={mergeClassName(className, styles.root)}
      render={(controlProps) => <textarea {...mergeProps(controlProps, props)} />}
    />
  );
});

export { Textarea };