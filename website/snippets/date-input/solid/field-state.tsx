import { DateInput } from '@moduix/solid/date-input';
import { Field } from '@moduix/solid/field';
import styles from '@/components/examples/date-input/date-input-field-state.module.css';

export default function DateInputFieldDemo() {
  return (
    <Field class={styles.root} invalid>
      <DateInput required invalid name="deadline">
        <DateInput.Label>Deadline</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput />
      </DateInput>
      <Field.ErrorText>Enter a valid deadline.</Field.ErrorText>
    </Field>
  );
}