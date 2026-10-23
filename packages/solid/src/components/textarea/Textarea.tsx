import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldTextareaProps } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { toPropDefaultValue } from '@/lib/moduix/defaultValue';
import styles from './Textarea.module.css';

type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type TextareaRootProps = FieldTextareaProps & {
  defaultValue?: string | number | readonly string[];
  size?: TextareaSize;
};

function Textarea(props: TextareaRootProps) {
  const [local, others] = splitProps(props, ['class', 'defaultValue', 'size']);

  return (
    <FieldPrimitive.Textarea
      {...others}
      {...toPropDefaultValue(local.defaultValue)}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
    />
  );
}

export { Textarea };
export type { TextareaRootProps, TextareaSize };