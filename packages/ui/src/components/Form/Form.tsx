import { Form as FormPrimitive } from '@base-ui/react/form';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Form.module.css';

function Form<FormValues extends Record<string, any> = Record<string, any>>({
  className,
  ...props
}: FormProps<FormValues>) {
  return (
    <FormPrimitive
      data-slot="form-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

type FormProps<FormValues extends Record<string, any> = Record<string, any>> =
  FormPrimitive.Props<FormValues>;
type FormState = FormPrimitive.State;
type FormActions = FormPrimitive.Actions;
type FormValidationMode = FormPrimitive.ValidationMode;
type FormSubmitEventReason = FormPrimitive.SubmitEventReason;
type FormSubmitEventDetails = FormPrimitive.SubmitEventDetails;
type FormValues<FormValues extends Record<string, any> = Record<string, any>> =
  FormPrimitive.Values<FormValues>;

export { Form };

export type {
  FormProps,
  FormState,
  FormActions,
  FormValidationMode,
  FormSubmitEventReason,
  FormSubmitEventDetails,
  FormValues,
};