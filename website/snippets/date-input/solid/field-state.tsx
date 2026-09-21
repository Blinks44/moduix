import {
  DateInput,
  DateInputControl,
  DateInputHiddenInput,
  DateInputLabel,
  DateInputSegments,
} from '@moduix/solid/date-input';
import { Field, FieldErrorText } from '@moduix/solid/field';
import styles from '@/components/examples/date-input/date-input-field-state.module.css';

export default function DateInputFieldDemo() {
  return (
    <Field class={styles.root} invalid>
      <DateInput required invalid name="deadline">
        <DateInputLabel>Deadline</DateInputLabel>
        <DateInputControl>
          <DateInputSegments />
        </DateInputControl>
        <DateInputHiddenInput />
      </DateInput>
      <FieldErrorText>Enter a valid deadline.</FieldErrorText>
    </Field>
  );
}
