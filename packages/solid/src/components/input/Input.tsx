import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldInputProps } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from './Input.module.css';

type InputRootProps = Omit<FieldInputProps, 'size'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  htmlSize?: FieldInputProps['size'];
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function InputRoot(props: InputRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'size',
    'htmlSize',
    'data-scope',
    'data-part',
    'data-slot',
  ]);

  return (
    <FieldPrimitive.Input
      asChild={local.asChild}
      {...others}
      data-scope="field"
      data-part="input"
      data-slot="input-root"
      data-size={local.size ?? 'md'}
      data-html-size={local.htmlSize === undefined ? undefined : ''}
      class={clsx(styles.root, local.class)}
      size={local.htmlSize}
    />
  );
}

const Input = Object.assign(InputRoot, {
  Root: InputRoot,
});

export { Input };