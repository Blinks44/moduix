import { Form as FormPrimitive } from '@base-ui/react/form';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Form.module.css';

function Form({ className, ...props }: FormPrimitive.Props) {
  return (
    <FormPrimitive
      data-slot="form-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

export { Form };