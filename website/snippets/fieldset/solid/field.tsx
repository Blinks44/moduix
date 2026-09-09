import { Field } from '@moduix/solid/field';
import { Fieldset } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-field.module.css';

export default function PersonalInformation() {
  return (
    <Fieldset class={styles.root}>
      <Fieldset.Legend>Personal information</Fieldset.Legend>
      <Field>
        <Field.Label>First name</Field.Label>
        <Input />
        <Field.HelperText>As it appears on your ID.</Field.HelperText>
      </Field>
      <Field>
        <Field.Label>Last name</Field.Label>
        <Input />
      </Field>
    </Fieldset>
  );
}