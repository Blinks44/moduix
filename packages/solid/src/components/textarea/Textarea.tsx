import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldTextareaProps } from '@ark-ui/solid/field';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import { applyDefaultValue, toPropDefaultValue } from '@/lib/moduix/defaultValue';
import styles from './Textarea.module.css';

type TextareaProps = FieldTextareaProps & {
  defaultValue?: string | number | readonly string[];
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function Textarea(props: TextareaProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'autoresize',
    'class',
    'defaultValue',
    'data-scope',
    'data-part',
    'data-slot',
    'ref',
  ]);
  return (
    <FieldPrimitive.Textarea
      asChild={local.asChild}
      {...others}
      {...(local.asChild ? toPropDefaultValue(local.defaultValue) : {})}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-autoresize={local.autoresize ? '' : undefined}
      class={clsx(styles.root, local.class)}
      autoresize={local.autoresize}
      ref={(element) => {
        applyDefaultValue(element, () => local.defaultValue);
        if (typeof local.ref === 'function') local.ref(element);
      }}
    />
  );
}

export { Textarea };