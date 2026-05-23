import { Form as FormPrimitive } from '@base-ui/react/form';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Form.module.css';

type FormValuesMap = Record<string, any>;
type FormProps<TValues extends FormValuesMap = FormValuesMap> = FormPrimitive.Props<TValues>;
type FormState = FormPrimitive.State;
type FormActions = FormPrimitive.Actions;
type FormValidationMode = FormPrimitive.ValidationMode;
type FormSubmitEventReason = FormPrimitive.SubmitEventReason;
type FormSubmitEventDetails = FormPrimitive.SubmitEventDetails;
type FormValues<TValues extends FormValuesMap = FormValuesMap> = FormPrimitive.Values<TValues>;
type FormErrors = NonNullable<FormProps<FormValuesMap>['errors']>;

function Form<TValues extends FormValuesMap = FormValuesMap>({
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