import { Field as FieldPrimitive } from '@base-ui/react/field';
import { mergeProps } from '@base-ui/react/merge-props';
import { forwardRef, useCallback, type ComponentProps, type ForwardedRef } from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Textarea.module.css';

type TextareaProps = ComponentProps<'textarea'> & {
  autoResize?: boolean;
};

const assignForwardedRef = <T,>(ref: ForwardedRef<T>, value: T | null) => {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { autoResize = false, className, ...props }: TextareaProps,
  forwardedRef: ForwardedRef<HTMLTextAreaElement>,
) {
  const setTextareaRef = useCallback(
    (node: HTMLElement | null) => {
      assignForwardedRef(forwardedRef, node instanceof HTMLTextAreaElement ? node : null);
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
export type { TextareaProps };