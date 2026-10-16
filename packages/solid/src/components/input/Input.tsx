import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldInputProps } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type InputRootProps = Omit<FieldInputProps, 'size'> & {
  size?: InputSize;
  htmlSize?: FieldInputProps['size'];
};

function Input(props: InputRootProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'htmlSize']);

  return (
    <FieldPrimitive.Input
      {...others}
      data-scope="field"
      data-part="input"
      data-slot="input-root"
      data-size={local.size ?? 'md'}
      class={clsx(styles.root, local.class)}
      size={local.htmlSize}
    />
  );
}

export { Input };
export type { InputRootProps, InputSize };