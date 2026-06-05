import { Form as FormPrimitive } from '@base-ui/react/form';
import { forwardRef, type ComponentRef } from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Form.module.css';

const Form = forwardRef<ComponentRef<typeof FormPrimitive>, FormPrimitive.Props>(function Form(
  { className, ...props },
  ref,
) {
  return (
    <FormPrimitive
      ref={ref}
      data-slot="form-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
});

export { Form };