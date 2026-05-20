import { Field as FieldPrimitive } from '@base-ui/react/field';
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

type TextareaFieldControlProps = Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  'className' | 'size'
> & {
  className?: ReturnType<typeof mergeClassName<FieldPrimitive.Control.State>>;
  render?: React.ReactElement;
  'data-auto-resize'?: string;
  'data-resize'?: TextareaResize;
  'data-size'?: TextareaSize;
  'data-slot'?: string;
};

const TextareaFieldControl = FieldPrimitive.Control as unknown as React.ForwardRefExoticComponent<
  TextareaFieldControlProps & React.RefAttributes<HTMLTextAreaElement>
>;

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
    textareaRef.current.style.height = `${getAutoHeight(textareaRef.current)}px`;
  }, [autoResize]);

  React.useLayoutEffect(() => {
    updateHeight();
  }, [updateHeight, props.value, props.defaultValue]);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        event.currentTarget.style.height = 'auto';
        event.currentTarget.style.height = `${getAutoHeight(event.currentTarget)}px`;
      }

      onChange?.(event);
    },
    [autoResize, onChange],
  );

  return (
    <TextareaFieldControl
      ref={assignRef}
      data-slot="textarea-root"
      data-size={size}
      data-resize={resize}
      data-auto-resize={autoResize ? '' : undefined}
      render={<textarea onChange={handleChange} />}
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

export { Textarea };

export type { TextareaProps, TextareaResize, TextareaSize };