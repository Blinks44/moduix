import { Form as FormPrimitive } from '@base-ui/react/form';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Form.module.css';

type FormRecord = Record<string, any>;

function Form<TValues extends FormRecord = FormRecord>({
  className,
  ...props
}: FormProps<TValues>) {
  return (
    <FormPrimitive
      data-slot="form-root"
      className={mergeClassName(className, styles.root)}
      {...props}
    />
  );
}

type FormProps<TValues extends FormRecord = FormRecord> = FormPrimitive.Props<TValues>;
type FormState = FormPrimitive.State;
type FormActions = FormPrimitive.Actions;
type FormValidationMode = FormPrimitive.ValidationMode;
type FormSubmitEventReason = FormPrimitive.SubmitEventReason;
type FormSubmitEventDetails = FormPrimitive.SubmitEventDetails;
type FormValues<TValues extends FormRecord = FormRecord> = FormPrimitive.Values<TValues>;
type FormErrors = NonNullable<FormPrimitive.Props<FormRecord>['errors']>;

export { Form };

export type {
  FormProps,
  FormState,
  FormActions,
  FormValidationMode,
  FormSubmitEventReason,
  FormSubmitEventDetails,
  FormValues,
  FormErrors,
};